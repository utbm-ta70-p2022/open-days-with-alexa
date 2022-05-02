import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNotEmpty } from 'class-validator';

export class RetrieveExampleRequest {
  @ApiProperty()
  @IsAlpha()
  @IsNotEmpty()
  id: string;
}
