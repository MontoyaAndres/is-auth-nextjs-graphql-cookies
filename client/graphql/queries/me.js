import gql from "graphql-tag";

const meQuery = gql`
  query MeQuery {
    me {
      name
      telephone
    }
  }
`;

export default meQuery;
