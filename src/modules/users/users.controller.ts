import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  test() {
    return {
      status: 200,
      message: 'ok',
    };
  }
}
