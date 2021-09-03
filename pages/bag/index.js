/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import NavigationMenu from "../../components/NavigationMenu";
import { useEffect, useState } from "react";
import BagCardList from "../../components/BagCardList";

const ScrollableContainer = css({
  overflowY: "auto",
  height: "100%",
  overflowX: "hidden",
});

export default function Bag() {
  const [data, set_data] = useState([]);

  useEffect(() => {
    set_data(JSON.parse(localStorage.getItem("MyBag")));
  }, []);

  return (
    <div css={ScrollableContainer}>
      <div
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>INVENTORY</p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr)",
        }}
      >
        {data?.map((data, index) => (
          <div key={index}>
            <BagCardList set_data={set_data} key={index} props={data} />
          </div>
        ))}
      </div>
      <NavigationMenu />
    </div>
  );
}
