import Head from "next/head";
import Image from "next/image";
import { useQuery } from "react-query";
import Card from "../../components/card/card";
import Layout from "../../layout";
import { getOtherUserWithIdea } from "../../libs/api/user";
import { Idea } from "../../types/Idea";
import { GetServerSideProps } from "next";
import { User } from "../../types/user";

const ProfileOther = ({ id }: { id: number }) => {
  const query = useQuery<any, unknown, { user: User; idea: Idea[] }>(
    "otherUserIdea",
    () => getOtherUserWithIdea(id)
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
              alt={query.data?.user?.name || "profile"}
              src={`https://ui-avatars.com/api/size=128&name=${query.data?.user?.name?.replaceAll(
                " ",
                "+"
              )}`}
            />
          </div>

          <div className="max-w-sm">
            <h1 className="text-slate-800 text-4xl font-semibold drop-shadow-lg line-clamp-1">
              {query.data?.user?.name}
            </h1>
          </div>

          <div className="mt-2">
            <span>
              {query.isSuccess && query.data?.idea?.length} Ide di bagikan
            </span>{" "}
            |{" "}
            <span>
              Bergabung pada {(query.data?.user?.created_at + "").split("T")[0]}
            </span>
          </div>
        </div>

        <div className="rounded-md bg-white px-4 mt-5 p-2">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Unggahan Ide
          </h2>
          <div className="grid grid-flow-row grid-cols-4 gap-3">
            {query.isSuccess &&
              query.data?.idea?.map((idea: Idea) => {
                return <Card idea={idea} key={idea.id} />;
              })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProfileOther;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.params?.id,
    }, // will be passed to the page component as props
  };
};
