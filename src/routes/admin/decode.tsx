import { createFileRoute } from "@tanstack/react-router";

import { UserDecode as AdminDecode } from "../user/decode";

export const Route = createFileRoute("/admin/decode")({
  component: AdminDecode,
});
