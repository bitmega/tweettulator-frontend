
export interface IThread {
  id: number;
  owner: string;
  text: string;
  comments: IThread[] | null;
  createdAt: string;
  currentResult: string;
  previousResult: string;
  parentId: number | null;
}

export type ICreateThreadRequest = Partial<Omit<IThread, "id" | "createdAt">>;
