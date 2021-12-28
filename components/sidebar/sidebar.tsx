import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const { status } = useSession();
  return (
    <>
      <aside className="bg-white shadow-sm border border-gray-100 mr-3 mb-2 mt-4 rounded-md max-w-sm w-full max-h-screen h-max sticky top-4 py-4 text-center text-slate-800 text-sm">
        <nav className="pb-0">
          <Link href="#" passHref>
            <a className="text-2xl font-semibold block w-4/5 mx-auto py-3">
              Ideagram
            </a>
          </Link>

          <ul className="text-left">
            <li>
              <Link href="#" passHref>
                <a className="flex gap-x-2 items-center w-11/12 focus:bg-gray-100 rounded-md px-3 mx-auto py-2 mb-1 text-lg focus:font-semibold hover:text-slate-500 transition-colors duration-200">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Beranda
                </a>
              </Link>
            </li>
            <li>
              <Link href="#2" passHref>
                <a className="flex gap-x-2 items-center w-11/12 focus:bg-gray-100 rounded-md px-3 mx-auto py-2 mb-1 text-lg focus:font-semibold hover:text-slate-500 transition-colors duration-200">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Share Ide
                </a>
              </Link>
            </li>
            <li>
              <Link href="#2" passHref>
                <a className="flex gap-x-2 items-center w-11/12 focus:bg-gray-100 rounded-md px-3 mx-auto py-2 mb-1 text-lg focus:font-semibold hover:text-slate-500 transition-colors duration-200">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  Bookmarks
                </a>
              </Link>
            </li>
            <li>
              <Link href="#2" passHref>
                <a className="flex gap-x-2 items-center w-11/12 focus:bg-gray-100 rounded-md px-3 mx-auto py-2 mb-1 text-lg focus:font-semibold hover:text-slate-500 transition-colors duration-200">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                </a>
              </Link>
            </li>
            <li>
              <Link href="#2" passHref>
                <a className="flex gap-x-2 items-center w-11/12 focus:bg-gray-100 rounded-md px-3 mx-auto py-2 mb-1 text-lg focus:font-semibold hover:text-slate-500 transition-colors duration-200">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Pengaturan
                </a>
              </Link>
            </li>
          </ul>

          {status === "authenticated" ? (
            <button
              onClick={() => signOut({ redirect: false })}
              className="flex gap-x-2 items-center justify-center w-max text-lg hover:text-slate-500 text-slate-800 duration-300 mt-96 filter-none mx-auto py-3"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          ) : (
            <span className="flex mt-96"></span>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
