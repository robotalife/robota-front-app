export interface SigninData {
  email: string;
  password: string;
}

export interface SigninResponse {
  id: string;
  token: string;
}

export interface SignupData {
  email: string;
  password: string;
  agree: boolean;
}

export interface SignupResponse {
  id: string;
  email: string;
}
