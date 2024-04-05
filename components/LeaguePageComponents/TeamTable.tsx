import React from 'react';
import { Team } from '@/lib/models/apiModels';
import TeamRow from './TeamRow';

interface TeamTableProps {
  teamsDatas: Team[];
}

const TeamTable: React.FC<TeamTableProps> = ({ teamsDatas }) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-500">
                <tr className=''>
                  <th scope="col" className="px-6 py-3 pl-[7rem] text-left text-xs font-bold text-gray-200 uppercase tracking-wider">
                    Команди
                  </th>
                  <th scope="col" className="px-6 py-3 pl-[5px] text-left text-xs font-bold text-gray-200 uppercase tracking-wider">
                    Позицiя
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">
                    Балiв
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-gray-200 uppercase tracking-wider">
                    З - П
                  </th>
                  <th scope="col" className="px-6 py-3  text-left text-xs font-bold text-gray-200 uppercase tracking-wider">
                    Остання гра
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teamsDatas?.map((team, index) => (
                  <TeamRow key={index} teamData={teamsDatas} teamDatas={team} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamTable;