import React from "react";

import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";

const index = () => <h1>hey</h1>;

index.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (!loggedInUser.me) {
    redirect(context, "/login");
  }

  return {};
};

export default index;
