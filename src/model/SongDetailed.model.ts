import {SongOverview} from "./SongOverview.model";

export interface SongDetailed extends SongOverview {
    content: string;
}
