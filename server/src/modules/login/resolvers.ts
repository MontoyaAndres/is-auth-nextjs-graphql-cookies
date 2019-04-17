import { createMiddleware } from "../../utils/createMIddleware";
import isAuthenticated from "../shared/authMiddleware";
import { GQL } from "../../types/schema";

export const resolvers = {
  Query: {
    me: createMiddleware(isAuthenticated, async () => {
      return {
        name: "Andrés",
        telephone: "321312312"
      };
    })
  },
  Mutation: {
    login: async (
      _: any,
      { email, password }: GQL.ILoginOnMutationArguments,
      { session }: any
    ) => {
      if (email === "andresmontoyafcb@gmail.com" && password === "hellothere") {
        // login successful
        session.userId = "randomid123";

        return true;
      }

      return false;
    }
  }
};
