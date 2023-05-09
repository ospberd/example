import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, UserRole } from './entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
   
    const userRole = new Role();
    userRole.role = UserRole.USER;
    userRole.user = user;

   /* const changeHimselfRole = new Role();
    changeHimselfRole.role = UserRole.user;
    changeHimselfRole.user = changeh;
*/
    const changeHimselfRole = new Role();
    changeHimselfRole.role = UserRole.CHANGEHIMSELF;
    changeHimselfRole.user = user;

    user.roles = [userRole, changeHimselfRole];

    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: {
        roles: true, 
   
      },
    }); //`This action returns all users`;
  }

  async findOneByName(username: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { username: username },
      relations: {
        roles: true, 
 
      },
    });
  }

  async findOneById(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id: id },
      relations: {
        roles: true, 
 
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Update

    await this.usersRepository.update(id,{
     
      username: updateUserDto.username,
      email: updateUserDto.email,

    });

    // Return
    return this.usersRepository.findOne({
      where: { id: id },
      relations: {
        roles: true,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }



 async updateuserpassword(id: string, newpassword: string): Promise<User> {
  // Update

  await this.usersRepository.update(id,{
   
    password: newpassword,
    

  });

  // Return
  return this.usersRepository.findOne({
    where: { id: id },
    relations: {
      roles: true,
    },
  });
}

async saveRoles(id: string, listRoles: any): Promise<User> {
  const user = await this.usersRepository.findOne({
    where: { id: id },
    relations: {
      roles: true,
    },
  });

  if (!user) { throw new Error('User not found'); }

  user.roles = [];

  // Update user roles based on the provided listRoles
  const findUserRoleByValue = (value: string): UserRole | undefined => {
    return Object.entries(UserRole).find(([key, val]) => val === value)?.[0] as UserRole;
  };
  
  listRoles.forEach(element => {
    if (element.allowed=='true'){
      const newRole = new Role();
      newRole.role = UserRole[findUserRoleByValue(element.role)];
      user.roles.push(  newRole )
    }    
  });
  
  // Save the updated user with modified roles
return await this.usersRepository.save(user);
}

}

/*
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'user',
      password: 'user',
      roles:['user','bayer'],
    },
    {
      userId: 2,
      username: 'admin',
      password: 'admin',
      roles:['admin','manager'],
    },
  ];

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: {
        phones: true, 
   
      },
    }); //`This action returns all persons`;
  }


  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
*/