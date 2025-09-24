import { useCallback, useRef } from "react";
import { create } from "zustand";
import type { IResponseRS } from "~/types/responses";

export interface RuneScapeState {
  rsName: string;
  setRsName: (name: string) => void;
  data: IResponseRS | null;
  setData: (data: IResponseRS) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useRuneScapeStore = create<RuneScapeState>()((set) => ({
  rsName: "",
  setRsName: (name: string) => set({ rsName: name }),
  data: null,
  setData: (data: IResponseRS) => set({ data: data }),
  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
}));
