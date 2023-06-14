import { Body, Controller, Get, Post, Delete, Param } from "@nestjs/common";
import { GameEntity } from "src/entity/game.entity";
import { Game } from "src/types/game";
import { Paginate } from "src/types/paginate";
import { VideoService } from "../video/video.service";
import { createGameDto } from "./dto/create-game.dto";
import { GameService } from "./game.service";

@Controller("games")
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly videoService: VideoService,
  ) {}

  @Get()
  async findAll(): Promise<Paginate<Game>> {
    const games = await this.gameService.findAll();

    for (const game of games.data) {
      const videos = await this.videoService.findAll(game.id);
      game.videoCount = videos.total;
      console.log("GAME :", game);
    }
    return games;
  }

  @Get(":id")
  async findOneById(@Param("id") id: string): Promise<Game> {
    return await this.gameService.findOneById(id);
  }

  @Post()
  async create(@Body() createGame: createGameDto): Promise<GameEntity> {
    return await this.gameService.create(createGame);
  }

  @Post("gamePlayed/:id")
  async incrementGamePlayed(@Param("id") id: string): Promise<void> {
    return await this.gameService.incrementGamePlayen(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return await this.gameService.delete(id);
  }
}
