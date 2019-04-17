export const createMiddleware = (middlewareFunc: any, resolverFunc: any) => (
  parent: any,
  args: any,
  context: any,
  info: any
) => middlewareFunc(resolverFunc, parent, args, context, info);
