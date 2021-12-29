const url = (process.env.NEXT_PUBLIC_API_ENDPOINT as string) + "auth";

const getCurerentUser = async () => {
  try {
    const data = await fetch(url + "/user-profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await data.json();
    return json;
  } catch (error) {
    throw error;
  }
};

export { getCurerentUser };
