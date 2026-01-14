import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema';
import { auth } from "@/auth";


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

export default startServerAndCreateNextHandler(server, {
  context: async () => {
    const session = await auth();
    return { session };
  }
});
