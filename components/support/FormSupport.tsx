"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import ImageUploadedPreview from "../shared/ImageUploadedPreview";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { generateAxiosInstance } from "@/lib/axios-client";
import { SUPPORT_PRIORITIES } from "@/constant/common";
import { toast } from "sonner";
import SkewButton from "../shared/SkewButton";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  type: z.string().uuid(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z
    .string()
    .min(50, "Message must be at least 50 characters")
    .max(1000, "Message must not exceed 1000 characters"),
  attachment: z
    .array(
      z.object({
        file: z
          .instanceof(File)
          .refine(
            (file) => file.size <= MAX_FILE_SIZE,
            `Max file size is 25MB.`
          )
          .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only .jpg, .jpeg, .png, .webp and .gif formats are supported."
          ),
      })
    )
    .max(5, "You can only upload up to 5 images")
    .optional(),
});

type FormData = z.infer<typeof schema>;

interface FormSupportProps {
  email: string;
}

export default function FormSupport({ email }: FormSupportProps) {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email,
      attachment: [],
      message: "",
      name: "",
      priority: "LOW",
      subject: "",
      type: "",
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles].slice(0, 5));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": ACCEPTED_IMAGE_TYPES,
    },
    maxSize: MAX_FILE_SIZE,
    maxFiles: 5,
  });

  const handleRemove = useCallback(
    (index: number) => {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    },
    [setFiles]
  );

  const { data: types } = useQuery({
    queryKey: ["get-types"],
    queryFn: async () => {
      const axiosInstance = await generateAxiosInstance(undefined);
      const { data } = await axiosInstance.get(
        "/tickets/types?limit=50&page=1"
      );
      const types = data.data.types as TicketTypeResponse[];
      return types;
    },
  });

  const uploadFilesMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const axiosInstance = await generateAxiosInstance(undefined);
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      const { data } = await axiosInstance.post(
        "/tickets/attachments",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data.data.links;
    },
    mutationKey: ["upload-files"],
  });

  const createTicketMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const axiosInstance = await generateAxiosInstance(undefined);
      await axiosInstance.post(`/tickets`, data);
      router.refresh();
    },
    mutationKey: ["create-ticket"],
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      let attachment = [];
      if (files.length > 0) {
        attachment = await uploadFilesMutation.mutateAsync(files);
      }
      await createTicketMutation.mutateAsync({ ...data, attachment });
      toast.success("Ticket submitted successfully");
      form.reset();
      setFiles([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit ticket");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-6xl font-spaceMono mx-auto p-10 text-wrap rounded-lg shadow bg-gray-700/20"
      >
        <h2 className="text-2xl font-bold mb-10 text-center">
          Submit a Support Ticket
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input className="text-white bg-transparent" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input  className="text-white bg-transparent"  {...field} required readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem hidden>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUPPORT_PRIORITIES.slice(1).map((item, idx) => (
                          <SelectItem key={idx} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {types &&
                          types.map((item, idx) => (
                            <SelectItem key={idx} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input  className="text-white bg-transparent"  {...field} required />
                  </FormControl>
                  <FormDescription>
                    Subject should be at least 5 characters long and at most 100
                    characters long
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea  className="text-white bg-transparent"  rows={5} {...field} required />
                  </FormControl>
                  <FormDescription>
                    Message should be at least 50 characters long and at most
                    1000 characters long
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Attachments</Label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                  isDragActive ? "border-primary" : "border-gray-300"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Drag &apos;n&apos; drop some images here, or click to select
                  images
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Max 5 images, 25MB each. Supported formats: JPG, PNG, GIF,
                  WebP
                </p>
              </div>

              <ImageUploadedPreview files={files} handleRemove={handleRemove} />
            </div>
          </div>
        </div>

        <SkewButton
          disabled={isSubmitting}
          className="w-full mt-6"
          customClasses="skew-buy-widgets"
        >
          {isSubmitting ? "Submitting..." : "Submit Ticket"}
        </SkewButton>
      </form>
    </Form>
  );
}
