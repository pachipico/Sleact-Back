import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class createWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '슬리액트',
    description: '워크스페이스 이름',
  })
  public workspace: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'www.ska.com',
    description: 'url 주소',
  })
  public url: string;
}
