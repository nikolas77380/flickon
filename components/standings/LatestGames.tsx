import { getLatestsFixturesByTeamIdAndBySeason } from '@/lib/api/requests';
import { IFixtureResult, SeasonInfo } from '@/lib/models/apiModels';
import { Tooltip } from 'flowbite-react';
import { Check, Minus, X } from 'lucide-react';

interface LatestFiveGamesProps {
  teamId: number;
  seasonInfo: SeasonInfo;
}

export const LatestGames = async ({ teamId, seasonInfo }: LatestFiveGamesProps) => {
  const latestGames: IFixtureResult[] | undefined = await getLatestsFixturesByTeamIdAndBySeason(teamId, seasonInfo);

  const getBgColor = (item: IFixtureResult): string => {
    if ((teamId === item.teamAId && item.teamAWinner) || (teamId === item.teamBId && item.teamBWinner)) {
      return 'green-700';
    } else if (!item.teamAWinner && !item.teamBWinner) {
      return 'gray-700';
    } else {
      return 'red-700';
    }
  };

  return (
    <div className="flex gap-x-2">
      {latestGames?.map((item, index) => (
        <div key={index}>
          <Tooltip content={`${item.teamAName} ${item.teamAGoals} : ${item.teamBGoals} ${item.teamBName}`}>
            <div>
              {getBgColor(item) === 'green-700' && (
                <Check strokeWidth={3} className="w-6 h-6 text-white rounded-full bg-green-700 cursor-pointer" />
              )}
              {getBgColor(item) === 'gray-700' && (
                <Minus strokeWidth={3} className="w-6 h-6  text-white rounded-full bg-gray-700 cursor-pointer" />
              )}
              {getBgColor(item) === 'red-700' && (
                <X strokeWidth={3} className="w-6 h-6  text-white  rounded-full bg-red-700 cursor-pointer" />
              )}
            </div>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};
