import axios from "axios";
import { v1 } from "uuid";
import config from "../config"

// interfaces
import { IGameUnitDataSet } from "./data";

// TODO: create an AxiosResponse<> interface which supports having error property (res.data.error)

export interface ISessionConfig {
  asteroidSpawnPerMinute: number,
  asteroidSecondsToCrash: number,
  // sessionId: string,
}

export interface ICreateNewSession {
  playerName: string,
  lessonId: string,
}

export interface ISession extends ICreateNewSession {
  sessionId: string,

  createdAt: Date,
  finishedAt: Date,
}

const createNewSession = async (createNewSessionPayload: ICreateNewSession): Promise<ISession> => {
  const { lessonId } = createNewSessionPayload;
  const sessionId = v1();
  const machineRegisteredPayload = {
    ...createNewSessionPayload,
    sessionId,
  };

  const res = await axios.post<ISession>(
    `${config.gameElementApiURL}/lesson/${lessonId}/session/register`,
    machineRegisteredPayload
  );
  const { data } = res;
  if (data === null) throw new Error("createLesson returned null");
  // @ts-ignore error handling
  if (data.error !== undefined) throw data;
  return data;
}

const getExampleDataUnit = async (): Promise<IGameUnitDataSet> => {
  const { innerWidth } = window;
  const res = await axios.get(`${config.gameElementApiURL}/gameElements/dataSet/${innerWidth}`);
  const { data } = res;
  return data;
}

export default {
  createNewSession,
  getExampleDataUnit,
}