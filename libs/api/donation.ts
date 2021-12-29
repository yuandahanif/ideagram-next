const url = (process.env.NEXT_PUBLIC_API_ENDPOINT as string) + "donations";

const makeDonation = async (body: object, header: HeadersInit) => {
  try {
    const data = await fetch(url, {
      method: "POST",
      headers: {
        ...header,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log('file: donation.ts ~ line 13 ~ makeDonation ~ data', data)

    const json = await data.json();
    const { donation } = json;
    return donation;
  } catch (error) {
    throw error;
  }
};

export { makeDonation };
