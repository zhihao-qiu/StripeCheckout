import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
// TODO add graphql backend url in .env file
const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_BACKEND,
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})
