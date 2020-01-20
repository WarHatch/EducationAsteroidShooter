import axios from "axios";
import { v1 } from "uuid";
import config from "../config"

// interfaces
import { IGameUnitDataSet } from "./data";

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

const createNewSession = async (createNewLessonPayload: ICreateNewSession): Promise<ISession> => {
  const { lessonId } = createNewLessonPayload;
  // TODO: nested create in sequelize
  const sessionId = v1();
  const machineRegisteredPayload = {
    ...createNewLessonPayload,
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

const getCanvasConfig = async (windowWidth: number): Promise<ICanvasConfig> => {
  const { data } = await axios.get<ICanvasConfig>(`${config.gameElementApiURL}/canvasConfig/${windowWidth}`);
  if (data === null) throw new Error("getCanvasConfig returned null");
  // @ts-ignore error handling
  if (data.error !== undefined) throw data;
  return data;
}

export default {
  createNewSession,
  getCanvasConfig,
  getExampleDataUnit,
}