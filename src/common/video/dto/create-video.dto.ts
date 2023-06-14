import { IsString, IsIn, IsUrl, IsNotEmpty, Contains } from "class-validator";

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @Contains("https://youtu.be/", {
    message: "url must be a youtube video",
  })
  url: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([
    "Iron",
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Ascendant",
    "Immortal",
    "Radiant",
  ])
  rank: string;

  @IsString()
  @IsNotEmpty()
  gameId: string;
}
