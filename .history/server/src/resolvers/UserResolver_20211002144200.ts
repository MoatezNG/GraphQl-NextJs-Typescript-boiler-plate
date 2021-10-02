import { Query, Resolver } from "type-graphql";
import { User } from "../schemas/User";
import { fetchBlocks } from "../services/block";

@Resolver()
export class UserResolver {
  @Query(() => [User], { nullable: true })
  async blocks() {
    const data = await fetchBlocks();
    console.log(data);
    return data;
  }
}
