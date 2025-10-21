export type TRole = 'User' | 'Admin' | 'Employee';

export type IRolesMap = {
  [key in TRole]: TRole;
};