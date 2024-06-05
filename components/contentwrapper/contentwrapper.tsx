import { ReactNode } from "react";

export default function ContentWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col pt-4 px-4 space-y-2  flex-grow pb-4 overflow-auto ">
      {children}
    </div>
  );
}
