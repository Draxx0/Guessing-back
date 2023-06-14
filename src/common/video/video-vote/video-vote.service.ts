import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VoteDto } from "../dto/create-video-vote.dto";
import { VideoVoteEntity } from "src/entity/video-vote.entity";

@Injectable()
export class VideoVoteService {
  constructor(
    @InjectRepository(VideoVoteEntity)
    private readonly videoVoteRepository: Repository<VideoVoteEntity>,
  ) {}
  async userSubmit(videoId: string, vote: VoteDto): Promise<string> {
    const newVote = this.videoVoteRepository.create({
      video: { id: videoId },
      vote: vote.vote,
    });
    await this.videoVoteRepository.save(newVote);

    return `Video : ${videoId} has been voted ${vote.vote}`;
  }
}
