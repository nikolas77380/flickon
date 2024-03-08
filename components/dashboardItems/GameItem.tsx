import { IResultsItem } from "@/lib/models/apiModels";
import { clubsAbbriviations } from "@/lib/models/clubs";
import { Card } from "flowbite-react";
import { motion } from "framer-motion";
import Image from "next/image";
export default function ResultsItem({ item }: { item: IResultsItem }) {
  const abbTeamA = clubsAbbriviations[item.teamA];
  const abbTeamB = clubsAbbriviations[item.teamB];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ minWidth: "21.25rem" }}
      className="cursor-pointer"
    >
      <Card href="#" className="min-w-[220px] flex flex-col ">
        <div className="flex justify-center text-header italic">
          {item.stadium}
        </div>
        <div className="flex justify-center gap-2">
          <span className="font-bold text-header">{abbTeamA}</span>
          <Image src={item.teamALogo} alt={item.teamA} width={30} height={15} />
          <div className="bg-header rounded text-white p-1 font-medium">
            {item.time ? item.time : `${item.goalsTeamA} - ${item.goalsTeamB}`}
          </div>
          <Image src={item.teamBLogo} alt={item.teamA} width={30} height={15} />
          <span className="font-bold text-header">{abbTeamB}</span>
        </div>
        <div className="flex justify-center text-[12px]">{item.date}</div>
      </Card>
    </motion.div>
  );
}
