import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";

export const UserHome: React.FC = () => {
  const navigate = useNavigate();
  const actions = [
    { title: "Encode Message", path: "/user/encode" },
    { title: "Decode Message", path: "/user/decode" },
    { title: "Rules (Demo)", path: "/user/rules" },
    { title: "Training (Demo)", path: "/user/training" },
  ];

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {actions.map((a) => (
        <Card
          key={a.title}
          className="cursor-pointer hover:shadow-md transition"
          onClick={() => navigate({ to: a.path })}
        >
          <CardContent className="p-4">
            <h3 className="font-semibold">{a.title}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export const Route = createFileRoute("/user/home")({
  component: UserHome,
});
