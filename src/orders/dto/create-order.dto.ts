import { IsArray, ValidateNested, IsNotEmpty, IsUUID, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';


class OrderItemDto {
 
  @IsUUID()
  @IsNotEmpty({ message: 'the product ID is required' })
  productId: string;

  
  @IsNumber()
  @Min(1, { message: 'the quantity must be at least 1' })
  quantity: number;
}

export class CreateOrderDto {
 
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}