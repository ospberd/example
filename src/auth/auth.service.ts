import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findOneByName(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    
    if (!((user?.password == pass)||(await bcrypt.compare( pass, user?.password)))) {  // 
      throw new UnauthorizedException();
    }
      // Transform  'roles' array of objects to array of string
      const { roles, ...rest } = user;
      let userForJWT = { ...rest, roles: roles.map(r => r.role) };
    
    const payload = { username: user.username, id: user.id, email: user.email, roles: userForJWT.roles  };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}