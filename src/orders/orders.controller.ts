import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post(':userId')
 
  create(@Param('userId') userId: string, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(userId, createOrderDto);
  }

  @Get()
  
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
}