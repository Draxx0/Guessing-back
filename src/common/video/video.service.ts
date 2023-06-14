import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateVideoDto } from "src/common/video/dto/create-video.dto";
import { GameEntity } from "src/entity/game.entity";
import { VideoVoteEntity } from "src/entity/video-vote.entity";
import { VideoEntity } from "src/entity/video.entity";
import { Paginate } from "src/types/paginate";
import { Video } from "src/types/video";
import { Repository } from "typeorm";

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,
    @InjectRepository(VideoVoteEntity)
    private readonly videoVoteRepository: Repository<VideoVoteEntity>,
  ) {}
  async findAll(gameId?: string): Promise<Paginate<Video>> {
    if (gameId) {
      const [result, total] = await this.videoRepository.findAndCount({
        where: { game: { id: gameId } },
      });
      return {
        data: result,
        total,
      };
    }

    const [result, total] = await this.videoRepository.findAndCount();
    return {
      data: result,
      total,
    };
  }

  async getGameVideos(id: string): Promise<Paginate<Video>> {
    const [result, total] = await this.videoRepository
      .createQueryBuilder("video")
      .select()
      .where("video.game = :id", { id })
      .orderBy("RANDOM()")
      .limit(5)
      .getManyAndCount();

    if (total < 5) {
      throw new Error("Not enough videos");
    }

    return {
      data: result,
      total,
    };
  }

  async create(video: CreateVideoDto): Promise<Video> {
    const newVideo = this.videoRepository.create(video);
    await this.videoRepository.save(newVideo);

    const game = await this.gameRepository.findOneBy({ id: video.gameId });
    game.videos.push(newVideo);
    await this.gameRepository.save(game);
    return newVideo;
  }

  async reportVideo(id: string): Promise<void | { [key: string]: any }> {
    const video = await this.videoRepository.findOneBy({ id });
    video.report += 1;
    await this.videoRepository.save(video);

    if (video.report >= 5) {
      await this.videoRepository.delete(id);
      return {
        message: `Video ${id} has been deleted`,
        video,
      };
    }
  }

  async delete(id: string): Promise<void> {
    const videosVotes = await this.videoVoteRepository
      .createQueryBuilder("video_vote")
      .where("video_vote.video = :id", { id })
      .getMany();

    console.log(videosVotes);
    await this.videoVoteRepository.remove(videosVotes);
    await this.videoRepository.delete(id);
  }
}
