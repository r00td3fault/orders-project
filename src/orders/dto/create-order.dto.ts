import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';
import {
  ApiExtraModels,
  ApiProperty,
  ApiSchema,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiExtraModels(CreateOrderItemDto)
@ApiSchema({ name: 'CreateOrderRequest' })
export class CreateOrderDto {
  @ApiProperty({ example: 'Pedro perez', description: 'The costumer name' })
  @IsNotEmpty()
  @IsString()
  clientName: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    type: 'array',
    items: {
      oneOf: [{ $ref: getSchemaPath(CreateOrderItemDto) }],
    },
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
