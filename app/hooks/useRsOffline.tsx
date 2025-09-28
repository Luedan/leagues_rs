import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getPlayers, getPlayersLeague } from "~/services/rs";
import {
  useRuneScapePersistStore,
  useRuneScapeStore,
} from "~/store/RunescapeStore";
import { separateTask } from "~/utils";

export const useRsOffline = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    setData,
    setIsLoading,
    setCompletedByTier,
    setIncompleteByTier,
    setRefetch,
    setSearch,
    search,
  } = useRuneScapeStore((state) => state);
  const { rsName } = useRuneScapePersistStore((state) => state);
  const [value, setValue] = useState(rsName || "");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value && value.trim().length > 0) {
      setSearch(true);
      if (location.pathname !== "/") {
        navigate("/");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setValue(value);
  };

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryFn: () => getPlayersLeague(value),
    queryKey: ["Player_League", value],
    enabled: !!search && value.trim().length > 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setIsLoading(isLoading);

    if (data?.username && !data?.error && !isLoading) {
      const { completed, incomplete } = separateTask(data?.league_tasks || []);
      const completedByTier = completed
        ?.reduce(
          (acc, task) => {
            const tier = task.taskTier || "none";
            const tierObj = acc.find((t) => t.name === tier);
            if (tierObj) {
              tierObj.value += 1;
            }
            return acc;
          },
          [
            { name: "Easy", value: 0, color: "#4067c8" },
            { name: "Medium", value: 0, color: "#214916" },
            { name: "Hard", value: 0, color: "#9d162b" },
            { name: "Elite", value: 0, color: "#6a2beb" },
            { name: "Master", value: 0, color: "#e19b63" },
          ]
        )
        .filter((tier) => tier.value > 0);

      const incompleteByTier = incomplete
        ?.reduce(
          (acc, task) => {
            const tier = task.taskTier || "none";
            const tierObj = acc.find((t) => t.name === tier);
            if (tierObj) {
              tierObj.value += 1;
            }
            return acc;
          },
          [
            { name: "Easy", value: 0, color: "#4067c8" },
            { name: "Medium", value: 0, color: "#214916" },
            { name: "Hard", value: 0, color: "#9d162b" },
            { name: "Elite", value: 0, color: "#6a2beb" },
            { name: "Master", value: 0, color: "#e19b63" },
          ]
        )
        .filter((tier) => tier.value > 0);

      setIncompleteByTier(incompleteByTier);
      setCompletedByTier(completedByTier);

      setData({ ...data, completed, incomplete: incomplete });
      setRefetch(refetch);

      notifications.show({
        autoClose: 4000,
        message: "Data Loaded",
      });
    }

    if (data?.error && !isLoading) {
      notifications.show({
        autoClose: 4000,
        message: data?.error || "An error has occurred, please try again.",
      });
    }
    setSearch(false);
  }, [data, isLoading, setData]);

  useEffect(() => {
    if (value && value.trim().length > 0 && !search) {
      setSearch(true);
      if (location.pathname !== "/") {
        navigate("/");
      }
    }
  }, []);

  useEffect(() => {
    setSearch(true);
    setValue(rsName || "");
  }, [rsName]);

  return {
    handleSearch,
    isLoading: isLoading || isRefetching,
    value,
    handleChange,
  };
};
