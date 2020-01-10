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
  const machineRegisteredPayload = {
    ...createNewLessonPayload,
    sessionId: v1(),
  };

  const res = await axios.post<ISession>(
    `http://localhost:8090/lesson/${lessonId}/session/register`,
    machineRegisteredPayload
  );
  const { data } = res;
  return data;
}

const getExampleDataUnit = async (): Promise<IGameUnitDataSet> => {
  const res = await axios.get('http://localhost:8090/gameElements/dataSet');
  const { data } = res;
  return data;
}

export default {
  createNewSession,
  getExampleDataUnit,
}