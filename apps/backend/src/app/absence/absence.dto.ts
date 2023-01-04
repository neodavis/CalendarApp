import { IsInt, IsString } from 'class-validator';

export class AbsenceDto {
  @IsInt()
  id?: number;

  @IsInt()
  userId: number;

  @IsString()
  start: string;

  @IsString()
  end: string;

  @IsString()
  type: string;

  @IsString()
  comment: string;
}
