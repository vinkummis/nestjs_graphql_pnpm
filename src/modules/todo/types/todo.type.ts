import { ObjectType, ID, Field } from '@nestjs/graphql';
import { UserType } from '../../user/types/user.type';

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

  @Field(() => UserType)
  user: UserType;
}
