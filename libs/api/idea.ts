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

export { getAllIdea };
