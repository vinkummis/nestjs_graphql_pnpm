import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoType } from './types/todo.type';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { TodoInput } from './inputs/todo.input';
import { CustomResponse } from '../../helpers/custom-response.model';

@Resolver(() => TodoType)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}
  @Query(() => [TodoType])
  async getTodos(): Promise<CustomResponse<Todo[]>> {
    try {
      const todos = await this.todoService.findAll();
      return CustomResponse.of(todos, 200, 'Success');
    } catch (error) {
      return CustomResponse.of(null, 500, error.message);
    }
  }

  @Query(() => TodoType)
  async getTodo(@Args('id') id: number): Promise<Todo> {
    try {
      return this.todoService.findOne(id);
    } catch (error) {}
  }

  @Mutation(() => TodoType)
  async createTodo(@Args('todo') todo: TodoInput): Promise<Todo> {
    try {
      return this.todoService.create(todo);
    } catch (error) {}
  }

  @Mutation(() => TodoType)
  async updateTodo(
    @Args('id') id: number,
    @Args('todo') todo: TodoInput,
  ): Promise<Todo> {
    try {
      return this.todoService.update(id, todo);
    } catch (error) {}
  }

  @Mutation(() => TodoType)
  async deleteTodo(@Args('id') id: number): Promise<void> {
    try {
      return this.todoService.remove(id);
    } catch (error) {}
  }
}
