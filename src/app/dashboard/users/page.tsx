"use client";

import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type RouterOutputs } from "@/utils/trpc";

type User = RouterOutputs["user"]["getAll"][number];

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { data: users, isLoading } = trpc.user.getAll.useQuery();

  const { mutate: deleteUser } = trpc.user.delete.useMutation({
    onSuccess: () => {
      setSelectedUser(null);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Users</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users?.map((user: User) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle>{user.name || "Unnamed User"}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedUser(user.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 