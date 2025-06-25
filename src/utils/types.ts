export interface register {
  NameU: string;
  UserName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  PhoneNumber: string;
  Address: string;
  ProfileImage: File;
}

export interface login {
  username: string | undefined;
  password: string | undefined;
}

export interface userObject {
  id: number;
  roles: string;
}

export type Service = {
  id: number;
  price: number;
  serviceName: string;
  description: string;
};
