import TeamsPageClient from "./TeamsPageClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Teams | Jingle",
  description: "Manage team structures and members",
}

export default function TeamsPage() {
  return <TeamsPageClient />
}
