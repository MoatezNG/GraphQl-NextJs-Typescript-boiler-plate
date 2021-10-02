import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Block {
  @Field({ nullable: true })
  hash: string;

  @Field({ nullable: true })
  height: number;

  @Field({ nullable: true })
  time: number;

  @Field({ nullable: true })
  block_index: number;
}
