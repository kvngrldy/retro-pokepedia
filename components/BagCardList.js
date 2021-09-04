/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useRouter } from "next/router";
import Image from "next/image";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

const Card = css`
  margin: 5px 15px;
  padding: 0.5em 0.375em;
  position: relative;
  z-index: 1;

  &:before {
    background-color: inherit;

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

const deleteIcon = css({
  position: "relative",
  right: "-50%",
});

const BagCardList = ({ props, set_data }) => {
  const deletePokemon = (nickname) => {
    let bag = JSON.parse(localStorage.getItem("MyBag"));
    // let obj = bag.find((o) => o.nickname === nickname);
    let newCard = bag.filter(function (obj) {
      return obj.nickname !== nickname;
    });
    set_data(newCard);
    localStorage.setItem("MyBag", JSON.stringify(newCard));
  };

  return (
    <div css={Card}>
      <div css={CardData}>
        <div onClick={() => deletePokemon(props.nickname)} css={deleteIcon}>
          <Image
            alt="retropokepedia"
            width={"20px"}
            height={"20px"}
            src="/icon/delete.png"
          />
        </div>
        <div css={ImageContainer}>
          <Image
            alt="retropokepedia"
            width={"200px"}
            height={"200px"}
            src={props.img}
          />
        </div>
        <div css={{ width: "100%", textAlign: "center" }}>
          <p css={PrimaryText}>{props.nickname}</p>
        </div>
        <div css={{ width: "100%", textAlign: "center" }}>
          <p css={SecondaryText}>{props.name}</p>
        </div>
      </div>
    </div>
  );
};

export default BagCardList;
