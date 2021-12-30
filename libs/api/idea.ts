const url = (process.env.NEXT_PUBLIC_API_ENDPOINT as string) + "ideas";

const getAllIdea = async () => {
  try {
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await data.json();
    const { idea } = json;
    return idea;
  } catch (error) {
    throw error;
  }
};

const getIdeaById = async (id: any) => {
  try {
    const data = await fetch(url + "/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await data.json();
    const { idea } = json;
    return idea;
  } catch (error) {
    throw error;
  }
};

const createIdea = async (body: object, headers: HeadersInit) => {
  try {
    const data = await fetch(url, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json = await data.json();
    const { idea } = json;
    return idea;
  } catch (error) {
    throw error;
  }
};

const getComments = async (id: any) => {
  try {
    const data = await fetch(
      (process.env.NEXT_PUBLIC_API_ENDPOINT as string) + "comments/" + id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await data.json();
    const { comment } = json;
    return comment;
  } catch (error) {
    throw error;
  }
};

export { getAllIdea, getIdeaById, getComments, createIdea };
