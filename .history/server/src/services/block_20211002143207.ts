import { Block } from "../schemas/Block";
import fetch from "node-fetch";

export const fetchBlocks = async (): Promise<Block[]> => {
  console.log('hello');
  return fetch(
    `${process.env.BLOCKCHAIN_INFO}/blocks/${new Date().getTime()}?format=json`
  ).then((res) => res.json());
};
