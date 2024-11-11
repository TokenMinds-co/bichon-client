"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AlertCircle, Upload } from "lucide-react";

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
  type: z.enum(["MARKETING", "TECHNICAL", "SUPPORT"]),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z
    .string()
    .min(50, "Message must be at least 50 characters")
    .max(1000, "Message must not exceed 1000 characters"),
  attachments: z
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
    .max(5, "You can only upload up to 5 images"),
});

type FormData = z.infer<typeof schema>;

export function TicketSupportForm() {
  const [files, setFiles] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
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

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold mb-6">Submit a Support Ticket</h2>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.priority && (
          <p className="text-red-500 text-sm">{errors.priority.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MARKETING">Marketing</SelectItem>
                <SelectItem value="TECHNICAL">Technical</SelectItem>
                <SelectItem value="SUPPORT">Support</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.type && (
          <p className="text-red-500 text-sm">{errors.type.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" {...register("subject")} />
        {errors.subject && (
          <p className="text-red-500 text-sm">{errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          {...register("message")}
          className="min-h-[100px]"
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message.message}</p>
        )}
      </div>

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
            Drag &rsquo;n&rsquo; drop some images here, or click to select
            images
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Max 5 images, 25MB each. Supported formats: JPG, PNG, GIF, WebP
          </p>
        </div>
        {files.length > 0 && (
          <ul className="mt-4 space-y-2">
            {files.map((file, index) => (
              <li key={index} className="text-sm text-gray-600">
                {file.name} - {(file.size / 1024 / 1024).toFixed(2)} MB
              </li>
            ))}
          </ul>
        )}
        {errors.attachments && (
          <p className="text-red-500 text-sm flex items-center mt-2">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.attachments.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Submit Ticket
      </Button>
    </form>
  );
}
