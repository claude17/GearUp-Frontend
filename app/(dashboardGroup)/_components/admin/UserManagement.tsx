"use client";

import { useState } from "react";

import { updateUserStatus } from "../../_actions/adminActions";
import { UserDataTable } from "./UserDataTable";


export type User = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
    profileImage: string | null;
    role: "CUSTOMER" | "PROVIDER" | "ADMIN";
    status: "ACTIVE" | "SUSPENDED";
    createdAt: string;
    updatedAt: string;
};

type UserManagementProps = {
    initialUsers: User[];
};

export function UserManagement({
    initialUsers,
}: UserManagementProps) {
    const [users, setUsers] = useState(initialUsers);

    const handleStatusChange = async (
        userId: string,
        status: "ACTIVE" | "SUSPENDED"
    ) => {
        const result = await updateUserStatus(
            userId,
            status
        );

        if (!result.success) {
            console.error(
                result.message || "Failed to update user."
            );

            return;
        }

        setUsers((currentUsers) =>
            currentUsers.map((user) =>
                user.id === userId
                    ? {
                        ...user,
                        status,
                    }
                    : user
            )
        );
    };

    return (
        <UserDataTable
            users={users}
            onStatusChange={handleStatusChange}
        />
    );
}