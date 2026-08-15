"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { isAccessTokenExist } from "@/service/refreshToken";

export const getProviderOrders = async () => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/rentals/provider/orders`,
        {
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "force-cache",
            next: {
                revalidate: 60,
                tags: ["provider-orders"],
            },
        }
    );

    const result = await res.json();
    // console.log("PROVIDER ORDERS RESULT:", JSON.stringify(result, null, 2));

    return result;
};

export const updateProviderOrderStatus = async (
    rentalId: string,
    status: string
) => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/rentals/${rentalId}`,
        {
            method: "PATCH",
            headers: {
                Cookie: `accessToken=${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status,
            }),
        }
    );

    const result = await res.json();

    if (result.success) {
        revalidateTag("provider-orders", {
            expire: 0,
        });

        // revalidateTag("my-profile", {
        //     expire: 0,
        // });
    }

    return result;
};



export async function getMyGears() {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/gears/mygear`,
        {
            method: "GET",
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "no-store",
        }
    );

    return await res.json();
}

export async function createGear(payload: {
    name: string;
    brand: string;
    description: string;
    specifications: string;
    dailyRentalPrice: number;
    stock: number;
    availableStock: number;
    image: string;
    isAvailable: boolean;
    categoryId: string;
}) {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

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

    return await res.json();
}

export async function updateGear(
    gearId: string,
    payload: {
        name: string;
        brand: string;
        description: string;
        specifications: string;
        dailyRentalPrice: number;
        stock: number;
        availableStock: number;
        image: string;
        isAvailable: boolean;
        categoryId: string;
    }
) {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

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

    return await res.json();
}

export const getCategories = async () => {
    const accessToken = await isAccessTokenExist();

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/categories`,
        {
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "no-store",
        }
    );

    return await res.json();
};

export const deleteGear = async (gearId: string) => {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/gears/${gearId}`,
        {
            method: "DELETE",
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
        }
    );

    return await res.json();
};