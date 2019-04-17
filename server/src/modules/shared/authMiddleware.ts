const isAuthenticated = async (
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  // Authentication in general.
  if (!context.session.userId) {
    throw new Error("not authenticated from graphql middleware");
  }

  return resolve(parent, args, context, info);
};

export default isAuthenticated;
