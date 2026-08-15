"use server";

import { isAccessTokenExist } from "@/service/refreshToken";

export const getAllUsers = async () => {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/users`,
        {
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "no-store",
        }
    );

    return await res.json();
};

export const updateUserStatus = async (
    userId: string,
    status: "ACTIVE" | "SUSPENDED"
) => {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/users/${userId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${accessToken}`,
            },
            body: JSON.stringify({
                status,
            }),
        }
    );

    return await res.json();
};