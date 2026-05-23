import type { Metadata } from "next";

import { getSpeakers } from "@/lib/agenda";
import { PeopleClient } from "./people-client";

export const metadata: Metadata = {
  title: "Speakers",
};

export default function PeoplePage() {
  // getSpeakers() returns plain Person objects — serializable for the client.
  const people = getSpeakers();
  return <PeopleClient people={people} />;
}
