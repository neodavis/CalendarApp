import { IsInt, IsString, IsDate } from 'class-validator';

export class AbsenceDto {
  @IsInt()
  id: number;

  @IsString()
  start: string;

  @IsString()
  end: string;

  @IsString()
  type: string;

  @IsString()
  comment: string;
}
