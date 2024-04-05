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
    'Content-Type': string | any,
  }
}

export interface Detail {
  type_id: number;
  value: number;
}

export interface Participant {
  id: string;
  name: string;
  image_path: string;
  last_played_at: string;
}


export interface Team {
  details: Detail[];
  participant: Participant;
  position: number;
  points: number;
}