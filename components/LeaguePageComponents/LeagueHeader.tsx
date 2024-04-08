import React from 'react';
import { getLeagueName, getSeasonName } from '@/lib/api/requests'

interface LeagueHeaderProps {
  leagueId: number;
  seasonId: number;
}

const LeagueHeader: React.FC<LeagueHeaderProps> = async ({ leagueId, seasonId }) => {

  const [leagueName, seasonName] = await Promise.all(
    [
      getLeagueName(leagueId),
      getSeasonName(seasonId),
    ],
  );

  return (
    <div className='font-bold mb-4 ml-1'>
      <p className='text-[30px] text-teal-400'>
        {leagueName ? `${leagueName} - ` : 'Loading...'} {seasonName ? seasonName : 'Loading...'}
      </p>
    </div>
  );
};

export default LeagueHeader;