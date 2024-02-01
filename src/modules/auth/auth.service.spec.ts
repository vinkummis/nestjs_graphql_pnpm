import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';

// Mocking the UserService
jest.mock('../user/user.service');

describe('AuthService', () => {
  let service: AuthService;
  let jwtServiceMock: JwtService;
  let userServiceMock: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, UserService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtServiceMock = module.get<JwtService>(JwtService);
    userServiceMock = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerUser', () => {
    it('should register a user', async () => {
      const userRegisterInput = {
        firstName: 'vinod',
        lastName: 'Mishra',
        email: 'vinod@gmail.com',
        password: '1234',
      };
      const createdUser: Partial<User> = {
        id: 2,
        firstName: 'vinod',
        lastName: 'Mishra',
        email: 'vinod@gmail.com',
      };

      // Mock the UserService create method
      (userServiceMock.create as jest.Mock).mockResolvedValue(createdUser);

      const result = await service.registerUser(userRegisterInput);

      expect(result).toEqual(createdUser);
      expect(userServiceMock.create).toHaveBeenCalledWith(userRegisterInput);
    });
  });

  describe('loginUser', () => {
    it('should login a user and return an access token', async () => {
      const userEmail = 'test@example.com';
      const userPassword = 'password';
      const user = {
        id: 2,
        firstName: 'vinod',
        lastName: 'Mishra',
        email: 'vinod@gmail.com',
      };
      const jwtToken = 'mockedJwtToken';

      // Mock the UserService findByEmail method
      (userServiceMock.findByEmail as jest.Mock).mockResolvedValue(user);

      // Mock the JwtService sign method correctly
      jest.spyOn(jwtServiceMock, 'sign').mockReturnValue(jwtToken);

      const result = await service.loginUser(userEmail, userPassword);

      expect(result).toEqual({ access_token: jwtToken });
      expect(userServiceMock.findByEmail).toHaveBeenCalledWith(userEmail);

      // Make sure to verify that the jwtServiceMock sign method was called
      expect(jwtServiceMock.sign).toHaveBeenCalledWith({
        fullName: userEmail,
        sub: user.id,
      });
    });

    // Add more test cases for edge cases, error handling, etc.
  });

  describe('validateUser', () => {
    it('should validate user credentials and return user', async () => {
      const userEmail = 'vinod@gmail.com';
      const userPassword = 'Test@123';
      const user = {
        id: 2,
        firstName: 'vinod',
        lastName: 'Mishra',
        email: 'vinod@gmail.com',
        password:
          '$2b$10$1Jufq9ocLxvg6qgWpNNrH.z8lsn1rVSfGAcq442UPvGqaw1JswnJG',
      };

      // Mock the UserService findByEmail method
      (userServiceMock.findByEmail as jest.Mock).mockResolvedValue(user);

      // Mock the bcrypt compare method
      (jest.spyOn(bcrypt, 'compare') as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser(userEmail, userPassword);

      expect(result).toEqual(user);
      expect(userServiceMock.findByEmail).toHaveBeenCalledWith(userEmail);
      expect(bcrypt.compare).toHaveBeenCalledWith(userPassword, user.password);
    });
  });

  describe('verifyUserById', () => {
    it('should verify user by ID and return user without password', async () => {
      const userId = 2;
      const user = {
        id: 2,
        firstName: 'vinod',
        lastName: 'Mishra',
        email: 'vinod@gmail.com',
      };

      // Mock the UserService findOne method
      (userServiceMock.findOne as jest.Mock).mockResolvedValue(user);

      const result = await service.verifyUserById(userId);

      expect(result).toEqual(user);
      expect(userServiceMock.findOne).toHaveBeenCalledWith(userId);
      expect(result.password).toBeUndefined();
    });

    it('should return undefined for non-existent user', async () => {
      const userId = 2;

      // Mock the UserService findOne method
      (userServiceMock.findOne as jest.Mock).mockResolvedValue(undefined);

      const result = await service.verifyUserById(userId);

      expect(result).toBeUndefined();
      expect(userServiceMock.findOne).toHaveBeenCalledWith(userId);
    });
  });
});
