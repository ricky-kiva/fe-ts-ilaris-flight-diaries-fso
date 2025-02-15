export interface Diary {
  id: number,
  date: string,
  weather: string,
  visibility: string,
  comment?: string
}

export type NewDiary = Omit<Diary, 'id'>;

export const isDiary = (data: unknown): data is Diary => {
  return typeof data === "object"
    && data !== null
    && "id" in data
    && "date" in data
    && "weather" in data
    && "visibility" in data;
};

export const isString = (data: unknown): data is string => {
  return typeof data === "string" || data instanceof String;
};
