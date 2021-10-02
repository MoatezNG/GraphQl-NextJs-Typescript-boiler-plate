import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Block } from "../schemas/Block";
import { Context } from "../types/Context";
import { fetchBlockDetails, fetchBlocks } from "../services/block";

@Resolver()
export class BlockResolver {
  @Query(() => [Block], { nullable: true })
  async blocks(@Ctx() ctx: Context) {
    return fetchBlocks();
  }
}
