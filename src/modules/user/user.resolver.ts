import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './entities/user.entity';
import { UpdateUserInput, UserInput } from './inputs/user.input';
import { UserType } from './types/user.type';
import { CurrentUser } from './user.decorator';
import { UserService } from './user.service';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserType])
  @UseGuards(JwtAuthGuard)
  async getUsers(): Promise<User[]> {
    try {
      return this.userService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Query(() => UserType)
  @UseGuards(JwtAuthGuard)
  async getUser(
    @CurrentUser() user: any,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User> {
    try {
      return this.userService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Query(() => UserType)
  @UseGuards(JwtAuthGuard)
  async getUserByEmail(@Args('email') email: string): Promise<User> {
    try {
      return this.userService.findByEmail(email);
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => UserType)
  @UseGuards(JwtAuthGuard)
  async createUser(@Args('user') user: UserInput): Promise<User> {
    try {
      return this.userService.create(user);
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => UserType)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('user') user: UpdateUserInput,
  ): Promise<User> {
    try {
      return this.userService.update(id, user);
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => UserType)
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Args('id', { type: () => Int }) id: number): Promise<void> {
    try {
      this.userService.remove(id);
      return;
    } catch (error) {
      throw error;
    }
  }
}
