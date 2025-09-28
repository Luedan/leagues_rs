import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import type { MRT_RowSelectionState } from "mantine-react-table";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  IDataLeague,
  IResponseLeague
} from "~/types/responses";
import { TASK_DATA } from "~/utils/constants";

export interface IRunescapePersistStore {
  rsName: string;
  setRsName: (name: string) => void;
  clearStore: () => void;
  permissionStorage: boolean;
  setPermissionStorage: (permission: boolean) => void;
  todoTasks: MRT_RowSelectionState;
  setTodoTasks: (tasks: MRT_RowSelectionState) => void;
  clearTodoTasks: () => void;
}

export const useRuneScapePersistStore = create<IRunescapePersistStore>()(
  persist(
    (set, get) => ({
      rsName: "",
      setRsName: (name: string) => set({ rsName: name }),
      clearStore: () => set({ rsName: "", todoTasks: {} }),
      permissionStorage: false,
      setPermissionStorage: (permission: boolean) =>
        set({ permissionStorage: permission }),
      todoTasks: {},
      setTodoTasks: (tasks: MRT_RowSelectionState) => set({ todoTasks: tasks }),
      clearTodoTasks: () => set({ todoTasks: {} }),
    }),
    { name: "runescape-storage" }
  )
);

export interface RuneScapeState {
  rsName: string;
  setRsName: (name: string) => void;
  data: IDataLeague | IDataLeague | null;
  setData: (data: IDataLeague | IDataLeague) => void;
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
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<IResponseLeague, Error>>;
  setRefetch: (
    refetch: (
      options?: RefetchOptions
    ) => Promise<QueryObserverResult<IResponseLeague, Error>>
  ) => void;
  search: boolean;
  setSearch: (search: boolean) => void;
}

export const useRuneScapeStore = create<RuneScapeState>()((set) => ({
  rsName: useRuneScapePersistStore.getState().rsName || "",
  setRsName: (name: string) => set({ rsName: name }),
  data: null,
  setData: (data: IDataLeague) => set({ data: data }),
  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  completedByTier: TASK_DATA,
  setCompletedByTier: (data) => set({ completedByTier: data }),
  incompleteByTier: TASK_DATA,
  setIncompleteByTier: (data) => set({ incompleteByTier: data }),
  refetch: () =>
    Promise.resolve({} as QueryObserverResult<IResponseLeague, Error>),
  setRefetch: (
    refetch: (
      options?: RefetchOptions
    ) => Promise<QueryObserverResult<IResponseLeague, Error>>
  ) => set({ refetch }),
  search: false,
  setSearch: (search) => set({ search }),
}));
