import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({ example: 'Pedro', description: 'Registered user first name' })
  firstName: string;

  @ApiProperty({
    example: 'gomez perez',
    description: 'Registered user last name',
  })
  lastName: string;

  @ApiProperty({
    example: 'user@mail.com',
    description: 'Registered User email',
  })
  email: string;
}
