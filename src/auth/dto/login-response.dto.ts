import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'LoginResponse' })
export class LoginResponse {
  @ApiProperty({
    description: 'acces token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKx',
    type: 'string',
  })
  access_token: string;
}
