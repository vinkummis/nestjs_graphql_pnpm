import { Field, InputType } from '@nestjs/graphql';
import { UserType } from '../../user/types/user.type';

@InputType()
export class TodoInput {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  status: string;

  user?: UserType;
}

@InputType()
export class UpdateTodoInput {
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  status: string;
}
