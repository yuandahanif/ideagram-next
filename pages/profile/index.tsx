import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useQuery } from "react-query";
import Card from "../../components/card/card";
import Layout from "../../layout";
import { getCurerentUserWithIdea } from "../../libs/api/user";
import { CustomNextPage } from "../../types/CustomNextPage";
import { Idea } from "../../types/Idea";
import { formatRupiah } from "../../libs/helpers";

const Profile: CustomNextPage = () => {
  const { data: session } = useSession();

  const query = useQuery("userIdea", () =>
    getCurerentUserWithIdea({
      Authorization: `Bearer ${session?.access_token}`,
    })
  );

  return (
    <>
      <Head>
        <title>Profile | Ideagram</title>
      </Head>
      <Layout>
        <div className="h-96 rounded-md bg-zinc-50 flex flex-col items-center justify-center">
          <div className="h-24 w-24 rounded-full overflow-hidden mb-3">
            <Image
              layout="responsive"
              width={100}
              height={100}
              alt={session?.user?.name || "profile"}
              src={`https://ui-avatars.com/api/size=128&name=${session?.user?.name?.replaceAll(
                " ",
                "+"
              )}`}
            />
          </div>

          <div className="max-w-sm">
            <h1 className="text-slate-800 text-4xl font-semibold drop-shadow-lg line-clamp-1">
              {session?.user?.name}
            </h1>
          </div>

          <div className="mt-2">
            <span>{query.data.length} Ide di unggah</span> |{" "}
            <span>
              {formatRupiah((session?.user as any).balance)} di dalam saku
            </span>
          </div>
        </div>

        <div className="rounded-md bg-white px-4 mt-5 p-2">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Unggahan Ide
          </h2>
          <div className="grid grid-flow-row grid-cols-4 gap-3">
            {query.isSuccess &&
              query.data?.map((idea: Idea) => {
                return <Card idea={idea} key={idea.id} />;
              })}
          </div>
        </div>
      </Layout>
    </>
  );
};

Profile.auth = true;

export default Profile;
