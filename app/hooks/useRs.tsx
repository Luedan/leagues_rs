import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { getPlayers } from "~/services/rs";
import { useRuneScapeStore } from "~/store/RunescapeStore";
import { TASK_DATA } from "~/utils/constants";

export const useRs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    rsName,
    setRsName,
    setData,
    setIsLoading,
    setCompletedByTier,
    setIncompleteByTier,
  } = useRuneScapeStore((state) => state);

  const ref = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (ref.current) {
        if (location.pathname !== "/") {
          navigate("/");
        }
        setRsName(ref.current.value);
      }
    },
    [ref]
  );

  const { data, isLoading } = useQuery({
    queryFn: () => getPlayers(rsName),
    queryKey: ["Player_League", rsName],
    enabled: !!rsName,
  });

  useEffect(() => {
    setIsLoading(isLoading);
    if (data) {
      const completedByTier = data?.completed
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

      const incompleteByTier = data?.incompleted
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

      // console.log(incompleteByTier, completedByTier);
      setData(data);
    }
  }, [data, isLoading, setData]);

  return {
    ref,
    handleSearch,
    isLoading,
  };
};
