
export interface IThread {
  id: number;
  owner: string;
  text: string;
  comments: IThread[] | null;
  createdAt: string;
  currentResult: number;
  parentId: number | null;
  parent: IThread | null
}

export type ICreateThreadRequest = Partial<Omit<IThread, "id" | "createdAt">>;
