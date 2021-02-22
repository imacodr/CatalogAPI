// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import buildUrl from "build-url";
import fetch from "node-fetch";

export default async (req, res) => {
  try {
    const url = buildUrl(`https://catalog.roblox.com/`, {
      path: "v1/search/items/details",
      queryParams: {
        MaxPrice: "0",
        Cursor: req.query.cursor,
      },
    });
    console.log(url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Invalid");
    }
    const data = await response.json();
    res.send({
      success: true,
      items: data.data,
      nextPage: data.nextPageCursor,
      previousPage: data.previousPageCursor,
    });
  } catch (e) {
    console.error(e.message);
    res.send({ success: false });
  }
};
