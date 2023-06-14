import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { TimestampEntity } from "./gen/timestamp.entity";
import { VideoEntity } from "./video.entity";

@Entity("game")
export class GameEntity extends TimestampEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column({
    default: 0,
  })
  videoCount: number;

  @Column({ default: 0 })
  gamePlayed: number;

  @OneToMany(() => VideoEntity, (video) => video.game, {
    eager: true,
  })
  videos: VideoEntity[];
}
