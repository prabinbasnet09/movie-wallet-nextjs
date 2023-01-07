// import '../styles/globals.css'
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  const client = new ApolloClient({
    uri: "http://localhost:9000",
    cache: new InMemoryCache(),
  })
  
  return (
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    )
}
