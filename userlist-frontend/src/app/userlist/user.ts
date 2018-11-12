import { Resource } from 'angular4-hal';

export class User extends Resource {
  id?: number;
  name?: string;
  surname?: string;
}
