import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Block } from "../schemas/Block";
import { BlockDetail } from "../schemas/BlockDetail";
import { Context } from "../types/Context";
import { fetchBlockDetails } from "../services/block";
import { listingBlocksCache } from "../constants/cache";

@Resolver()
export class BlockResolver {
  @Query(() => [Block], { nullable: true })
  async blocks(@Ctx() ctx: Context) {
    const redisdata = await ctx.redis.lrange(listingBlocksCache, 0, -1);
    console.log(redisdata.map((x: string) => JSON.parse(x)).length);

    return redisdata.map((x: string) => JSON.parse(x));
  }
  @Query(() => BlockDetail, { nullable: true })
  async blockDetails(@Arg("hash") hash: string) {
    const blockDetail = fetchBlockDetails(hash);
    return blockDetail;
  }
}
