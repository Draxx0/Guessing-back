import { IsString, IsUrl } from "class-validator";

export class createGameDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsUrl()
  image: string;
}
