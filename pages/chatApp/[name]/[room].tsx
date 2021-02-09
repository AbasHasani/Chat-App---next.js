import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useState, FC } from "react";
import io from "socket.io-client";
import { useRouter } from "next/router";
import { useStateValue } from "../../../context/Context";
import Loading from "../../../components/loading/loading";
import ChatApp from "../../../components/chat/chatApp";

interface Props {
  params: {
    name: string;
    room: string;
  };
}

const Chat: FC<Props> = ({ params }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loading />;
  } else {
    return <ChatApp params={params} />;
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      params: { name: context.params.name, room: context.params.room },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { name: "Abas", room: "Javascript" } }],
    fallback: true,
  };
};

export default Chat;
