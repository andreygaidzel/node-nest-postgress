import * as dayjs from 'dayjs';
import type { IUser } from '@/models/IUser.ts';
import { JWT_KEY, USER_DATA_KEY } from '@/services/AuthService/AuthService.const.ts';
import isEqual from 'lodash/isEqual';
import merge from 'lodash/merge';

export class AuthService {

  user?: IUser;
  isAuth = false;
  isLoading = false;
  lastUserTimestamp: dayjs.Dayjs | undefined;

  constructor() {
    const userData = localStorage.getItem(USER_DATA_KEY);
    if (userData) {
      this.user = JSON.parse(userData);
      this.isAuth = true;
    }
  }

  logout(): void {
    this.isAuth = false;
    this.user = undefined;

    localStorage.removeItem(JWT_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  }

  saveUserDataInLocalStorage(user: IUser): void {
    const userData = localStorage.getItem(USER_DATA_KEY) ?? '{}';

    if (!isEqual(user, JSON.parse(userData))) {
      const currentProfile = merge({}, JSON.parse(userData), user);

      localStorage.setItem(USER_DATA_KEY, JSON.stringify(currentProfile));
    }
  }
}

const authService = new AuthService();

export default authService;