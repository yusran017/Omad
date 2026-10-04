import { createFileRoute } from "@tanstack/react-router";
import { OmadApp } from "@/components/omad/omad-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <OmadApp />;
}
