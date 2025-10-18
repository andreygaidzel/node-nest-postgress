import type { IRolesMap } from '@/services/AuthService/AuthService.model.ts';

export const JWT_KEY = 'jwt';
export const JWT_KEY_REFRESH = 'jwt_refresh';
export const USER_DATA_KEY = 'userData';

export const ROLES: IRolesMap = {
  User: 'User',
  Admin: 'Admin',
  Employee: 'Employee',
};