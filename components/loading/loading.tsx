import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Head from 'next/head'
const loading = () => {
  return (
    <div style={{position: "absolute", top: "50%", left: "50%" , transform: "translate(-50%,-50%)"}}>
        <Head>
            <title>Chat App | Loading...</title>
        </Head>
      <Loader
        type="Puff"
        color="#49a6a6"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </div>
  );
};

export default loading;
