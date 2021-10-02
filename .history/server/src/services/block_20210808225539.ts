import { Block } from "../schemas/Block";
import fetch from "node-fetch";
import { BlockDetail } from "../schemas/BlockDetail";

export const fetchBlocks = async (): Promise<Block[]> => {
  return fetch(
    `${process.env.BLOCKCHAIN_INFO}/blocks/${new Date().getTime()}?format=json`
  ).then((res) => res.json());
};

export const fetchBlockDetails = async (
  hash: string
): Promise<BlockDetail[]> => {
  return fetch(`${process.env.BLOCKCHAIN_INFO}/rawblock/${hash}`).then((res) =>
    res.json()
  );
};
