import { tableData } from '@/mocks/table';

import { ITableItem } from '@/lib/models/apiModels';
import axios from 'axios';
import { groupFixtures } from './helper';

export async function getTableData(): Promise<ITableItem[] | undefined> {
  // const options = {
  //   method: "GET",
  //   url: `${process.env.API_SPORTMONKS_BASE_URL}/standings?api_token=${process.env.API_TOKEN_SPORTMONKS}&include=participant;league;form`,
  // };
  try {
    // const response = await axios.request(options);
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

export async function getResultsData(per_page?: number): Promise<any[] | undefined> {
  const options = {
    method: 'GET',
    url: `${process.env.API_SPORTMONKS_BASE_URL}/fixtures?api_token=${
      process.env.API_TOKEN_SPORTMONKS
    }&include=scores;stage;participants&state&events&league=271&filters=fixtureStates:5,7,8&sortBy=starting_at&order=desc&per_page=${
      per_page || 50
    }`,
  };
  try {
    const response = await axios.request(options);
    return groupFixtures(response.data.data);
  } catch (error) {
    console.error(error);
  }
}

export async function getFixturesData(per_page?: number): Promise<any | undefined> {
  const options = {
    method: 'GET',
    url: `${process.env.API_SPORTMONKS_BASE_URL}/fixtures?api_token=${
      process.env.API_TOKEN_SPORTMONKS
    }&include=scores;stage;participants&state&events&league=271&filters=fixtureStates:1&sortBy=starting_at&order=desc&per_page=${
      per_page || 50
    }`,
  };
  try {
    const response = await axios.request(options);
    return groupFixtures(response.data.data);
  } catch (error) {
    console.error(error);
  }
}
