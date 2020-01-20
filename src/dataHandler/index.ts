import axios, { AxiosResponse } from "axios";
import { v1 } from "uuid";

// interfaces
import { IGameUnitDataSet } from "./data";

export interface ISessionConfig {
  asteroidSpawnPerMinute: number,
  asteroidSecondsToCrash: number,
  // sessionId: string,
}

export interface ICreateNewSession {
  studentName: string,
  lessonId: string,

  sessionConfigs: ISessionConfig[],
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

    sessionConfigs: {
      ...createNewLessonPayload.sessionConfigs[0],
      sessionId,
    }
  };

  const res = await axios.post<ISession>(
    `http://localhost:8090/lesson/${lessonId}/session/register`,
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
  const res = await axios.get(`http://localhost:8090/gameElements/dataSet/${innerWidth}`);
  const { data } = res;
  return data;
}

const getCanvasConfig = async (windowWidth: number): Promise<ICanvasConfig> => {
  const { data } = await axios.get<ICanvasConfig>(`http://localhost:8090/canvasConfig/${windowWidth}`);
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