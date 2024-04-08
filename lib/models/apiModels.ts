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

export type apiOptions = {
  headers:{
    'Content-Type': string,
  }
}

export interface IDetail {
  id: number;
  standing_type: string;
  standing_id: number;
  type_id: number;
  value: number;
}

export interface IParticipant {
  id: number;
  country_id: number;
  venue_id: number;
  gender: string;
  name: string;
  image_path: string;
  founded: number;
  placeholder: boolean;
  last_played_at: string;
}


export interface ITeam {
  id: number;
  details: IDetail[];
  participant: IParticipant;
  position: number;
  points: number;
  result: string;
  league_id: number;
  season_id: number;
  stage_id: number;
  group_id: number | null;
  round_id: number;
  standing_rule_id: number;
}