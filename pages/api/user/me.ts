import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const url =
    (process.env.NEXT_PUBLIC_API_ENDPOINT as string) + "auth/user-profile";
  const session = await getSession({ req });

  try {
    if (session) {
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      const json = await data.json();

      if (json?.email) {
        res.status(200).json(json);
      } else {
        res.status(401);
      }
    }

    res.status(401);
  } catch (error) {
    throw error;
  }
};

export default api;
