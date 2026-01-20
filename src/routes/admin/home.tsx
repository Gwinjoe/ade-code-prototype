import { createFileRoute } from "@tanstack/react-router";

import { useNavigate } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";

export function AdminHome() {
  const navigate = useNavigate();

  const actions = [
    { title: "Encode Message", path: "/admin/encode" },
    { title: "Decode Message", path: "/admin/decode" },
    { title: "Rules Management", path: "/admin/rules" },
    { title: "Training", path: "/admin/training" },
  ];

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {actions.map((a) => (
        <Card
          key={a.title}
          className="cursor-pointer hover:shadow-md transition"
          onClick={() => navigate({ to: a.path })}
        >
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg">{a.title}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
export const Route = createFileRoute("/admin/home")({
  component: AdminHome,
});
