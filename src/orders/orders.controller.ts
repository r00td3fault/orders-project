import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ResponseOrderDto } from './dto/response-order.dto';
import { orderMapper } from './orders.mapper';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from '../auth/types/auth.types';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({
    summary: 'Get all active orders in state different to delivered',
  })
  @ApiOkResponse({
    description: 'List od active orders with state different to delivered.',
  })
  @Get()
  async getOrders(
    @Query() paginationDto: PaginationDto,
  ): Promise<ResponseOrderDto[]> {
    const orders = await this.ordersService.findAll(paginationDto);
    return orders.map((order) => orderMapper(order));
  }

  @ApiOperation({
    summary: 'Get active order by id',
  })
  @ApiOkResponse({
    description: 'List od active orders with state different to delivered.',
    type: ResponseOrderDto,
  })
  @Get(':id')
  async getOrderById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseOrderDto> {
    const order = await this.ordersService.findOneById(id);
    return orderMapper(order);
  }

  @ApiOperation({
    summary: 'Create a Order',
  })
  @ApiCreatedResponse({
    description: 'The Order has been successfully created.',
    type: ResponseOrderDto,
  })
  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<ResponseOrderDto> {
    const order = await this.ordersService.create(createOrderDto);
    return orderMapper(order!);
  }

  @ApiOperation({
    summary: 'Advance with order state  initiated -> sent -> delivered',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer toke authorization',
    example: 'Bearer <token_value>',
  })
  @Auth(ValidRoles.user)
  @Post(':id/advance')
  @HttpCode(202)
  async updateOrderState(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.advanceOrder(id);
  }
}
