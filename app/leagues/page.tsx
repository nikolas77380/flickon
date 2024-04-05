import classes from './page.module.css';
import { Roboto } from 'next/font/google';
import { Metadata } from 'next';
import { getLeagues } from '@/lib/api/requests';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Лігі | Англійський футбол',
};
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export default async function Leagues() {
  const leagues = await getLeagues();

  return (
    <>
      <header className={classes.header}>
        <h1 className={roboto.className}>Лігі</h1>
      </header>
      <section>
        {leagues?.map((league) => (
          <div key={league.name} className="m-4 flex justify-center items-start gap-4">
            <div>
              <Image src={league.imagePath} alt="league image" width={50} height={50} />
              {league.name}
            </div>
            <div>
              <p>Seasons:</p>
              {league.seasons.map((season) => (
                <div key={season.id}>
                  <Link href={`/seasons/${season.id}`}>
                    <p>
                      {season.name} {season.startingAt} - {season.endingAt}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
