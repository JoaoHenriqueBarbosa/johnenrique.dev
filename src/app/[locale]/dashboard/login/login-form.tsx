"use client";

import { useActionState } from "react";
import { login } from "../actions";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, { error: "" });
  return (
    <form action={formAction} className="mt-6 flex flex-col gap-3">
      <input
        type="password"
        name="password"
        autoFocus
        placeholder="Senha"
        className="rounded-md border bg-card px-3 py-2 text-sm outline-none focus:border-input"
      />
      {state?.error ? (
        <p className="font-mono text-xs text-destructive">{state.error}</p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "..." : "Entrar"}
      </Button>
    </form>
  );
}
