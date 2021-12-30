const url = (process.env.NEXT_PUBLIC_API_ENDPOINT as string) + "categories";

const getAllCategory = async () => {
  try {
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await data.json();
    const { category } = json;
    return category;
  } catch (error) {
    throw error;
  }
};

export { getAllCategory };
