import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRules } from "../../db/hooks";

export const UserRules: React.FC = () => {
  const rules = useRules();

  return (
    <div className="p-6 grid gap-4 max-w-lg mx-auto">
      {rules.map((r) => (
        <Card key={r.id}>
          <CardContent className="space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{r.label}</h3>
              <span
                className={`px-2 py-1 rounded ${r.enabled ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
              >
                {r.enabled ? "Enabled" : "Disabled"}
              </span>
            </div>
            <p className="text-sm">{r.meaning}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const Route = createFileRoute("/user/rules")({
  component: UserRules,
});
