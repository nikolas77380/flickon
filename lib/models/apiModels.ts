export interface ITableItem {
  pos: number;
  team: string;
  logo: string;
  pl?: number;
  gd?: number;
  pt?: number;
}

export interface IResultsItem {
  teamA: string;
  teamALogo: string;
  goalsTeamA: string | number;
  teamB: string;
  teamBLogo: string;
  goalsTeamB: string | number;
  stadium: string;
  date: string;
  time?: string;
}

export interface IStandingsItem {
  position: number;
  points: number;
  teamId: number;
  team: string;
  teamLogo: string;
  played: number;
  won: number;
  lost: number;
  draw: number;
  goalsScored: number;
  goalsConceded: number;
  goalDifference: number;
}

export interface ISeasonInfo {
  id: number;
  name: string;
  leagueName?: string;
  countryImage?: string;
  startingAt: string;
  endingAt: string;
}

export interface ILeaguesItem {
  name: string;
  shortCode: string;
  imagePath: string;
  seasons: ISeasonInfo[];
}

export interface IFixtureResult {
  teamAId: number;
  teamBId: number;
  teamAName: string;
  teamBName: string;
  teamAGoals: number;
  teamBGoals: number;
  teamAWinner: boolean;
  teamBWinner: boolean;
  teamALocation: 'home' | 'away';
  teamBLocation: 'home' | 'away';
}
