import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className="px-8 py-4 rounded-b-md shadow-sm bg-white">
        <nav className="max-w-screen-2xl mx-auto flex justify-between items-center font-semibold text-slate-800">
          <Link href="/" passHref>
            <a>Owwl</a>
          </Link>
          <ul className="flex text-base font-normal">
            <li>
              <Link href="#" passHref>
                <a className="flex items-center">
                  <span>Ansel</span>
                  <div className="w-10 h-10 rounded-full overflow-hidden ml-2 ring-1 object-cover object-center">
                    <Image
                      src="https://live.staticflickr.com/4205/35047763926_6e8ca0e027_q.jpg"
                      alt="profile"
                      width={150}
                      height={150}
                    />
                  </div>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
