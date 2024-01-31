import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoType } from './types/todo.type';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { TodoInput, UpdateTodoInput } from './inputs/todo.input';
import { User } from '../user/entities/user.entity';
import { CurrentUser } from '../user/user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => TodoType)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}
  @Query(() => [TodoType])
  @UseGuards(JwtAuthGuard)
  async getTodos(@CurrentUser() user: User): Promise<Todo[]> {
    try {
      const todos = await this.todoService.findAll();
      return todos;
    } catch (error) {}
  }

  @Query(() => TodoType)
  @UseGuards(JwtAuthGuard)
  async getTodo(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Todo> {
    try {
      return this.todoService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Query(() => TodoType)
  async getTasksByUserId(@CurrentUser() user: User): Promise<Todo[]> {
    return this.todoService.getTasksByUserId(user.id);
  }

  @Mutation(() => TodoType)
  @UseGuards(JwtAuthGuard)
  async createTodo(
    @CurrentUser() user: User,
    @Args('todo') todo: TodoInput,
  ): Promise<Todo> {
    try {
      todo.user = user;
      console.log(user)
      return this.todoService.create(todo);
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => TodoType)
  @UseGuards(JwtAuthGuard)
  async updateTodo(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number,
    @Args('todo') todo: UpdateTodoInput,
  ): Promise<Todo> {
    try {
      return this.todoService.update(id, todo);
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => TodoType)
  @UseGuards(JwtAuthGuard)
  async deleteTodo(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<void> {
    try {
      return this.todoService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
