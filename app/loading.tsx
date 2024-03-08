"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="pt-[200px] flex flex-col items-center gap-4">
      <Image
        className="animate-loading-animation"
        src={"/loading-image.png"}
        alt="FO"
        width={300}
        height={300}
      />
      <h2 className="color-header">Loading...</h2>
    </div>
  );
}
