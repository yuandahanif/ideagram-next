import { NextPageContext } from "next";
import { getCsrfToken } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Label from "../../components/form/label";
import GuestLayout from "../../layout/guest.layout";

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  return (
    <>
      <Head>
        <title>Masuk | Ideagram</title>
      </Head>
      <GuestLayout>
        <div className="flex h-max w-full bg-white shadow-md mx-3 my-auto sm:m-auto max-w-6xl overflow-hidden rounded-md">
          <div className="flex flex-col justify-center w-full sm:w-5/12 px-8 py-20">
            <h1 className="mb-8 text-slate-700">
              Selamat datang di
              <span className="block text-4xl font-medium">Ideagram!</span>
            </h1>

            <form method="post" action="/api/auth/callback/credentials">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <Label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent focus:outline-0 px-2 py-3"
                />
              </Label>
              <Label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full bg-transparent focus:outline-0 px-2 py-3"
                />
              </Label>
              <span className="text-sm text-slate-600">
                Belum punya akun?{" "}
                <Link href="/auth/register" passHref>
                  <a className="text-sky-400">Daftar.</a>
                </Link>
              </span>
              <button
                type="submit"
                className="px-4 ml-auto block py-3 bg-sky-500 hover:bg-sky-700 duration-300 rounded-md text-white"
              >
                Masuk
              </button>
            </form>
          </div>

          <div className="hidden sm:grow sm:block">
            <div>
              <Image
                src={
                  "https://images.unsplash.com/photo-1640587896067-4e7d923143e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80"
                }
                width={100}
                height={100}
                layout="responsive"
                alt="gunung bersalju"
              />
            </div>
          </div>
        </div>
      </GuestLayout>
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context: NextPageContext) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
