import { Body, Controller, Param, Post } from "@nestjs/common";
import { VideoVoteService } from "./video-vote.service";
import { VoteDto } from "../dto/create-video-vote.dto";

@Controller("videos/:videoId")
export class VideoVoteController {
  constructor(private readonly videoVoteService: VideoVoteService) {}
  @Post("/vote")
  userSubmit(
    @Param("videoId") videoId: string,
    @Body() vote: VoteDto,
  ): Promise<string> {
    return this.videoVoteService.userSubmit(videoId, vote);
  }
}
