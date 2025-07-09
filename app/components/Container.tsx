import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className: ReactNode;
};

const Container = ({ children, className }: Props) => {
  return (
    <div
      className={`max-w-[1200px] w-full h-full px-[5%] mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
