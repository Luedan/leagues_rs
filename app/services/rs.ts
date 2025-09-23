import axios from "axios";
import type { IResponseRS } from "~/types/responses";
export const getPlayers = async (player: string) => {
  const res = await axios.get<IResponseRS>(
    `https://n8n.luedan.dev/webhook/league?player=${player}`
  );
  return res.data;
};
