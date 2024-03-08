import client from "@/apolloConfig";
import { ApolloProvider } from "@apollo/client";

export default function App({
  Component,
  props,
}: {
  Component: any;
  props: any;
}) {
  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
}
