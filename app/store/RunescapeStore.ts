import { create } from "zustand";
import type { IResponseRS } from "~/types/responses";
import { TASK_DATA } from "~/utils/constants";

export interface RuneScapeState {
  rsName: string;
  setRsName: (name: string) => void;
  data: IResponseRS | null;
  setData: (data: IResponseRS) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  completedByTier: { name: string; value: number; color: string }[];
  setCompletedByTier: (
    data: { name: string; value: number; color: string }[]
  ) => void;
  incompleteByTier: { name: string; value: number; color: string }[];
  setIncompleteByTier: (
    data: { name: string; value: number; color: string }[]
  ) => void;
}

export const useRuneScapeStore = create<RuneScapeState>()((set) => ({
  rsName: "",
  setRsName: (name: string) => set({ rsName: name }),
  data: null,
  setData: (data: IResponseRS) => set({ data: data }),
  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  completedByTier: TASK_DATA,
  setCompletedByTier: (data) => set({ completedByTier: data }),
  incompleteByTier: TASK_DATA,
  setIncompleteByTier: (data) => set({ incompleteByTier: data }),
}));
