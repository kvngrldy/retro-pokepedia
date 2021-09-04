/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useRouter } from "next/router";
import Image from "next/image";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

const Card = css`
  border-style: solid;
  border-width: 0.125em 0;
  margin: 5px 15px;
  padding: 0.5em 0.375em;
  position: relative;
  z-index: 1;

  &:before {
    background-color: inherit;
    border: inherit;
    border-width: 0 0.125em;
    bottom: 0.125em;
    content: "";
    left: -0.25em;
    pointer-events: none;
    position: absolute;
    top: 0.125em;
    right: -0.25em;
    z-index: -1;
  }

  &:after {
    border: inherit;
    border-width: 0 0.125em;
    bottom: 0;
    content: "";
    left: -0.125em;
    position: absolute;
    top: 0;
    right: -0.125em;
    z-index: -2;
  }
`;

const ImageContainer = css({
  width: "75px",
  [mq[1]]: {
    width: "100px",
  },
  [mq[2]]: {
    width: "200px",
  },
});

const PrimaryText = css({
  fontSize: "10px",
  margin: "0",
  color: "#393232",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",

  [mq[1]]: {
    fontSize: "18px",
  },
  [mq[2]]: {
    fontSize: "24px",
  },
});

const SecondaryText = css({
  fontSize: "6px",
  color: "gray",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  [mq[1]]: {
    fontSize: "12px",
  },
  [mq[2]]: {
    fontSize: "18px",
  },
});

const CardData = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
});

const PokemonCards = ({ props }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/pokemon/${props.name}`);
      }}
      css={Card}
    >
      <div css={CardData}>
        <div css={ImageContainer}>
          <Image
            alt="retropokepedia"
            width={"200px"}
            height={"200px"}
            src={props.image}
          />
        </div>
        <div css={{ width: "100%", textAlign: "center" }}>
          <p css={PrimaryText}>{props.name}</p>
        </div>
        <div css={{ width: "100%", textAlign: "center" }}>
          <p css={SecondaryText}>Owned : {props.total_owned}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonCards;
