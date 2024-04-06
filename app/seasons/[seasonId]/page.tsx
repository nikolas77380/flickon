import { Standings } from '@/components/standings/Standings';
import { getSeasonDataById, getStandingsDataBySeasonId } from '@/lib/api/requests';
import classes from './page.module.css';
import { Roboto } from 'next/font/google';
import { Metadata } from 'next';
import { Avatar } from 'flowbite-react';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Турнірна таблиця | Англійський футбол',
};
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

interface ISeasonsPage {
  params: {
    seasonId: number;
  };
}

export const SeasonsPage = async ({ params }: ISeasonsPage) => {
  const seasonId = params.seasonId;

  const seasonData = await getSeasonDataById(seasonId);

  if (!seasonData) {
    redirect('/leagues');
  }

  const standingsData = await getStandingsDataBySeasonId(seasonId);

  return (
    <div>
      <header className={classes.header}>
        <h1 className={roboto.className}>Турнірна таблиця</h1>
        <Avatar img={seasonData?.countryImage}>
          <h1 className={roboto.className}>{`${seasonData?.leagueName} ${seasonData?.name}`}</h1>
        </Avatar>
      </header>
      <Standings data={standingsData} seasonInfo={seasonData} />
    </div>
  );
};

export default SeasonsPage;
