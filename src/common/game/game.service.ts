import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GameEntity } from "src/entity/game.entity";
import { VideoEntity } from "src/entity/video.entity";
import { Game } from "src/types/game";
import { Paginate } from "src/types/paginate";
import { Repository } from "typeorm";
import { createGameDto } from "./dto/create-game.dto";

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly GameRepository: Repository<GameEntity>,
    @InjectRepository(VideoEntity)
    private readonly VideoRepository: Repository<VideoEntity>,
  ) {}

  async findAll(): Promise<Paginate<Game>> {
    const [result, total] = await this.GameRepository.findAndCount();
    return {
      data: result,
      total,
    };
  }

  async findOneById(id: string): Promise<Game> {
    return await this.GameRepository.findOneBy({ id });
  }

  async create(createGame: createGameDto): Promise<GameEntity> {
    return await this.GameRepository.save(createGame);
  }

  async incrementGamePlayen(id: string): Promise<void> {
    const game = await this.GameRepository.findOneBy({ id });
    if (!game) throw new Error("Game not found");
    game.gamePlayed++;
    await this.GameRepository.save(game);
  }

  async delete(id: string): Promise<void> {
    const videos = await this.VideoRepository.createQueryBuilder("video")
      .where("video.game = :id", { id })
      .getMany();

    if (!videos) throw new Error("No videos found");
    await this.VideoRepository.remove(videos);
    await this.GameRepository.delete(id);
  }
}
