import type { IRole } from './IRole.ts';
import type { IPost } from './IPost.ts';

export interface IUser {
  id: number;
  name: string;
  email: string;
  banned?: boolean;
  banReason?: string;
  roles?: IRole[];
  posts?: IPost[];
}
