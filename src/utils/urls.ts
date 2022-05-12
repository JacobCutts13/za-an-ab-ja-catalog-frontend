export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://za-an-ab-ja-catalog.herokuapp.com/"
    : "http://localhost:4000/";

export const frontendURL =
  process.env.NODE_ENV === "production"
    ? "https://creative-crumble-9b3f47.netlify.app/"
    : "http://localhost:3000/";
