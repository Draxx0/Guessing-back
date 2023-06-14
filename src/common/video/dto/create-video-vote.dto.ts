import { IsNotEmpty, IsString } from "class-validator";

export class VoteDto {
  @IsString()
  @IsNotEmpty()
  vote: string;
}
