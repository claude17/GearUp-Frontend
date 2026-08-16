"use server"

import { isAccessTokenExist } from "@/service/refreshToken";

export const createReview = async (payload: {
    rentalOrderId: string;
    rating: number;
    comment: string;
}) => {
    // console.log("CREATE REVIEW PAYLOAD:", payload);
    const accessToken = await isAccessTokenExist();
    // console.log(accessToken);

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/reviews`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${accessToken}`,
            },
            body: JSON.stringify(payload),
        }
    );

    const result = await res.json();
    // console.log("result:",result);

    return result
};