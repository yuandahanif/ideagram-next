import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className="">
        <nav className="bg-red-400 max-w-screen-2xl mx-auto">
          ini logo
          <ul>
            <li>
              <Link href="#">
                <a>Beranda</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
