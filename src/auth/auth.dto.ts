export class AuthDTO {
  name: string;
  surname: string;
  father_name?: string;
  password?: string;
  email: string;
  messenger_one?: string;
  messenger_two?: string;
  gender?: 'MALE' | 'FEMALE' | 'BINARY';
}
