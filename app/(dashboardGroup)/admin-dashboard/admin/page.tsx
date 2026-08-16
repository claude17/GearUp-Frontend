
import { getAllUsers } from "../../_actions/adminActions";
import { UserManagement } from "../../_components/admin/UserManagement";


export default async function AdminPage() {
    const result = await getAllUsers();

    if (!result.success) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-10">
                <p className="text-center text-muted-foreground">
                    {result.message || "Failed to load users."}
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    User Management
                </h1>

                <p className="mt-1 text-muted-foreground">
                    Manage customers, providers, and administrators.
                </p>
            </div>

            <UserManagement
                initialUsers={result.data.profiles}
            />
        </div>
    );
}