import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create-order-item.dto';
import {
  ApiExtraModels,
  ApiProperty,
  ApiSchema,
  getSchemaPath,
} from '@nestjs/swagger';
import { orderState } from '../types/order.types';

@ApiExtraModels(CreateOrderItemDto)
@ApiSchema({ name: 'OrderResponse' })
export class ResponseOrderDto {
  @IsString()
  @ApiProperty({
    description: 'Order identifier',
    example: 'f4408b53-da1d-4e43-af47-14f42ad10b3d',
    type: 'string',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'Costumer name',
    example: 'Carlos perez',
    type: 'string',
  })
  clientName: string;

  @ApiProperty({
    description: 'Order state',
    default: orderState.initiated,
    enum: orderState,
    type: 'string',
  })
  @IsString()
  state: string;

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
