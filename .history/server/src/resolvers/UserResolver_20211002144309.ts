import { Query, Resolver } from "type-graphql";
import { User } from "../schemas/User";
import { getUsers } from "../services/user";

@Resolver()
export class UserResolver {
  @Query(() => [User], { nullable: true })
  async users() {
    const data = await getUsers();
    console.log(data);
    return data;
  }
}
