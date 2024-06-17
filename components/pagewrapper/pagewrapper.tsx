import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  isSidebarOpen: boolean;
}

export default function PageWrapper({
  children,
  isSidebarOpen,
}: PageWrapperProps) {
  return (
    <div
      className={`flex flex-grow flex-col h-screen w-full overflow-hidden transition-all duration-100 ease-in-out ${
        isSidebarOpen ? "ml-[240px]" : "ml-[70px]"
      }`}
    >
      {children}
    </div>
  );
}
