import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { getPlayers } from "~/services/rs";
import { useRuneScapeStore } from "~/store/RunescapeStore";

export const useRs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { rsName, setRsName, setData, setIsLoading } = useRuneScapeStore(
    (state) => state
  );

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
      setData(data);
    }
  }, [data, isLoading, setData]);

  return {
    ref,
    handleSearch,
    isLoading,
  };
};
