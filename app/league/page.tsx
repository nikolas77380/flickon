import React from 'react';
import { getTeams } from '@/lib/api/requests';
import LeagueHeader from './../../components/LeaguePageComponents/LeagueHeader';
import TeamTable from './../../components/LeaguePageComponents/TeamTable';

const LeaguePage: React.FC = async () => {

  const teamsData = await getTeams();
  const teamsDatas = teamsData?.data;

  console.log(teamsDatas)

  return (
    <div className='py-20 px-6 bg-[#222831]'>
      <LeagueHeader leagueId={teamsDatas?.[0]?.league_id} seasonId={teamsDatas?.[0]?.season_id} />
      {teamsDatas && <TeamTable teamsDatas={teamsDatas} />}
    </div>
  );
};

export default LeaguePage;