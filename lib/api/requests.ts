import { tableData } from "@/mocks/table";
import { results } from "@/mocks/results";
import { fixtures } from "@/mocks/fixtures";

import { ITableItem, IResultsItem, apiOptions } from "@/lib/models/apiModels";

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

const options: apiOptions = {
  headers: {
    'Content-Type': 'application/json',
  }
}

const baseUrl = process.env.API_SPORTMONKS_BASE_URL;
const apiToken = process.env.API_TOKEN_SPORTMONKS;

export const getTeams = async () => {
  const matchData = await fetch(`${baseUrl}/standings/seasons/19735?api_token=${apiToken}&include=participant;details;form;`, options);
  return matchData.json();
}

export const getLeagueName = async (leagueId: number) => {
  try {
    const response = await fetch(`${baseUrl}/leagues/${leagueId}?api_token=${apiToken}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data.name;
  } catch (error) {
    console.error('Error fetching league name:', error);
    return null;
  }
}

export const getSeasonName = async (seasonId: number) => {
  try {
    const response = await fetch(`${baseUrl}/seasons/${seasonId}?api_token=${apiToken}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data.name;
  } catch (error) {
      console.error('Error fetching season name:', error);
      return null;
  }
}

export const getTeamById = async (id: number) => {
  const response = await fetch(`${baseUrl}/teams/${id}?api_token=${apiToken}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.data;
};
