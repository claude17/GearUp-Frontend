"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { isAccessTokenExist } from "@/service/refreshToken";

type GearState = {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
};

export const getMyGear = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gears/mygear`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["my-gear"],
      },
    }
  );

  return await res.json();
};

export const createGear = async (
  prevState: GearState,
  formData: FormData
) => {
  const payload = {
    name: formData.get("name"),
    brand: formData.get("brand"),
    description: formData.get("description"),
    specifications: formData.get("specifications"),
    dailyRentalPrice: Number(formData.get("dailyRentalPrice")),
    stock: Number(formData.get("stock")),
    image: formData.get("image"),
    categoryId: formData.get("categoryId"),
  };

  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gears`,
    {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-gear", {
            expire: 0
    });
  }

  return result;
};

export const updateGear = async (
  gearId: string,
  prevState: GearState,
  formData: FormData
) => {
  const payload = {
    name: formData.get("name"),
    brand: formData.get("brand"),
    description: formData.get("description"),
    specifications: formData.get("specifications"),
    dailyRentalPrice: Number(formData.get("dailyRentalPrice")),
    stock: Number(formData.get("stock")),
    image: formData.get("image"),
    categoryId: formData.get("categoryId"),
  };

  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gears/${gearId}`,
    {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-gear", {
            expire: 0
    });
  }

  return result;
};

export const deleteGear = async (gearId: string) => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gears/${gearId}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    }
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-gear", {
            expire: 0
    });
  }

  return result;
};