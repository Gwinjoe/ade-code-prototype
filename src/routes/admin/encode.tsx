import { createFileRoute } from "@tanstack/react-router";
import { UserEncode as AdminEncode } from "../user/encode";

export const Route = createFileRoute("/admin/encode")({
  component: AdminEncode,
});
