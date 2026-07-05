import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/dashboard-auth";
import { LoginForm } from "./login-form";

export const metadata = { title: "Dashboard — Login", robots: { index: false } };

export default async function LoginPage() {
  if (await isAuthed()) redirect("/dashboard");
  return (
    <main className="grid min-h-dvh place-content-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
          Analytics · johnenrique.tech
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}
