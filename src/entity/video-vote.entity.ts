import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { TimestampEntity } from "./gen/timestamp.entity";
import { VideoEntity } from "./video.entity";

@Entity("videoVote")
export class VideoVoteEntity extends TimestampEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  vote: string;

  @ManyToOne(() => VideoEntity, (video) => video.votes)
  video: VideoEntity;
}
