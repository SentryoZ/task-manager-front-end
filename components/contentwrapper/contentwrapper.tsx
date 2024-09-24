import { ReactNode } from "react";

export default function ContentWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col flex-grow overflow-hidden h-full">
      <div className="flex-grow overflow-auto p-6">{children}</div>
    </div>
  );
}
