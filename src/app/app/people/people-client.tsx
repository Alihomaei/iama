"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Users } from "lucide-react";

import type { Person } from "@/lib/agenda/types";
import { PersonAvatar } from "@/components/app/person-avatar";
import { SearchBar } from "@/components/app/search-bar";

/** Lowercased haystack of every searchable field on a person. */
function haystack(p: Person): string {
  return [p.name, p.credentials, p.role, p.affiliation, p.location]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function PeopleClient({ people }: { people: Person[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return people;
    return people.filter((p) => haystack(p).includes(needle));
  }, [people, query]);

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-secondary">
          Speakers
        </h1>
        <p className="text-sm text-muted">
          {people.length} on the program
        </p>
      </header>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search by name, role, or institution"
      />

      {filtered.length > 0 ? (
        <>
          <p className="text-xs text-muted" aria-live="polite">
            {filtered.length}{" "}
            {filtered.length === 1 ? "person" : "people"}
            {query.trim() ? " found" : ""}
          </p>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {filtered.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/app/people/${p.id}`}
                  className="flex h-full items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:bg-primary-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <PersonAvatar name={p.name} photoUrl={p.photoUrl} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-tight text-secondary">
                      {p.name}
                      {p.credentials && (
                        <span className="font-normal text-muted">
                          {", "}
                          {p.credentials}
                        </span>
                      )}
                    </p>
                    {p.role && (
                      <p className="mt-0.5 truncate text-sm text-muted">
                        {p.role}
                      </p>
                    )}
                    {p.affiliation && (
                      <p className="truncate text-sm text-muted">
                        {p.affiliation}
                      </p>
                    )}
                  </div>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-muted"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-card px-4 py-12 text-center">
          <Users className="h-8 w-8 text-muted" aria-hidden="true" />
          <p className="text-sm font-medium text-secondary">No matches</p>
          <p className="text-sm text-muted">
            No speakers match &ldquo;{query.trim()}&rdquo;.
          </p>
        </div>
      )}
    </div>
  );
}
