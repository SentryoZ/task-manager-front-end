import { ReactNode } from "react";

export default function ContentWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col flex-grow pt-4 px-4 space-y-2 pb-4 h-full">
      {children}
    </div>
  );
}
