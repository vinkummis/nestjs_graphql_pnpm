import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserRegisterInput } from './inputs/auth.input';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthType } from './types/auth.type';

@Resolver(() => AuthType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthType)
  async registerUser(
    @Args('userData') userInput: UserRegisterInput,
  ): Promise<AuthType> {
    try {
      const user = await this.authService.registerUser(userInput);

      return user;
    } catch (error) {
      return error;
    }
  }

  @UseGuards(LocalAuthGuard)
  @Mutation(() => AuthType)
  async loginUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<{ access_token: string }> {
    return this.authService.loginUser(email, password);
  }
}
