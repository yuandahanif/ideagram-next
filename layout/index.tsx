import React, { ReactNode } from "react";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";

type Props = {
  children: ReactNode;
  withSidebar?: boolean;
};

const Layout = ({ children, withSidebar = true }: Props) => {
  return (
    <>
      <div className="min-h-screen max-w-screen-2xl mx-auto flex flex-col">
        <Header />
        <div className="flex-grow flex relative">
          {withSidebar && <Sidebar />}
          <main
            className={`rounded-md overflow-hidden mt-4 mb-2 ${
              withSidebar ? "max-w-screen-xl" : "max-w-screen-2xl"
            } ml-auto w-full`}
          >
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
