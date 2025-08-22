import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';

@ApiSchema({ name: 'CreateOrderItemDto' })
export class CreateOrderItemDto {
  @ApiProperty({
    example: 'Ceviche',
    description: 'The product description in order',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 1,
    description: 'The product quantiy',
    type: Number,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({
    example: 25,
    description: 'The product unit price',
    type: Number,
    minimum: 1,
  })
  @IsNumber()
  @Min(10)
  unitPrice: number;
}
