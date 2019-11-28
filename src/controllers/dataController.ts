import axios from "axios";

const getExampleDataUnit = async () => {
  const res = await axios.get('http://localhost:8090/gameElements/dataSet');
  return res.data;
}

export default {
  getExampleDataUnit
}