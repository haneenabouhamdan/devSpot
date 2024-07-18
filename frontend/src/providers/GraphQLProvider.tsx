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
import { useToast } from '@chakra-ui/react';

interface GraphQLProviderProps {
  children: ReactNode;
}

interface HTTPContextValues {
  authenticate: (token: string) => void;
  graphQLClient?: ApolloClient<NormalizedCacheObject>;
}

const HTTPContext = createContext<HTTPContextValues>({
  authenticate: token => {
    console.group('[HTTPContext]: authenticate');
    console.log('This method is not implemented yet!');
    console.log(token);
    console.groupEnd();
  },
  graphQLClient: undefined,
});

const getApolloLinks = (toast: ReturnType<typeof useToast>, token?: string) => {
  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        toast({
          title: 'Error',
          description: message,
          status: 'error',
          duration: 5000,
          position: 'top-right',
          isClosable: true,
        });
      });
    }
  });

  const httpLink = createHttpLink({
    uri: Config.GRAPHQL_ENDPOINT,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  return errorLink.concat(httpLink);
};

const createGraphQLClient = (
  toast: ReturnType<typeof useToast>,
  token?: string
) =>
  new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link: getApolloLinks(toast, token),
  });

export const GraphQLProvider = ({ children }: GraphQLProviderProps) => {
  const [graphQLClient, setGraphQLClient] =
    useState<ApolloClient<NormalizedCacheObject>>();
  const toast = useToast();

  useEffect(() => {
    setGraphQLClient(createGraphQLClient(toast));
  }, [toast]);

  const authenticate = useCallback(
    (token: string) => {
      setGraphQLClient(() => createGraphQLClient(toast, token));
    },
    [toast]
  );

  const httpProviderValue = useMemo(
    () => ({ authenticate, graphQLClient }),
    [authenticate, graphQLClient]
  );

  if (!httpProviderValue.graphQLClient) {
    return null;
  }

  return (
    <ApolloProvider client={httpProviderValue.graphQLClient}>
      <HTTPContext.Provider value={httpProviderValue}>
        {children}
      </HTTPContext.Provider>
    </ApolloProvider>
  );
};

export const useHTTPContext = () => useContext(HTTPContext);
