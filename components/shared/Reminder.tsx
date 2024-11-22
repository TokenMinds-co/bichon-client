"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import SkewButton from "./SkewButton";
import Image from "next/image";

const AddAccount = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px] bg-[#000A19] text-white">
        <DialogHeader>
         <div className="flex flex-row items-center gap-1"> <Image
            width={40}
            height={40}
            src="/assets/bichon.png"
            alt="bichon-logo"
          />
          <DialogTitle>Information:</DialogTitle></div>
        </DialogHeader>

        <div className="text-sm my-5">
          To ensure seamless transaction on mobile devices, open the
          https://bichondefender.com inside your wallets browser
        </div>

        <DialogFooter>
          <SkewButton className="w-full" onClick={() => setIsDialogOpen(false)}>
            Continue
          </SkewButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAccount;
