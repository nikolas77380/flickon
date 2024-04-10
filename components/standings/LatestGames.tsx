import { Tooltip } from 'flowbite-react';

import { getLatestsFixturesByTeamIdAndBySeason } from '@/lib/api/requests';
import { IFixtureResult, SeasonInfo } from '@/lib/models/apiModels';

import Icon from '@/components/common/Icon';

interface LatestFiveGamesProps {
  teamId: number;
  seasonInfo: SeasonInfo;
}

export const LatestGames = async ({ teamId, seasonInfo }: LatestFiveGamesProps) => {
  const latestGames: IFixtureResult[] | undefined = await getLatestsFixturesByTeamIdAndBySeason(teamId, seasonInfo);

  const getBgColorAndIcon = (item: IFixtureResult): { color: string; iconName: 'check' | 'minus' | 'x' } => {
    if ((teamId === item.teamAId && item.teamAWinner) || (teamId === item.teamBId && item.teamBWinner)) {
      return { color: 'green-700', iconName: 'check' };
    } else if (!item.teamAWinner && !item.teamBWinner) {
      return { color: 'gray-700', iconName: 'minus' };
    } else {
      return { color: 'red-700', iconName: 'x' };
    }
  };

  return (
    <div className="flex gap-x-2">
      {latestGames?.map((item, index) => {
        const { color, iconName } = getBgColorAndIcon(item);
        return (
          <div key={index}>
            <Tooltip content={`${item.teamAName} ${item.teamAGoals} : ${item.teamBGoals} ${item.teamBName}`}>
              <div>
                <Icon
                  name={iconName}
                  strokeWidth={3}
                  className={`w-6 h-6 text-white rounded-full bg-green-700 cursor-pointer bg-${color}`}
                />
              </div>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
};
