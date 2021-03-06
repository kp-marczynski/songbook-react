import React from "react";
import {FixedSizeList} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import SongListItem from "./SongListItem";
import {Song} from "../model/Song.model";

interface OwnProps {
    songs: Song[]
}

const VirtualSongList: React.FC<OwnProps> = ({songs}) => {
    const listRef = React.createRef()

    // @ts-ignore
    const Row = ({index, style}) => <SongListItem song={songs[index]} style={style}/>

    return <AutoSizer>
        {({height, width}) => (
            <FixedSizeList
                // @ts-ignore
                ref={listRef}
                itemCount={songs.length}
                itemSize={68}
                height={height}
                width={width}>
                {Row}
            </FixedSizeList>
        )}
    </AutoSizer>
}

export default VirtualSongList
