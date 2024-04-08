import { 
  GOALS_DRAW, 
  GOALS_LOST, 
  GOALS_WIN, 
  GOAL_AGAINST, 
  GOAL_FOR, 
  MATCHES_PLAYED 
} from "@/lib/constants/constants";
import { ITeam } from "@/lib/models/apiModels";



export const getGoalsData = (teamData: ITeam[]): { teamName: string; goalsWin: number; goalsDraw: number; goalsLost: number; goalFor: number; goalAgainst: number }[] => {
  return teamData?.map((team: ITeam) => {
    const goalsWin = team.details.find(detail => detail.type_id === GOALS_WIN)?.value!;
    const goalsDraw = team.details.find(detail => detail.type_id === GOALS_DRAW)?.value!;
    const goalsLost = team.details.find(detail => detail.type_id === GOALS_LOST)?.value!;
    const goalFor = team.details.find(detail => detail.type_id === GOAL_FOR)?.value!;
    const goalAgainst = team.details.find(detail => detail.type_id === GOAL_AGAINST)?.value!;
    return { teamName: team.participant.name, goalsWin, goalsDraw, goalsLost, goalFor, goalAgainst };       
  });
};

export const getTeamGoals = (teamDatas: ITeam, goalsData: { teamName: string; goalsWin: number; goalsDraw: number; goalsLost: number; goalFor: number; goalAgainst: number }[]): { teamName: string; goalsWin: number; goalsDraw: number; goalsLost: number; goalFor: number; goalAgainst: number } | undefined => {
  return goalsData.find((goal: { teamName: string; }) => goal.teamName === teamDatas.participant.name);
};

export const getMatchesPlayedData = (teamData: ITeam[]): { teamName: string; matchesPlayed: number }[] => {
  return teamData?.map((team: ITeam) => {
    const matchesPlayed = team.details.find(detail => detail.type_id === MATCHES_PLAYED)?.value!;
    return { teamName: team.participant.name, matchesPlayed };       
  });
};

export const getTeamMatchesPlayed = (teamDatas: ITeam, matchesPlayedData: { teamName: string; matchesPlayed: number }[]): { teamName: string; matchesPlayed: number } | undefined => {
  return matchesPlayedData.find((match: { teamName: string; }) => match.teamName === teamDatas.participant.name);
};