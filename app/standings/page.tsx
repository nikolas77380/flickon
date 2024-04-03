import { Standings } from '@/components/standings/Standings';
import { getSeasonDataById, getStandingsDataBySeasonId } from '@/lib/api/requests';
import classes from './page.module.css';
import { Roboto } from 'next/font/google';
import { Metadata } from 'next';
import { Avatar } from 'flowbite-react';

export const metadata: Metadata = {
  title: 'Турнірна таблиця | Англійський футбол',
};
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const SEASON_ID = 759;

export const StandingsPage = async () => {
  const seasonData = await getSeasonDataById(SEASON_ID);

  const standingsData = await getStandingsDataBySeasonId(SEASON_ID);

  return (
    <div>
      <header className={classes.header}>
        <h1 className={roboto.className}>Турнірна таблиця</h1>
        <Avatar img={seasonData?.countryImage}>
          <h1 className={roboto.className}>{`${seasonData?.leagueName} ${seasonData?.seasonName}`}</h1>
        </Avatar>
      </header>
      <Standings data={standingsData} />
    </div>
  );
};

export default StandingsPage;
