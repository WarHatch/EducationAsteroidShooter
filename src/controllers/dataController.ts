import axios, { AxiosResponse } from "axios";

const getExampleDataUnit = async (): Promise<IGameUnitDataSet<IClickableGameElement>> => {
  const res = await axios.get('http://localhost:8090/gameElements/dataSet');
  
  const { data } = res;
  // function parser
  const onClick = eval(`(${data.gameElements[0].onClick})`);
  console.log(onClick);
  data.gameElements[0].onClick = onClick;
  

  return data;
}

export default {
  getExampleDataUnit
}