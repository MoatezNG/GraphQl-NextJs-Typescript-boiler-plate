import { User } from '../schemas/User';
import * as data from '../data/users.json';

export const getUsers = async (): Promise<User[]> => data;
