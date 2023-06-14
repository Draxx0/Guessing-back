import { Video } from "./video";

export interface Game {
  id: string;
  name: string;
  description: string;
  image: string;
  videoCount?: number;
  videos: Video[];
}
