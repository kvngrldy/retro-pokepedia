import { useQuery } from "@apollo/client";
import GET_POKEMON_DETAIL from "../../../lib/queries/getPokemonDetail";
import { useState } from "react";
import { initializeApollo } from "../../../lib/apollo";
import { useRouter } from "next/router";

/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

const ThrowBall = css`
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: throw 4s;

  /* When the animation is finished, start again */

  animation-iteration-count: 1;
`;

const Shrink = css`
  animation: shrink 4s;
  animation-iteration-count: 1;
`;

const ShakyBall = css`
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 1s;

  /* When the animation is finished, start again */

  animation-iteration-count: infinite;
`;

const PrimaryText = css({
  fontSize: "18px",
  margin: "0",
  color: "#393232",
});

const Container = css`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: #4f8a8b;
`;

const width = css`
  height: 100%;

  ${mq[0]} {
    width: 100%;
  }
  ${mq[1]} {
    width: 50%;
  }
`;

const Border = css`
  height: 85%;
  border-style: solid;
  border-width: 0.125em 0;
  box-shadow: -0.25em 0 0 -0.125em, 0.25em 0 0 -0.125em;
  margin: 5px 15px;
  padding: 0.5em 0.25em;
  position: relative;
  z-index: 1;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  &:before {
    background-color: inherit;
    border: inherit;
    border-width: 0 0.125em;
    bottom: 0.25em;
    content: "";
    left: -0.375em;
    pointer-events: none;
    position: absolute;
    top: 0.25em;
    right: -0.375em;
    z-index: -1;
  }

  &:after {
    background: inherit;
    border: inherit;
    border-width: 0 0.125em;
    bottom: 0.125em;
    content: "";
    left: -0.25em;
    position: absolute;
    top: 0.125em;
    right: -0.25em;
    z-index: -2;
  }
`;

const PokemonDetail = ({ pokemon_name }) => {
  const router = useRouter();
  const [ball_thrown, set_ball_thrown] = useState(false);
  const [gotcha, set_gotcha] = useState(null);
  const [nickname, set_nickname] = useState("");
  const [is_exist, set_is_exist] = useState(false);

  const { data, error, loading } = useQuery(GET_POKEMON_DETAIL, {
    variables: {
      name: pokemon_name,
    },
  });

  const fiftyFifty = () => {
    return Math.random() < 0.5;
  };

  const throwBall = async () => {
    set_gotcha(null);
    set_ball_thrown(true);
    setTimeout(() => {
      set_ball_thrown(false);

      if (fiftyFifty()) {
        set_gotcha("Gotcha!");
      } else {
        set_gotcha(`${data.pokemon.name} ran away!`);
      }
    }, 4000);
  };

  const addToBag = (obj) => {
    let name_exist = false;
    const bagContent = JSON.parse(localStorage.getItem("MyBag")) || [];
    bagContent.map((bag) => {
      if (bag.nickname === obj.nickname) {
        name_exist = true;
      }
    });
    if (name_exist) {
      return false;
    }
    bagContent.push(obj);
    localStorage.setItem("MyBag", JSON.stringify(bagContent));
    return true;
  };

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>ooops...</p>;

  return (
    <div css={Container}>
      <div css={width}>
        <div
          style={{
            display: "flex",
            height: "10%",
            paddingLeft: "1rem",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <div onClick={() => router.push("/")}>
            <p>Back</p>
          </div>
        </div>
        <div css={Border}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "35%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {!gotcha ? (
                data.pokemon.types.map((type, index) => (
                  <div
                    style={{
                      marginRight: "0.5rem",
                      border: "1px solid #666666",
                      backgroundColor: "#666666",
                      borderRadius: "10px",
                      padding: "5px",
                    }}
                    key={index}
                  >
                    <p
                      style={{
                        color: "whitesmoke",
                        margin: "0px",
                        fontFamily: "'Press Start 2P'",
                        fontSize: "10px",
                      }}
                    >
                      {type.type.name}
                    </p>
                  </div>
                ))
              ) : (
                <p css={PrimaryText}>{gotcha}</p>
              )}
            </div>

            <div style={{ height: "100%", position: "relative" }}>
              {gotcha === `${data.pokemon.name} ran away!` ? null : (
                <img
                  alt="retropokepedia"
                  style={{ width: "100%", height: "100%" }}
                  css={ball_thrown ? Shrink : null}
                  src={data.pokemon.sprites.front_default}
                />
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "'Press Start 2P'",
              flexDirection: "column",
              padding: "1rem",
              height: "65%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "40%",
                overflowY: "auto",
              }}
            >
              {gotcha === "Gotcha!" ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {is_exist ? (
                    <p>Name already exist!</p>
                  ) : (
                    <p style={{ textAlign: "center" }}>Name your new friend!</p>
                  )}

                  <form
                    id="nickname"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const status = await addToBag({
                        name: data.pokemon.name,
                        img: data.pokemon.sprites.front_default,
                        nickname: nickname,
                      });
                      if (status) {
                        router.push("/bag");
                        set_nickname("");
                        return false;
                      } else {
                        set_is_exist(true);
                        set_nickname("");
                        return false;
                      }
                    }}
                  >
                    <input
                      css={Border}
                      type="text"
                      id="nickname"
                      name="nickname"
                      value={nickname}
                      onChange={(e) => set_nickname(e.target.value)}
                    />
                  </form>
                </div>
              ) : (
                data.pokemon.stats.map((stat, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                      color: "grey",
                    }}
                  >
                    <p style={{ margin: "0%" }}>{stat.stat.name}</p>
                    <p style={{ margin: "0%" }}>{stat.base_stat}</p>
                  </div>
                ))
              )}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "60%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                }}
              >
                <div>
                  <p style={{ marginBottom: "2px" }}>Moves</p>
                </div>
                <div
                  style={{
                    height: "100%",
                    overflowY: "auto",
                  }}
                >
                  {data.pokemon.moves.map((skill, index) => (
                    <p
                      key={index}
                      style={{
                        marginTop: "4px",
                        fontSize: "8px",
                        marginBottom: "4px",
                      }}
                    >
                      {skill.move.name}
                    </p>
                  ))}
                </div>
              </div>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  if (gotcha === null) {
                    throwBall();
                  }
                }}
              >
                <img
                  alt="retropokepedia"
                  css={ball_thrown ? ThrowBall : ShakyBall}
                  style={{ width: "100px", height: "100px", zIndex: "-1" }}
                  src="/img/pokeball.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;

export const getServerSideProps = async ({ query }) => {
  const pokemon_name = query.pokemon_name;
  const apolloClient = initializeApollo();

  try {
    await apolloClient.query({
      query: GET_POKEMON_DETAIL,
      variables: {
        name: query.pokemon_name,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return {
    props: { initialApolloState: apolloClient.cache.extract(), pokemon_name },
  };
};
