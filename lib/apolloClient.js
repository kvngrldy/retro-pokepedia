import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { parse } from "graphql";

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "https://graphql-pokeapi.graphcdn.app/",
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            pokemons: {
              keyArgs: false,
              merge(existing, incoming) {
                let clone = JSON.parse(JSON.stringify(incoming));
                let bag = JSON.parse(localStorage.getItem("MyBag"));
                for (let i = 0; i < clone.results.length; i++) {
                  clone.results[i].total_owned = 0;
                  bag?.map((content) => {
                    if (content.name === clone.results[i].name) {
                      clone.results[i].total_owned += 1;
                    }
                  });
                }

                if (!incoming) return existing;

                if (!existing) return clone;

                const { pokemons, ...rest } = clone;

                let result = rest;

                result.results = [...existing.results, ...result.results];

                return result;
              },
            },
          },
        },
      },
    }),
  });
};

export default createApolloClient;
