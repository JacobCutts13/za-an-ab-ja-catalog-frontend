export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://pastebin-abdulsaj.herokuapp.com/"
    : "http://localhost:4000/";

export const frontendURL =
  process.env.NODE_ENV === "production"
    ? "https://incredible-kulfi-5ae6a9.netlify.app/"
    : "http://localhost:3000/";
