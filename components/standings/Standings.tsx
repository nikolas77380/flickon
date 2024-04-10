import { IStandingsItem, ISeasonInfo } from '@/lib/models/apiModels';
import { Avatar, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import Link from 'next/link';
import { LatestGames } from './LatestGames';

interface ITable {
  data: IStandingsItem[] | undefined;
  seasonInfo: ISeasonInfo;
}

const STANDINGS_HEAD = ['№', 'Команда', 'І', 'В', 'Н', 'П', 'З', 'П', 'Р', 'О', 'Останні матчі'];

export const Standings = ({ data, seasonInfo }: ITable) => {
  return (
    <div className="overflow-x-auto max-w-screen-lg mx-auto mt-10">
      <Table hoverable>
        <TableHead>
          {STANDINGS_HEAD.map((item, index) => (
            <TableHeadCell key={index} className="text-center">
              {item}
            </TableHeadCell>
          ))}
        </TableHead>
        <TableBody className="divide-y ">
          {data?.map((item, index) => (
            <TableRow key={index} className=" bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>{item.position}</TableCell>
              <TableCell className="flex justify-start whitespace-nowrap font-medium text-gray-900 dark:text-white ">
                <Link href={`/teams/${item.teamId}`}>
                  <Avatar img={item.teamLogo}>{item.team}</Avatar>
                </Link>
              </TableCell>
              <TableCell>{item.played}</TableCell>
              <TableCell>{item.won}</TableCell>
              <TableCell>{item.draw}</TableCell>
              <TableCell>{item.lost}</TableCell>
              <TableCell>{item.goalsScored}</TableCell>
              <TableCell>{item.goalsConceded}</TableCell>
              <TableCell>{item.goalDifference}</TableCell>
              <TableCell>{item.points}</TableCell>
              <TableCell>
                <LatestGames teamId={item.teamId} seasonInfo={seasonInfo} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
