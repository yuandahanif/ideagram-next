import Link from "next/link";

const Sidebar = () => {
  return (
    <>
      <aside className="bg-white shadow-sm border border-gray-100 mr-3 mb-2 mt-4 rounded-md max-w-sm w-full max-h-screen h-max sticky top-4 py-4 text-center text-slate-800 text-sm">
        <nav className="pb-0">
          <Link href="#" passHref>
            <a className="text-2xl font-semibold block w-4/5 mx-auto py-3">
              Ini Nama Apliaksi
            </a>
          </Link>

          <ul className="text-left">
            <li>
              <Link href="#" passHref>
                <a className="block w-4/5 mx-auto py-2 mb-1 text-lg focus:font-semibold hover:text-slate-500 transition-colors duration-200">
                  Beranda
                </a>
              </Link>
            </li>
            <li>
              <Link href="#2" passHref>
                <a className="block w-4/5 mx-auto py-2 mb-1 text-lg focus:font-semibold hover:text-slate-500 transition-colors duration-200">
                  Ini Bukan Beranda
                </a>
              </Link>
            </li>
            <li>
              <Link href="#2" passHref>
                <a className="block w-4/5 mx-auto py-2 mb-1 text-lg focus:font-semibold hover:text-slate-500 transition-colors duration-200">
                  Ini Juka Bukan Beranda
                </a>
              </Link>
            </li>
          </ul>

          <Link href="#" passHref>
            <a className="text-lg hover:text-slate-500 text-slate-800 duration-300 mt-96 inline-block filter-none mx-auto py-3">
              Logout
            </a>
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
