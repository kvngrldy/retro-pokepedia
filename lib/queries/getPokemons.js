import gql from "graphql-tag";

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      nextOffset
      results {
        url
        name
        image
        total_owned @client
      }
    }
  }
`;

export default GET_POKEMONS;
