import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VideoVoteEntity } from "src/entity/video-vote.entity";
import { VideoVoteController } from "./video-vote.controller";
import { VideoVoteService } from "./video-vote.service";

@Module({
  imports: [TypeOrmModule.forFeature([VideoVoteEntity])],
  controllers: [VideoVoteController],
  providers: [VideoVoteService],
})
export class VideoVoteModule {}
