import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

@ApiSchema({ name: 'UploadImageResponse' })
export class ResponseUploadDto {
  @ApiProperty({
    description: 'Image url',
    example: 'https://cloudstorage.mom/images/test.jpg',
    type: 'string',
  })
  @IsUrl()
  secure_url: string;
}
