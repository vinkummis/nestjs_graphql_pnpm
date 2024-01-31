import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from '../../user/types/user.type';

@ObjectType()
export class AuthType extends UserType {
  @Field()
  access_token?: string;

  @Field()
  isAuthenticated?: boolean;
}
