"use server";

import { cookies } from "next/headers";

export const getFeaturedGears = async () => {
    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/gears`,
        {
            cache: "no-store",
        }
    );

    return await res.json();
};

export const getAllGears = async (queryString = "") => {
    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/gears${queryString}`,
        {
            cache: "no-store",
        }
    );

    return await res.json();
};

export const getCategories = async () => {
    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/categories`,
        {
            cache: "no-store",
        }
    );

    return await res.json();
};




export const getGearById = async (id: string) => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gears/${id}`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    }
  );

  const result = await res.json();

  return result;
};

