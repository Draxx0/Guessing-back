import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { TimestampEntity } from "./gen/timestamp.entity";
import { VideoVoteEntity } from "./video-vote.entity";
import { Vote } from "src/types/vote";
import { GameEntity } from "./game.entity";

@Entity("video")
export class VideoEntity extends TimestampEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column({
    unique: true,
  })
  url: string;

  @Column()
  rank: string;

  @Column({
    default: 0,
  })
  report: number;

  @OneToMany(() => VideoVoteEntity, (videoVote) => videoVote.video, {
    eager: true,
  })
  votes: Vote;

  @ManyToOne(() => GameEntity, (game) => game.videos)
  game: GameEntity;
}
