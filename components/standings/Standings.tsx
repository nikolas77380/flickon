import { IStandingsItem } from '@/lib/models/apiModels';
import { Avatar, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';

interface ITable {
  data: IStandingsItem[] | undefined;
}

const STANDINGS_HEAD = ['№', 'Команда', 'І', 'В', 'Н', 'П', 'З', 'П', 'Р', 'О'];

export const Standings = ({ data }: ITable) => {
  return (
    <div className="overflow-x-auto max-w-screen-lg mx-auto mt-10">
      <Table striped>
        <TableHead>
          {STANDINGS_HEAD.map((item) => (
            <TableHeadCell key={item}>{item}</TableHeadCell>
          ))}
        </TableHead>
        <TableBody className="divide-y ">
          {data?.map((item) => (
            <TableRow key={item.teamId} className=" bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>{item.position}</TableCell>
              <TableCell className="flex justify-start whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Avatar img={item.teamLogo}>{item.team}</Avatar>
              </TableCell>
              <TableCell>{item.played}</TableCell>
              <TableCell>{item.won}</TableCell>
              <TableCell>{item.draw}</TableCell>
              <TableCell>{item.lost}</TableCell>
              <TableCell>{item.goalsScored}</TableCell>
              <TableCell>{item.goalsConceded}</TableCell>
              <TableCell>{item.goalDifference}</TableCell>
              <TableCell>{item.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
