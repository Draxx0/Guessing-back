import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { VideoService } from "./video.service";
import { Paginate } from "src/types/paginate";
import { CreateVideoDto } from "src/common/video/dto/create-video.dto";
import { Video } from "src/types/video";

@Controller("videos")
export class VideoController {
  constructor(private readonly videoService: VideoService) {}
  @Get()
  findAll(@Query("game") gameId?: string): Promise<Paginate<Video>> {
    return this.videoService.findAll(gameId);
  }

  @Get("game/:id")
  getGameVideos(@Param("id") id: string): Promise<Paginate<Video>> {
    return this.videoService.getGameVideos(id);
  }

  @Post()
  create(@Body() createVideo: CreateVideoDto) {
    return this.videoService.create(createVideo);
  }

  @Post(":id/report")
  reportVideo(@Param("id") id: string) {
    return this.videoService.reportVideo(id);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.videoService.delete(id);
  }
}
