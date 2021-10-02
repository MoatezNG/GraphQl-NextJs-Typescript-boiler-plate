import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Block } from "../schemas/Block";
import { fetchBlocks } from "../services/block";

@Resolver()
export class BlockResolver {
  @Query(() => [Block], { nullable: true })
  async blocks() {
    return fetchBlocks();
  }
}
