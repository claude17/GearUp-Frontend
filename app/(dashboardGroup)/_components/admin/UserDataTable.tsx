"use client";

import { useMemo, useState } from "react";
import {
    Search,
    UserCheck,
    UserX,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import type { User } from "./UserManagement";

type UserDataTableProps = {
    users: User[];
    onStatusChange: (
        userId: string,
        status: "ACTIVE" | "SUSPENDED"
    ) => Promise<void>;
};

export function UserDataTable({
    users,
    onStatusChange,
}: UserDataTableProps) {
    const [search, setSearch] = useState("");
    const [updatingUserId, setUpdatingUserId] =
        useState<string | null>(null);

    const filteredUsers = useMemo(() => {
        const query = search.toLowerCase().trim();

        if (!query) {
            return users;
        }

        return users.filter(
            (user) =>
                user.name
                    .toLowerCase()
                    .includes(query) ||
                user.email
                    .toLowerCase()
                    .includes(query) ||
                user.role
                    .toLowerCase()
                    .includes(query) ||
                user.status
                    .toLowerCase()
                    .includes(query)
        );
    }, [users, search]);

    const handleStatusChange = async (
        user: User
    ) => {
        const newStatus =
            user.status === "ACTIVE"
                ? "SUSPENDED"
                : "ACTIVE";

        setUpdatingUserId(user.id);

        try {
            await onStatusChange(
                user.id,
                newStatus
            );
        } finally {
            setUpdatingUserId(null);
        }
    };

    return (
        <Card>
            <CardContent className="p-6">
                {/* Search */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search users..."
                            className="pl-9"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b text-left">
                                <th className="px-4 py-3 font-medium">
                                    User
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Role
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Status
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Joined
                                </th>

                                <th className="px-4 py-3 text-right font-medium">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredUsers.map(
                                (user) => (
                                    <tr
                                        key={user.id}
                                        className="border-b last:border-0"
                                    >
                                        {/* User */}
                                        <td className="px-4 py-4">
                                            <div>
                                                <p className="font-medium">
                                                    {user.name}
                                                </p>

                                                <p className="text-muted-foreground">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Role */}
                                        <td className="px-4 py-4">
                                            <Badge variant="outline">
                                                {user.role}
                                            </Badge>
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-4">
                                            <Badge
                                                variant={
                                                    user.status ===
                                                    "ACTIVE"
                                                        ? "default"
                                                        : "destructive"
                                                }
                                            >
                                                {user.status}
                                            </Badge>
                                        </td>

                                        {/* Created */}
                                        <td className="px-4 py-4 text-muted-foreground">
                                            {new Date(
                                                user.createdAt
                                            ).toLocaleDateString()}
                                        </td>

                                        {/* Action */}
                                        <td className="px-4 py-4 text-right">
                                            <Button
                                                size="sm"
                                                variant={
                                                    user.status ===
                                                    "ACTIVE"
                                                        ? "destructive"
                                                        : "default"
                                                }
                                                disabled={
                                                    updatingUserId ===
                                                    user.id
                                                }
                                                onClick={() =>
                                                    handleStatusChange(
                                                        user
                                                    )
                                                }
                                            >
                                                {user.status ===
                                                "ACTIVE" ? (
                                                    <>
                                                        <UserX className="mr-2 size-4" />

                                                        {updatingUserId ===
                                                        user.id
                                                            ? "Suspending..."
                                                            : "Suspend"}
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserCheck className="mr-2 size-4" />

                                                        {updatingUserId ===
                                                        user.id
                                                            ? "Activating..."
                                                            : "Activate"}
                                                    </>
                                                )}
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                {/* No results */}
                {filteredUsers.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="text-muted-foreground">
                            No users found.
                        </p>
                    </div>
                )}

                {/* Result count */}
                <div className="mt-4 text-sm text-muted-foreground">
                    Showing {filteredUsers.length} of{" "}
                    {users.length} users
                </div>
            </CardContent>
        </Card>
    );
}