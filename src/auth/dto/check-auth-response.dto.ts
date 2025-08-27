import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'AuthCheckResponse' })
export class AuthCheckResponse {
  @ApiProperty({
    description: 'customer id',
    example: 'eyJhbGciOiJIU-zI1NiIsInR-5cCI6IkpX-VCJ9eyQ',
    type: 'string',
  })
  id: string;
  @ApiProperty({
    description: 'acces token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKx',
    type: 'string',
  })
  token: string;

  @ApiProperty({
    description: 'customer last name',
    example: 'hurtado',
    type: 'string',
  })
  lastName: string;

  @ApiProperty({
    description: 'customer first name',
    example: 'Rodrigo',
    type: 'string',
  })
  firstName: string;

  @ApiProperty({
    description: 'customer email',
    example: 'prueba@prueba.com',
    type: 'string',
  })
  email: string;
}
