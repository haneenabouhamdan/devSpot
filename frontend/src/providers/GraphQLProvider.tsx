import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  type NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Config } from '../config';

interface GraphQLProviderProps {
  children: ReactNode;
}

interface HTTPContextValues {
  authenticate: (token: string) => void;
  graphQLClient?: ApolloClient<NormalizedCacheObject>;
}

const getApolloLinks = (token?: string) => {
  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message }) =>{
        if(message === 'Subscribe to request deliveries'){
         console.log("warning",{message})
        }else{
          console.log({message})
          }
        })
  });

  const httpLink = createHttpLink({
    uri: Config.GRAPHQL_ENDPOINT,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  return errorLink.concat(httpLink);
};

const createGraphQLClient = (token?: string) =>
  new ApolloClient({
    uri: Config.GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link: getApolloLinks(token),
  });

const HTTPContext = createContext<HTTPContextValues>({
  authenticate: (token) => {
    console.group('[HTTPContext]: authenticate');
    console.log('This method is not implemented yet!');
    console.log(token);
    console.groupEnd();
  },
  graphQLClient: createGraphQLClient(),
});

export const GraphQLProvider = ({ children }: GraphQLProviderProps) => {
  const [graphQLClient, setGraphQLClient] = useState<ApolloClient<NormalizedCacheObject>>();

  useEffect(() => {
    setGraphQLClient(createGraphQLClient());
  }, []);

  const authenticate = useCallback((token: string) => {
    setGraphQLClient((prevState) => createGraphQLClient(token));
  }, []);

  const httpProviderValue = useMemo(
    () => ({ authenticate, graphQLClient }),
    [authenticate, graphQLClient]
  );

  if (!httpProviderValue.graphQLClient) {
    return null;
  }

  return (
    <ApolloProvider client={httpProviderValue.graphQLClient}>
      <HTTPContext.Provider value={httpProviderValue}>{children}</HTTPContext.Provider>
    </ApolloProvider>
  );
};

export const useHTTPContext = () => useContext(HTTPContext);
