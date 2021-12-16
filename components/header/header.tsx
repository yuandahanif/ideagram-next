import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className="bg-red-400 px-8 py-4 rounded-b-md shadow-md">
        <nav className="max-w-screen-2xl mx-auto flex justify-between font-semibold text-white">
          Owwl
          <ul className="flex text-base font-normal">
            <li>
              <Link href="#">
                <a>Profile</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
