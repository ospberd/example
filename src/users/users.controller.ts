import { BadRequestException, Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { NewPassword } from 'src/auth/dto/newpassword.dto';
import { Role } from '../auth/role.decorator';//./role.decorator';



import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UserRole } from './entities/role.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UpdateRolesDto {
  
    @ApiModelProperty({
      type: 'array',
      items: {
        type: 'object',
        properties: {
          role: { type: 'string' },
          allowed: { type: 'boolean' },
        },
      },
    })
    roles: [];
  
  
  }
  

@ApiTags('users')

@Controller('users')
export class UsersController {
    constructor( private readonly usersService : UsersService) {}

       // @ApiBearerAuth('JWT-auth')
       @Get()  
       async GetAllUsers() {
   
   /*        const user = await this.usersService.findOneById(id)
           const { roles, ...rest } = user;
   
           const result = Object.entries(UserRole).map(([key, value]) => {
               const allowed = roles.some((role) => role.role === value) ? "true" : "false";
               return { role: value, allowed };
             });
   
           return { roles: result};
    */
           return this.usersService.findAll();
       }


   // @ApiBearerAuth('JWT-auth')
    @Get('roles/:id')  
    async GetRoleList(@Param('id') id: string ) {

        const user = await this.usersService.findOneById(id)
        const { roles, ...rest } = user;

        const result = Object.entries(UserRole).map(([key, value]) => {
            const allowed = roles.some((role) => role.role === value) ? "true" : "false";
            return { role: value, allowed };
          });

        return { roles: result};
    }



       // @ApiBearerAuth('JWT-auth')
    @Post('roles/:id')  
    async SetRoleList(@Param('id') id: string, @Body() listRoles: UpdateRolesDto )  {
   
           const user = await this.usersService.saveRoles(id, listRoles.roles);
            return user;
       }

    @ApiBearerAuth('JWT-auth')
    @Role('admin')
    @UseGuards(AuthGuard, RoleGuard) 
    @Post('register')
  async registerUser(
    @Body() createUserDto: CreateUserDto ) {

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
      const { roles, ...rest } = user;
      let userReturn = { ...rest, roles: roles.map(r => r.role) };
      return ( userReturn );
    } catch (error) {
      throw new BadRequestException('Failed to register user.');
    }
  }

  @ApiBearerAuth('JWT-auth')
  @Role('admin')
  @UseGuards(AuthGuard, RoleGuard) 
  @Patch('updateuserinfo/:id')
  updateUserInfo(@Param('id') id: string , @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }


  @ApiBearerAuth('JWT-auth')
  @Role('admin')
  @UseGuards(AuthGuard, RoleGuard) 
  @Patch('updateuserpassword/:id')
  async updateUserPassword(@Param('id') id: string , @Body() newpassword: NewPassword) {

    const { password, confirmpassword, ...rest } = newpassword;
    if (password!==confirmpassword) {
      throw new BadRequestException('Confirm password does not match.');
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newpassword.password, saltRounds);

    return await this.usersService.updateuserpassword(id, hashedPassword);
  }
  }
