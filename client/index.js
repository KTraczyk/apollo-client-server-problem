const express = require('express');
const { ApolloClient, InMemoryCache, gql, HttpLink } = require('@apollo/client');
const fetch = require("cross-fetch");

const app = express();
const port = 4001;

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
  },
  query: {
    fetchPolicy: "no-cache",
  },
  mutate: {
    fetchPolicy: "no-cache",
  },
};
const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/', fetch }),
  cache: new InMemoryCache(),
  defaultOptions,
});

app.get("/*", async (req, res) => {
  console.log(`SENDING REQUEST FOR PATH: ${req.path}`);
  const data = await client
  .query({
    query: gql`
      query Random {
        random
      }
    `,
    context: {
      headers: { PATH: req.path },
    }
  })
  .then((result) => result.data);
  console.log(`RECEIVED RESPONSE: ${req.path}`, data);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Client listening on port ${port}`)
});
