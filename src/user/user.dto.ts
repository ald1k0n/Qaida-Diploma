export class UploadDTO {
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export class UserDTO {
  id?: number;
  name?: string;
  surname?: string;
  father_name?: string;
  password?: string;
  email?: string;
  messenger_one?: string;
  messenger_two?: string;
}
