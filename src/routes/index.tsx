// import { ComponentExample } from "@/components/component-example";
// import { createFileRoute } from "@tanstack/react-router";
//
// export const Route = createFileRoute("/")({
//   component: App,
// });
//
// export function App() {
//   return <ComponentExample />;
// }
//
// export default App;
//
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getDb } from "../db/index";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: LoginRoute,
});

function LoginRoute() {
  const navigate = useNavigate();

  const login = async (role: "admin" | "user") => {
    const { adeCodeDB } = await getDb();

    await adeCodeDB.session.upsert({
      id: "current",
      role,
    });

    navigate({ to: `/${role}/home` });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <Card className="w-[360px]">
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-semibold">ADE CODE</h2>
            <p className="text-sm text-muted-foreground">Prototype Access</p>
          </div>

          <div className="space-y-3">
            <Button className="w-full" onClick={() => login("admin")}>
              Login as Admin
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => login("user")}
            >
              Login as User
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
