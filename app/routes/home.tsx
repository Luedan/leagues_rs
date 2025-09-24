import { HomeComponent } from "~/components/home";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Runescape 3 Leagues Player lookup" },
    {
      name: "description",
      content: "Welcome to the Runescape 3 Leagues Player lookup!",
    },
    {
      name: "og:title",
      content: "Runescape 3 Leagues Player lookup",
    },
    {
      name: "og:description",
      content: "Welcome to the Runescape 3 Leagues Player lookup!",
    },
    {
      name: "og:image",
      content: "https://rsll.luedan.dev/logo.png",
    },
    {
      name: "og:type",
      content: "website",
    },
    {
      name: "og:url",
      content: "https://rsll.luedan.dev/",
    }
  ];
}

export default function Home() {
  return <HomeComponent />;
}
