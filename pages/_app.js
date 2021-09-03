import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";

import { Global, css } from "@emotion/react";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  const breakpoints = [576, 768, 992, 1200];

  const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

  return (
    <>
      <Global
        styles={css`
          @import url(https://fonts.googleapis.com/css?family=Press+Start+2P);
          html,
          body {
            height: 100vh;
            padding: 0;

            margin: 0;
            font-family: "Press Start 2P";
            input[type="text"] {
              font-family: "Press Start 2P";
            }
          }

          @keyframes shake {
            0% {
              transform: translate(1px, 1px) rotate(0deg);
            }
            10% {
              transform: translate(-1px, -2px) rotate(-1deg);
            }
            20% {
              transform: translate(-3px, 0px) rotate(1deg);
            }
            30% {
              transform: translate(3px, 2px) rotate(0deg);
            }
            40% {
              transform: translate(1px, -1px) rotate(1deg);
            }
            50% {
              transform: translate(-1px, 2px) rotate(-1deg);
            }
            60% {
              transform: translate(-3px, 1px) rotate(0deg);
            }
            70% {
              transform: translate(3px, 1px) rotate(-1deg);
            }
            80% {
              transform: translate(-1px, -1px) rotate(1deg);
            }
            90% {
              transform: translate(1px, 2px) rotate(0deg);
            }
            100% {
              transform: translate(1px, -2px) rotate(-1deg);
            }
          }

          @keyframes shrink {
            0% {
              transform: scale(1);
            }
            10% {
              transform: scale(1);
            }
            15% {
              transform: scale(0);
            }

            100% {
              transform: scale(0);
            }
          }

          @keyframes throw {
            15% {
              transform: translate(-70%, -450%) rotate(5deg) scale(0.5);
            }
            20% {
              transform: translate(-70%, -430%) rotate(30deg) scale(0.5);
            }

            30% {
              transform: translate(-70%, -415%) rotate(-30deg) scale(0.5);
            }

            40% {
              transform: translate(-70%, -415%) rotate(30deg) scale(0.5);
            }
            50% {
              transform: translate(-70%, -415%) rotate(-30deg) scale(0.5);
            }
            60% {
              transform: translate(-70%, -415%) rotate(30deg) scale(0.5);
            }
            70% {
              transform: translate(-70%, -415%) rotate(-30deg) scale(0.5);
            }
            80% {
              transform: translate(-70%, -415%) rotate(0deg) scale(0.5);
            }

            85% {
              transform: translate(-70%, -415%) rotate(0deg) scale(0.5);
            }

            90% {
              transform: translate(-70%, -415%) rotate(0deg) scale(0.5);
            }

            95% {
              transform: translate(-70%, -415%) rotate(0deg) scale(0.5);
            }

            100% {
              transform: translate(-70%, -415%) rotate(0deg) scale(0.5);
            }
          }

          #__next {
            height: 100%;
          }
        `}
      />
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}

export default MyApp;
