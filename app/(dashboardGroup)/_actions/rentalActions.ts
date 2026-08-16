"use server";

import { isAccessTokenExist } from "@/service/refreshToken";
import { redirect } from "next/navigation";

export const getAllRentals = async () => {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/rentals`,
        {
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "no-store",
        }
    );

    return await res.json();
};

export const getMyRentals = async () => {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/rentals/myrental`,
        {
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "no-store",
        }
    );

    return await res.json();
};

export const createCheckoutSession = async (rentalOrderId: string) => {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
        return {
            success: false,
            message: "You are not logged in.",
        };
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/payments/checkout`,
        {
            method: "POST",
            headers: {
                Cookie: `accessToken=${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                rentalOrderId,
            }),
        }
    );

    const result = await res.json();

    // console.log("CHECKOUT RESULT:", result);
    console.log("checkout url:", result.data.session.checkoutUrl);
    if (result.success && result.data.session.checkoutUrl) {
        redirect(result.data.session.checkoutUrl);
    }

    return result;
};