import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Runescape 3 Leagues Player lookup" },
    { name: "description", content: "Welcome to the Runescape 3 Leagues Player lookup!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
