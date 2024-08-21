import type { ReactNode } from "react";

export default function Base({ children }: { children: ReactNode }) {
  return (
    <main className="container max-w-4xl mx-auto flex flex-col items-center">
      {children}
    </main>
  );
}
