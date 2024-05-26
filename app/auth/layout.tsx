import React, { ReactNode } from "react";

const Authlayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-full">
      <div className="h-screen flex items-center justify-center">
        {children}
      </div>
    </section>
  );
};

export default Authlayout;