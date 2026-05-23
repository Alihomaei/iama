import type { Metadata } from "next";
import { MyAgendaClient } from "./my-agenda-client";

export const metadata: Metadata = {
  title: "My Agenda",
};

export default function MyAgendaPage() {
  return <MyAgendaClient />;
}
