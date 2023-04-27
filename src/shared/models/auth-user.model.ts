export interface AuthUser {
  id: string;
  username: string;
  name: string;
  surname: string;
  lastLoggedIn: string;
}

export interface AuthUserCommand extends Omit<AuthUser, 'id'> {
  password: string;
}
