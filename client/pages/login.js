import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import Router from "next/router";

import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const login = () => {
  const [state, setState] = useState({ email: "", password: "" });

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  return (
    <Mutation mutation={loginMutation}>
      {mutate => (
        <form
          onSubmit={async e => {
            e.preventDefault();
            const { data } = await mutate({
              variables: { ...state }
            });

            if (data.login) {
              Router.push("/");
            } else {
              alert("ERROR!!!");
            }
          }}
        >
          <input name="email" value={state.email} onChange={handleChange} />
          <input
            name="password"
            value={state.password}
            onChange={handleChange}
          />
          <button type="submit">Sign in!</button>
        </form>
      )}
    </Mutation>
  );
};

login.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (loggedInUser.me) {
    redirect(context, "/");
  }

  return {};
};

export default login;
