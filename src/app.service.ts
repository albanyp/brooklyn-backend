import { Injectable } from '@nestjs/common';
import { User } from './entity/user';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
