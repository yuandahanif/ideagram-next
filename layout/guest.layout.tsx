import React, { ReactNode } from "react";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";

type Props = {
  children: ReactNode;
  withSidebar?: boolean;
};

const GuestLayout = ({ children, withSidebar = true }: Props) => {
  return (
    <>
      <div className="min-h-screen max-w-screen-2xl mx-auto flex flex-col">
        <main className="flex-grow flex h-full">{children}</main>
      </div>
    </>
  );
};

export default GuestLayout;
