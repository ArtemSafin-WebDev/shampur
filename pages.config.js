import home from "./pages-data/home";
import notFound from "./pages-data/not-found";
import success from "./pages-data/success";
import error from "./pages-data/error";
import checkout from "./pages-data/checkout";

const pagesConfig = {
  ...home,
  ...notFound,
  ...success,
  ...error,
  ...checkout,
};

export default pagesConfig;
