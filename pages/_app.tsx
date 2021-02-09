import type { AppProps } from "next/app";
import "../styles/Global.scss";
import { StateProvider as Provider } from "../context/Context";
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
