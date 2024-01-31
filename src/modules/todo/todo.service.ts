import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { TodoInput, UpdateTodoInput } from './inputs/todo.input';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne({ where: { id } });
  }

  async create(todo: TodoInput): Promise<Todo> {
    const todoData = this.todoRepository.create(todo);
    return this.todoRepository.save(todoData);
  }

  async update(id: number, todo: UpdateTodoInput): Promise<Todo> {
    const todoData = await this.findOne(id);
    Object.assign(todoData, todo);
    await this.todoRepository.save(todoData);
    return todoData;
  }

  async remove(id: number): Promise<void> {
    const todoData = await this.findOne(id);
    await this.todoRepository.remove(todoData);
  }

  async getTasksByUserId(userId: number): Promise<Todo[]> {
    return this.todoRepository.find({ where: { user: { id: userId } } });
  }
}
