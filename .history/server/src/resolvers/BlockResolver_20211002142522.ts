import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Block } from "../schemas/Block";
import { BlockDetail } from "../schemas/BlockDetail";
import { Context } from "../types/Context";
import { fetchBlockDetails, fetchBlocks } from "../services/block";

@Resolver()
export class BlockResolver {
  @Query(() => [Block], { nullable: true })
  async blocks(@Ctx() ctx: Context) {
    return fetchBlocks()
  }
  @Query(() => BlockDetail, { nullable: true })
  async blockDetails(@Arg("hash") hash: string) {
    const blockDetail = fetchBlockDetails(hash);
    return blockDetail;
  }
}
