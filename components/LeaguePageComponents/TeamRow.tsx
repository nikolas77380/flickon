import React from 'react';
import { Team } from '@/lib/models/apiModels';
import Image from 'next/image';
import Link from 'next/link';

interface TeamRowProps {
  teamDatas: Team;
  teamData: Team[];
  index: number;
}

const TeamRow: React.FC<TeamRowProps> = ({ teamDatas, index, teamData }) => {

  const goalsData = teamData?.map((team: Team) => {
    const goalsScored = team.details.find(detail => detail.type_id === 133)?.value;
    const goalsConceded = team.details.find(detail => detail.type_id === 134)?.value;
    return { teamName: team.participant.name, goalsScored, goalsConceded };       
  });

  const teamGoals = goalsData.find((goal: { teamName: any; }) => goal.teamName === teamDatas.participant.name);

  const getDate = new Date(teamDatas?.participant?.last_played_at).toLocaleDateString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <tr className='bg-[#282E3A]'>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex text-sm text-gray-900 gap-6 items-center">
          <span className='font-bold text-gray-300'>{index + 1}.</span>
          <Image 
            src={teamDatas?.participant?.image_path!} 
            alt={teamDatas?.participant?.name!}
            width={20}
            height={20}
            className='object-cover'
          />
          <Link href={`/team/${teamDatas.participant.id}`}>
          <span className='text-gray-200 ml-2 text-[17px] hover:text-teal-400'>
            {teamDatas?.participant?.name}
          </span>
          </Link>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-300">
          {teamDatas?.position}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-300">
          {teamDatas?.points}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="px-2 m-auto flex justify-center items-center 
        bg-[#475569] rounded-md hover:bg-[#364050]">
          <p className='py-1 text-teal-400 text-md hover:text-teal-300'>
            {teamGoals?.goalsScored} - {teamGoals?.goalsConceded}
          </p>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-300">
          {getDate}
        </div>
      </td>
    </tr>
  );
};

export default TeamRow;