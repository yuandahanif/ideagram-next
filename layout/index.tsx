import { NextPage } from "next";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";

const Layout: NextPage = ({ children }) => {
  return (
    <>
      <div className="min-h-screen max-w-screen-2xl mx-auto flex flex-col">
        <Header />
        <div className="flex-grow flex relative">
          <Sidebar />
          <main className="rounded-md overflow-hidden shadow-sm mt-4 mb-2 max-w-screen-xl ml-auto w-full">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
