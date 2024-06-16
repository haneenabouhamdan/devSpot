import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, Permission, User, RolePermissions } from '../entities';

@Injectable()
export class RolesPermissionsService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,

    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(RolePermissions)
    private rolePermissionsRepository: Repository<RolePermissions>,
  ) {}

  // Methods to manage roles, permissions, and their assignments
  async createRole(name: string): Promise<Role> {
    const role = this.rolesRepository.create({ name });
    return this.rolesRepository.save(role);
  }

  async createPermission(name: string): Promise<Permission> {
    const permission = this.permissionsRepository.create({ name });
    return this.permissionsRepository.save(permission);
  }

  async assignPermissionToRole(
    roleId: UUID,
    permissionId: UUID,
  ): Promise<RolePermissions> {
    const role = await this.rolesRepository.findOne({
      where: { id: roleId },
    });
    const permission = await this.permissionsRepository.findOne({
      where: { id: permissionId },
    });
    if (role && permission) {
      const rolePermission = this.rolePermissionsRepository.create({
        role,
        permission,
      });
      return this.rolePermissionsRepository.save(rolePermission);
    }
  }
  // Remove a role
  async removeRole(roleId: UUID): Promise<void> {
    const role = await this.rolesRepository.findOne({ where: { id: roleId } });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    await this.rolesRepository.softRemove(role);
  }

  // Remove a permission
  async removePermission(permissionId: UUID): Promise<void> {
    const permission = await this.permissionsRepository.findOne({
      where: { id: permissionId },
    });

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    await this.permissionsRepository.softRemove(permission);
  }
}
