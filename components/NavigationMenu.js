/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

const PrimaryText = css({
  fontSize: "11px",
  margin: "0",
  color: "#ffffff",
});

const SecondaryText = css({
  fontSize: "10px",
  margin: "0",
  color: "#393232",
});

const Navigation = css({
  position: "absolute",
  bottom: "0px",
  height: "50px",
  zIndex: "99",
  backgroundColor: "whitesmoke",
  display: "flex",
  flexDirection: "row",
  width: "100%",
});

const active = css`
  background-color: #666666;
`;

const NavigationMenu = ({ props }) => {
  const router = useRouter();

  const [active_menu, set_active_menu] = useState(router.route);
  return (
    <div css={Navigation}>
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => router.push("/")}
        css={active_menu === "/" ? active : null}
      >
        <div>
          <Image
            alt="retropokepedia"
            width={"25px"}
            height={"25px"}
            src="/icon/explore.png"
          />
        </div>
        <p css={active_menu === "/" ? PrimaryText : SecondaryText}> EXPLORE </p>
      </div>
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => router.push("/bag")}
        css={active_menu !== "/" ? active : null}
      >
        <div>
          <Image
            alt="retropokepedia"
            width={"25px"}
            height={"25px"}
            src="/icon/inventory.png"
          />
        </div>
        <p css={active_menu !== "/" ? PrimaryText : SecondaryText}>
          {" "}
          INVENTORY{" "}
        </p>
      </div>
    </div>
  );
};

export default NavigationMenu;
