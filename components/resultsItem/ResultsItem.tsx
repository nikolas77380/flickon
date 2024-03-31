import { IResultsItem } from '@/lib/models/apiModels';
import Image from 'next/image';
import Link from 'next/link';
export default function ResultsItem({ item }: { item: IResultsItem }) {
  console.log({ item });
  return (
    <div className="flex justify-between my-2 p-1 border-b-2 hover:bg-header hover:bg-opacity-40 rounded">
      <div className="flex gap-2">
        <div className="w-[160px] min-w-[140px] flex justify-end">
          <span className=" text-header">{item.teamA}</span>
          <Image src={item.teamALogo} alt={item.teamA} width={30} height={15} />
        </div>
        <div className="bg-header rounded text-white p-1 font-medium">
          {item.time ? item.time : `${item.goalsTeamA} - ${item.goalsTeamB}`}
        </div>
        <Image src={item.teamBLogo} alt={item.teamA} width={30} height={15} />
        <span className=" text-header">{item.teamB}</span>
      </div>
      <div className="flex justify-center text-header italic max-sm:hidden max-md:text-[12px]">{item.stadium}</div>
      <Link href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>
      </Link>
    </div>
  );
}
