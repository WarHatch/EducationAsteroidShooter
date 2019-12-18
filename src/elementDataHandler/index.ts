import axios, { AxiosResponse } from "axios";

// interfaces
import { IGameUnitDataSet } from "./data";

const getExampleDataUnit = async (): Promise<IGameUnitDataSet> => {
  const res = await axios.get('http://localhost:8090/gameElements/dataSet'); 
  const { data } = res;
  return data;
}

export default {
  getExampleDataUnit,
}