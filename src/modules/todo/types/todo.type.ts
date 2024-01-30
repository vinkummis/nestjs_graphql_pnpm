import { ObjectType, ID, Field } from '@nestjs/graphql';

@ObjectType()
export class TodoType {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  status: string;
}
