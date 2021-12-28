const url = (process.env.NEXT_PUBLIC_API_ENDPOINT as string) + "comments";
const createComment = async (body: object, headers: HeadersInit) => {
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
    const { comment } = json;
    return comment;
  } catch (error) {
    throw error;
  }
};

export { createComment };
