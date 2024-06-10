import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col md:ml-60 h-screen w-full overflow-hidden">
      {children}
    </div>
  );
}
