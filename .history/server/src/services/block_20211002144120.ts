import { User } from "../schemas/Block";
import * as data from '../data/users.json';
export const fetchBlocks = async (): Promise<User[]> => {

  return data
};
