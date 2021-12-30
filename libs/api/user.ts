const url = process.env.NEXT_PUBLIC_API_ENDPOINT as string;

const getCurerentUser = async () => {
  try {
    const data = await fetch(url + "auth/user-profile", {
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

const getCurerentUserWithIdea = async (header: HeadersInit) => {
  try {
    const data = await fetch(url + "users/idea", {
      method: "GET",
      headers: {
        ...header,
        "Content-Type": "application/json",
      },
    });

    const { idea } = await data.json();
    return idea;
  } catch (error) {
    throw error;
  }
};

const getOtherUserWithIdea = async (id: number) => {
  try {
    const data = await fetch(url + `users/${id}/idea`, {
      method: "GET",
    });

    const json = await data.json();
    return json;
  } catch (error) {
    throw error;
  }
};

export { getCurerentUser, getCurerentUserWithIdea, getOtherUserWithIdea };
