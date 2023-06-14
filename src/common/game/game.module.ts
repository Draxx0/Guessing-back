import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameEntity } from "src/entity/game.entity";
import { VideoEntity } from "src/entity/video.entity";
import { VideoModule } from "../video/video.module";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity, VideoEntity]), VideoModule],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
