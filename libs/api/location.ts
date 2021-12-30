const url = (process.env.NEXT_PUBLIC_API_ENDPOINT as string) + "locations";

const getAllLocation = async () => {
  try {
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await data.json();
    const { location } = json;
    return location;
  } catch (error) {
    throw error;
  }
};

export { getAllLocation };
