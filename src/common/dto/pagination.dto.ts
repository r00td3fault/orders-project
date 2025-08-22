import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    type: Number,
    example: 20,
    description: 'Row limit that you expected per page',
    required: false,
  })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  limit?: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Pagination page in order you limit',
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  page?: number;
}
