const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    random: String
  }
`;

let counter = 0;

const resolvers = {
  Query: {
    random: (_1, _2, context) => {
      counter++;
      console.log("RECEIVED REQUEST FOR: ", context.path);
      return `${context.path} - ${counter} - ${Date.now()} - ${(Math.floor(Math.random() * 10) + 1)}`;
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { path: req.headers.path };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
