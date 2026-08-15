"use server"
import { cookies } from "next/headers";

export const createRental = async (
  gearId: string,
  quantity: number,
  startDate: string,
  endDate: string
) => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Please login to rent gear.",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals`,
    {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gearId,
        quantity,
        startDate,
        endDate,
      }),
    }
  );

  const result = await res.json();

//   if (result.success) {
//     revalidateTag("my-rentals", "max");
//     revalidateTag("my-profile", "max");
//   }

  return result;
};