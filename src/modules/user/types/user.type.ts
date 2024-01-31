import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TodoType } from '../../todo/types/todo.type';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  fullName: string;

  @Field(() => [TodoType], { defaultValue: [] })
  todos: TodoType[];
}
