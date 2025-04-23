import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b bg-white px-6">
        <h1 className="text-xl font-semibold">Jingle</h1>
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight">Jingle</h2>
          <p className="mt-4 text-xl text-muted-foreground">Headcount Management System</p>
          <div className="mt-8">
            <Link href="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          </div>
        </div>
      </main>
      <footer className="border-t bg-white py-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Jingle. All rights reserved.
      </footer>
    </div>
  )
}
