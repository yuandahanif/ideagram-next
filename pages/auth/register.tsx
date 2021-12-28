import { NextPageContext } from "next";
import { getCsrfToken } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import Label from "../../components/form/label";
import GuestLayout from "../../layout/guest.layout";

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

const registerToApi = async ({ name, email, password }: RegisterProps) => {
  try {
    const data = await fetch(
      (process.env.NEXT_PUBLIC_API_ENDPOINT as string) + "auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify({ name, email, password }),
      }
    );

    const json = await data.json();
    const { user } = json;
    return user;
  } catch (error) {
    throw error;
  }
};

export default function SignUp({ csrfToken }: { csrfToken: string }) {
  const router = useRouter();
  const mutation = useMutation(registerToApi, {
    onSuccess: (data) => {
      if (data.email) {
        router.push("/auth/login");
      } else {
        alert("error >///<");
      }
    },
    onError: () => {
      alert("error hayo!");
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as any;
    mutation.mutate({
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    });
  };

  return (
    <>
      <Head>
        <title>Daftar | Ideagram</title>
      </Head>
      <GuestLayout>
        <div className="flex h-max w-full bg-white shadow-md mx-3 my-auto sm:m-auto max-w-6xl overflow-hidden rounded-md">
          <div className="flex flex-col justify-center w-full sm:w-5/12 px-8 py-20">
            <h1 className="mb-8 text-slate-700">
              Selamat datang di
              <span className="block text-4xl font-medium">Ideagram!</span>
            </h1>

            <form method="post" onSubmit={onSubmit}>
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
                    d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                  />
                </svg>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
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
                  minLength={6}
                />
              </Label>
              <span className="text-sm text-slate-600">
                Sudah punya akun?{" "}
                <Link href="/auth/login" passHref>
                  <a className="text-sky-400">Masuk.</a>
                </Link>
              </span>
              <button
                type="submit"
                className="px-4 ml-auto block py-3 bg-sky-500 hover:bg-sky-700 duration-300 rounded-md text-white"
              >
                Daftar
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
