import { User } from "../schemas/Block";
import data from '../data/users.json';
export const fetchBlocks = async (): Promise<User[]> => {

  return data
};
