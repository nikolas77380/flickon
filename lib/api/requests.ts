'use server';

import { tableData } from '@/mocks/table';
import { results } from '@/mocks/results';
import { fixtures } from '@/mocks/fixtures';

import {
  ITableItem,
  IResultsItem,
  IStandingsItem,
  ISeasonInfo,
  ILeaguesItem,
  IFixtureResult,
} from '@/lib/models/apiModels';
import axios from 'axios';
import { prepareFixtureResults, prepareLeaguesData, prepareStandingsData } from '../utils/dataApiParser';

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

    const preparedData: IStandingsItem[] = prepareStandingsData(response.data.data);

    return preparedData;
  } catch (error) {
    console.log(error);
  }
}

export async function getSeasonDataById(seasonId: number): Promise<ISeasonInfo | undefined> {
  const options = {
    method: 'GET',
    url: `${baseURL}/seasons/${seasonId}?api_token=${apiToken}&include=league:name;league.country`,
  };

  try {
    const response = await axios.request(options);

    const { id, name, league, starting_at, ending_at } = response.data.data;

    const preparedData: ISeasonInfo = {
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

    const preparedData: ILeaguesItem[] = prepareLeaguesData(response.data.data);

    return preparedData;
  } catch (error) {
    console.log(error);
  }
}
export async function getLatestsFixturesByTeamIdAndBySeason(
  teamId: number,
  seasonInfo: ISeasonInfo,
): Promise<IFixtureResult[] | undefined> {
  const options = {
    method: 'GET',
    url: `${baseURL}/fixtures/between/${seasonInfo.startingAt}/${seasonInfo.endingAt}/${teamId}?api_token=${apiToken}&order=desc&per_page=5&filters=seasons:${seasonInfo.id};scoreTypes:1525&include=participants:name;scores:score&select=name`,
  };

  try {
    const response = await axios.request(options);

    const preparedData: IFixtureResult[] = prepareFixtureResults(response.data.data);

    return preparedData;
  } catch (error) {
    console.log(error);
    console.log(options);
  }
}
