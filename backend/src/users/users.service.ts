import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { SafeUser, User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async onModuleInit() {
    await this.seedUsers();
  }

  private async seedUsers() {
    const existing = await this.userRepository.findOne({
      where: { email: 'admin@mail.ru' },
    });
    if (existing) return;

    const passwordHash = await bcrypt.hash('admin123', 5);
    const admin = await this.userRepository.create({
      email: 'admin@mail.ru',
      password: passwordHash,
    });

    const adminRole = await this.roleService.getRoleByValue('Admin');
    if (adminRole) {
      await admin.$set('roles', [adminRole.id]);
      console.log(`User ${admin.email} seeded with role ADMIN`);
    } else {
      console.log('Role ADMIN not found — seed roles first.');
    }
  }

  async createUser(dto: CreateUserDto): Promise<SafeUser> {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('User');
    if (role) {
      await user.$set('roles', [role.id]);
      user.roles = [role];
    }
    const { password, ...payload } = user.get({ plain: true });
    return payload satisfies SafeUser;
  }

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });

    return user?.get({ plain: true });
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });

    return user?.get({ plain: true });
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
