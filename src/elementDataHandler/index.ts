import axios, { AxiosResponse } from "axios";

const getExampleDataUnit = async (): Promise<IGameUnitDataSet<IGameElement>> => {
  const res = await axios.get('http://localhost:8090/gameElements/dataSet'); 
  const { data } = res;
  return data;
}

export default {
  getExampleDataUnit,
}