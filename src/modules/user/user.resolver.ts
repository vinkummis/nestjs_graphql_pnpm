import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './types/user.type';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserInput } from './inputs/user.input';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserType])
  async getUsers(): Promise<User[]> {
    try {
      return this.userService.findAll();
    } catch (error) {}
  }

  @Query(() => UserType)
  async getUser(@Args('id') id: number): Promise<User> {
    try {
      return this.userService.findOne(id);
    } catch (error) {}
  }

  @Query(() => UserType)
  async getUserByEmail(@Args('email') email: string): Promise<User> {
    try {
      return this.userService.findByEmail(email);
    } catch (error) {}
  }

  @Mutation(() => UserType)
  async createUser(@Args('user') user: UserInput): Promise<User> {
    try {
      return this.userService.create(user);
    } catch (error) {}
  }

  @Mutation(() => UserType)
  async updateUser(
    @Args('id') id: number,
    @Args('user') user: UserInput,
  ): Promise<User> {
    try {
      return this.userService.update(id, user);
    } catch (error) {}
  }

  @Mutation(() => UserType)
  async deleteUser(@Args('id') id: number): Promise<void> {
    try {
      return this.userService.remove(id);
    } catch (error) {}
  }
}
