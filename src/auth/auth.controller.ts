import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Request, UseGuards} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from './role.guard';
import { Role } from './role.decorator';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { NewPassword } from './dto/newpassword.dto';

@ApiTags('auth')
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService, private readonly usersService : UsersService) {}
    
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: LoginDto) {
      return this.authService.signIn(signInDto.username, signInDto.password);
    }
  
    @ApiBearerAuth('JWT-auth')
    @Role('user')
    @UseGuards(AuthGuard, RoleGuard) 
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }  

    @Post('register')
  async registerUser(
    @Body() createUserDto: CreateUserDto,
  ):  Promise<{ access_token: string;}> {
    const { username, password, confirmpassword, ...rest } = createUserDto;
    if (password!==confirmpassword) {
      throw new BadRequestException('Confirm password does not match.');
    }

    const existingUser = await this.usersService.findOneByName(username);

    if (existingUser) {
      throw new BadRequestException('User already exists.');
    }

    try {
      // Hash user password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await this.usersService.create({
        ...createUserDto,

        password: hashedPassword,
      });
      const { username } = user;
      const token = this.authService.signIn(username, password);
      return (await token);
    } catch (error) {
      throw new BadRequestException('Failed to register user.');
    }
  }

  @ApiBearerAuth('JWT-auth')
  @Role('changehimself')
  @UseGuards(AuthGuard, RoleGuard) 
  @Patch('updatemyinfo')
  updateUserInfo(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }


  @ApiBearerAuth('JWT-auth')
  @Role('changehimself')
  @UseGuards(AuthGuard, RoleGuard) 
  @Patch('updatemypassword')
  async updateUserPassword(@Request() req, @Body() newpassword: NewPassword) {

    const { password, confirmpassword, ...rest } = newpassword;
    if (password!==confirmpassword) {
      throw new BadRequestException('Confirm password does not match.');
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newpassword.password, saltRounds);

    return await this.usersService.updateuserpassword(req.user.id, hashedPassword);
  }
  }