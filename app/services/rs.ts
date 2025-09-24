import axios from "axios";
import type { IResponseRS } from "~/types/responses";
import { API_PASSWORD, API_USERNAME } from "~/utils/constants";

export const getPlayers = async (player: string) => {
  const res = await axios.get<IResponseRS>(
    `https://n8n.luedan.dev/webhook/league?player=${encodeURIComponent(
      player
    )}`,
    {
      auth: {
        username: API_USERNAME,
        password: API_PASSWORD,
      },
    }
  );
  return res.data;
};
