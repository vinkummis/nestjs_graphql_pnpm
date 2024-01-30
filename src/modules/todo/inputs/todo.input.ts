import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TodoInput {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  status: string;
}
