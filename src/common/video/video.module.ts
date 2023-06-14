import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameEntity } from "src/entity/game.entity";
import { VideoVoteEntity } from "src/entity/video-vote.entity";
import { VideoEntity } from "src/entity/video.entity";
import { VideoController } from "./video.controller";
import { VideoService } from "./video.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([VideoEntity, GameEntity, VideoVoteEntity]),
  ],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [VideoService],
})
export class VideoModule {}
