import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getGoalsData, getMatchesPlayedData, getTeamGoals, getTeamMatchesPlayed } from '@/utils/teamDataUtils.ts';
import { ITeam } from '@/lib/models/apiModels';

interface TeamRowProps {
  teamDatas: ITeam;
  teamData: ITeam[];
  index: number;
  countryId?: number;
  seasonId?: number;
  viewType?: 'short' | 'full'
}

const TeamRow: React.FC<TeamRowProps> = ({ teamDatas, index, teamData }) => {

  const goalsData = getGoalsData(teamData);
  const teamGoals = getTeamGoals(teamDatas, goalsData);

  const matchesPlayedData = getMatchesPlayedData(teamData);
  const teamMatchesPlayed = getTeamMatchesPlayed(teamDatas, matchesPlayedData);

  return (
    <tr className='bg-[#282E3A]'>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex text-sm text-gray-900 items-center">
          <div className='w-[30px]'>
            <span className='font-bold text-gray-300'>{index + 1}.</span>
          </div>
          <div className='pl-8'>
            <Image 
              src={teamDatas?.participant?.image_path!} 
              alt={teamDatas?.participant?.name!}
              width={20}
              height={20}
              className='object-cover'
            />
          </div>
          <div className='pl-3'>
            <Link href={`/team/${teamDatas.participant.id}`}>
            <span className='text-gray-200 text-[17px] hover:text-teal-400'>
              {teamDatas?.participant?.name}
            </span>
            </Link>
          </div>
        </div>
      </td>
      <td className="py-4 whitespace-nowrap">
        <div className="text-sm text-blue-400 m-auto flex justify-center items-center">
          {teamDatas?.points}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-300 m-auto flex justify-center items-center">
          {teamMatchesPlayed?.matchesPlayed}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="px-2 m-auto text-gray-300 flex justify-center items-center">
            {teamGoals?.goalsWin}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="px-2 m-auto text-gray-300 flex justify-center items-center">
            {teamGoals?.goalsDraw}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="px-2 m-auto text-gray-300 flex justify-center items-center">
            {teamGoals?.goalsLost}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-300 m-auto flex justify-center items-center">
          {teamGoals?.goalFor}/{teamGoals?.goalAgainst}
        </div>
      </td>
    </tr>
  );
};

export default TeamRow;