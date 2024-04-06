'use server';

import { tableData } from '@/mocks/table';
import { results } from '@/mocks/results';
import { fixtures } from '@/mocks/fixtures';

import {
  ITableItem,
  IResultsItem,
  IStandingsItem,
  SeasonInfo,
  ILeaguesItem,
  IFixtureResult,
} from '@/lib/models/apiModels';
import axios from 'axios';

const baseURL = process.env.API_SPORTMONKS_BASE_URL;
const apiToken = process.env.API_TOKEN_SPORTMONKS;

export async function getTableData(): Promise<ITableItem[] | undefined> {
  // const options = {
  //   method: "GET",
  //   url: "https://heisenbug-premier-league-live-scores-v1.p.rapidapi.com/api/premierleague/table",
  //   headers: {
  //     "X-RapidAPI-Key": "3bc3316c2dmsh8e41b1e957eb5b0p1ba874jsn673415bd6a58",
  //     "X-RapidAPI-Host":
  //       "heisenbug-premier-league-live-scores-v1.p.rapidapi.com",
  //   },
  // };
  try {
    //   const response = await axios.request(options);
    const preparedTableData = Object.values(tableData).map((item: any) => ({
      pos: item.position,
      team: item.clubA,
      logo: item.logo,
      pl: item.played,
      gd: item.gd,
      pt: item.points,
    }));
    return preparedTableData;
  } catch (error) {
    console.error(error);
  }
}

export async function getResultsData(): Promise<IResultsItem[] | undefined> {
  // const options = {
  //   method: "GET",
  //   url: "https://heisenbug-premier-league-live-scores-v1.p.rapidapi.com/api/premierleague/table",
  //   headers: {
  //     "X-RapidAPI-Key": "3bc3316c2dmsh8e41b1e957eb5b0p1ba874jsn673415bd6a58",
  //     "X-RapidAPI-Host":
  //       "heisenbug-premier-league-live-scores-v1.p.rapidapi.com",
  //   },
  // };
  try {
    //   const response = await axios.request(options);
    const preparedData = results.Results.map((el: any): IResultsItem[] => {
      const dateKeys = Object.keys(el.Date);

      return dateKeys.map((date) => {
        return el.Date[date].map((item: any) => ({
          teamA: item.ClubA,
          teamALogo: item.LogoClubA,
          goalsTeamA: item.GoalsClubA,
          teamB: item.ClubB,
          teamBLogo: item.LogoClubB,
          goalsTeamB: item.GoalsClubB,
          stadium: item.Stadium,
          date,
        }));
      });
    });
    return preparedData.flat(2);
  } catch (error) {
    console.error(error);
  }
}

export async function getFixturesData(): Promise<any | undefined> {
  // const options = {
  //   method: "GET",
  //   url: "https://heisenbug-premier-league-live-scores-v1.p.rapidapi.com/api/premierleague/table",
  //   headers: {
  //     "X-RapidAPI-Key": "3bc3316c2dmsh8e41b1e957eb5b0p1ba874jsn673415bd6a58",
  //     "X-RapidAPI-Host":
  //       "heisenbug-premier-league-live-scores-v1.p.rapidapi.com",
  //   },
  // };
  try {
    //   const response = await axios.request(options);

    const preparedData = fixtures.Fixtures.map((el: any) => {
      return el.Date;
    });
    return preparedData;
  } catch (error) {
    console.error(error);
  }
}

export async function getStandingsDataBySeasonId(seasonId: number): Promise<IStandingsItem[] | undefined> {
  const options = {
    method: 'GET',
    url: `${baseURL}/standings/seasons/${seasonId}?api_token=${apiToken}&include=participant;details`,
  };

  try {
    const response = await axios.request(options);

    const preparedData: IStandingsItem[] = response.data.data.map((item: any) => ({
      position: item.position,
      points: item.points,
      teamId: item.participant.id,
      team: item.participant.name,
      teamLogo: item.participant.image_path,
      played: item.details.find((detail: any) => detail.type_id === 129)?.value,
      won: item.details.find((detail: any) => detail.type_id === 130)?.value,
      lost: item.details.find((detail: any) => detail.type_id === 132)?.value,
      draw: item.details.find((detail: any) => detail.type_id === 131)?.value,
      goalsScored: item.details.find((detail: any) => detail.type_id === 133)?.value,
      goalsConceded: item.details.find((detail: any) => detail.type_id === 134)?.value,
      goalDifference: item.details.find((detail: any) => detail.type_id === 179)?.value,
    }));

    return preparedData;
  } catch (error) {
    console.log(error);
  }
}

export async function getSeasonDataById(seasonId: number): Promise<SeasonInfo | undefined> {
  const options = {
    method: 'GET',
    url: `${baseURL}/seasons/${seasonId}?api_token=${apiToken}&include=league:name;league.country`,
  };

  try {
    const response = await axios.request(options);

    const { id, name, league, starting_at, ending_at } = response.data.data;

    const preparedData: SeasonInfo = {
      id,
      name,
      leagueName: league.name,
      countryImage: league.country.image_path,
      startingAt: starting_at,
      endingAt: ending_at,
    };
    return preparedData;
  } catch (error) {
    console.log(error);
  }
}
export async function getLeagues(): Promise<ILeaguesItem[] | undefined> {
  const options = {
    method: 'GET',
    url: `${baseURL}/leagues?api_token=${apiToken}&include=seasons`,
  };

  try {
    const response = await axios.request(options);

    const preparedData: ILeaguesItem[] = response.data.data.map((item: any) => ({
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

    return preparedData;
  } catch (error) {
    console.log(error);
  }
}
export async function getLatestsFixturesByTeamIdAndBySeason(
  teamId: number,
  seasonInfo: SeasonInfo,
): Promise<IFixtureResult[] | undefined> {
  const options = {
    method: 'GET',
    url: `${baseURL}/fixtures/between/${seasonInfo.startingAt}/${seasonInfo.endingAt}/${teamId}?api_token=${apiToken}&order=desc&per_page=5&filters=seasons:${seasonInfo.id};scoreTypes:1525&include=participants:name;scores:score&select=name`,
  };

  try {
    const response = await axios.request(options);

    const preparedData: IFixtureResult[] = response.data.data.map((item: any) => ({
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

    return preparedData;
  } catch (error) {
    console.log(error);
    console.log(options);
  }
}
