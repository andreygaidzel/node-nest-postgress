import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService implements OnModuleInit {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async onModuleInit() {
    // вызывается один раз при старте приложения
    await this.seedRoles();
  }

  private async seedRoles() {
    const roles = [
      { value: 'Admin', description: 'Application administrator' },
      { value: 'User', description: 'Default user' },
    ];

    for (const role of roles) {
      const existing = await this.roleRepository.findOne({
        where: { value: role.value },
      });
      if (!existing) {
        await this.roleRepository.create(role);
        console.log(`Role ${role.value} created`);
      }
    }
  }

  async createRole(dto: CreateRoleDto) {
    return await this.roleRepository.create(dto);
  }

  async getRoleByValue(value: string) {
    return await this.roleRepository.findOne({ where: { value } });
  }

  async getAllRoles(): Promise<Role[]> {
    return await this.roleRepository.findAll({ include: { all: true } });
  }
}
