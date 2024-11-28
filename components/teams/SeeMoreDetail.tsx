"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

const SeeMoreDetail = ({ member }: SeeMoreDetailProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <MoreHorizontal className="h-4 w-4" />
      </DialogTrigger>

      <DialogContent className="bg-[#000A19] max-w-[90%] xl:max-w-[50%] 2xl:max-w-[40%] border-gray-400/50 text-white">
        <DialogHeader className="flex flex-row gap-4 items-center">
          <Image
            src={member.imageUrl}
            width={500}
            height={500}
            className="w-16 h-16 object-cover object-top rounded-full"
            alt={`${member.name}-avatar`}
          />
          <div>
            <DialogTitle>{member.name}</DialogTitle>
            <DialogDescription>{member.position}</DialogDescription>
          </div>
        </DialogHeader>

        {member.description}
      </DialogContent>
    </Dialog>
  );
};

export default SeeMoreDetail;
