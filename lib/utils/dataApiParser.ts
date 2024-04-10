import { STANDING_TYPES } from '../constants/constants';
import { IFixtureResult, ILeaguesItem, IStandingsItem } from '../models/apiModels';

export const prepareStandingsData = (data: any[]): IStandingsItem[] => {
  return data.map((item: any) => ({
    position: item.position,
    points: item.points,
    teamId: item.participant.id,
    team: item.participant.name,
    teamLogo: item.participant.image_path,
    played: item.details.find((detail: any) => detail.type_id === STANDING_TYPES.OVERALL_MATCHES)?.value,
    won: item.details.find((detail: any) => detail.type_id === STANDING_TYPES.OVERALL_WINS)?.value,
    lost: item.details.find((detail: any) => detail.type_id === STANDING_TYPES.OVERALL_LOST)?.value,
    draw: item.details.find((detail: any) => detail.type_id === STANDING_TYPES.OVERALL_DRAWS)?.value,
    goalsScored: item.details.find((detail: any) => detail.type_id === STANDING_TYPES.OVERALL_SCORED)?.value,
    goalsConceded: item.details.find((detail: any) => detail.type_id === STANDING_TYPES.OVERALL_CONCEDED)?.value,
    goalDifference: item.details.find((detail: any) => detail.type_id === STANDING_TYPES.OVERALL_GOAL_DIFFERENCE)
      ?.value,
  }));
};

export const prepareFixtureResults = (data: any[]): IFixtureResult[] => {
  return data.map((item: any) => ({
    teamAId: item.participants[0].id,
    teamBId: item.participants[1].id,
    teamAName: item.participants[0].name,
    teamBName: item.participants[1].name,
    teamAGoals: item.scores[item.scores[0].score.participant === 'home' ? 0 : 1].score.goals,
    teamBGoals: item.scores[item.scores[0].score.participant === 'home' ? 1 : 0].score.goals,
    teamAWinner: item.participants[0].meta.winner,
    teamBWinner: item.participants[1].meta.winner,
    teamALocation: item.participants[0].meta.location,
    teamBLocation: item.participants[1].meta.location,
  }));
};

export const prepareLeaguesData = (data: any[]): ILeaguesItem[] => {
  return data.map((item: any) => ({
    name: item.name,
    shortCode: item.short_code,
    imagePath: item.image_path,
    seasons: item.seasons.map((season: any) => ({
      id: season.id,
      name: season.name,
      startingAt: season.starting_at,
      endingAt: season.ending_at,
    })),
  }));
};
