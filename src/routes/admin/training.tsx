import { createFileRoute } from "@tanstack/react-router";

import { UserTraining as AdminTraining } from "../user/training";

export const Route = createFileRoute("/admin/training")({
  component: AdminTraining,
});
