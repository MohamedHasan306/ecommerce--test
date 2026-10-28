import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional, Min } from 'class-validator';

class CreateProductDto {
    @IsString()
    @IsNotEmpty({ message: 'The product name is required' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'The product description is required' })
    description: string;

    @IsNumber()
    @IsPositive({ message: 'The price must be a positive number' })
    price: number;

    @IsNumber()
    @Min(0, { message: 'The stock cannot be negative' })
    stock: number;

    @IsString()
    @IsNotEmpty({ message: 'The product category is required' })
    category: string;

    @IsString()
    @IsOptional()
    imageUrl?: string;
}

export { CreateProductDto };