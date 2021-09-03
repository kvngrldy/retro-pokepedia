import { useQuery } from "@apollo/client";
import GET_POKEMONS from "../lib/queries/getPokemons";
import PokemonCards from "../components/PokemonCard";
import NavigationMenu from "../components/NavigationMenu";
import { useState } from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

const ScrollableContainer = css({
  overflowY: "auto",
  height: "100%",
});

export default function Home() {
  const [loading_fetch, set_loading_fetch] = useState(false);

  const { data, loading, error, fetchMore } = useQuery(GET_POKEMONS, {
    variables: {
      offset: 0,
      limit: 18,
    },
  });

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      addMore();
    }
  };

  const addMore = async () => {
    set_loading_fetch(true);
    await fetchMore({
      variables: { offset: data.pokemons.nextOffset, limit: 12 },
    });
    set_loading_fetch(false);
  };

  if (loading) return <p>loading...</p>;
  if (error) return <p>ooopss..</p>;

  return (
    <div css={ScrollableContainer} onScroll={(e) => handleScroll(e)}>
      <div
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>POKEDEX</p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0,1fr)",
        }}
      >
        {data.pokemons.results?.map((pokemon, index) => (
          <div key={index}>
            <PokemonCards key={index} props={pokemon} />
          </div>
        ))}
        {loading_fetch && <p>Loading Pokemon....</p>}
      </div>
      <NavigationMenu />
    </div>
  );
}
