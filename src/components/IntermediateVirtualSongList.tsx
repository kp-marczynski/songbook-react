import {Song} from "../model/Song.model";
import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import {FixedSizeList} from "react-window";
import IntermediateSongListItem from "./IntermediateSongListItem";

interface OwnProps {
    intermediateSongs: Map<string, Song>
}

const IntermediateVirtualSongList: React.FC<OwnProps> = ({intermediateSongs}) => {
    const listRef = React.createRef()

    const getSongAtIndex = (index: number) => Array.from(intermediateSongs.keys())[index]

    // @ts-ignore
    const Row = ({index, style}) => <IntermediateSongListItem style={style} label={getSongAtIndex(index)} counter={intermediateSongs.get(getSongAtIndex(index))}/>

    return <AutoSizer>
        {({height, width}) => (
            <FixedSizeList
                // @ts-ignore
                ref={listRef}
                itemCount={intermediateSongs.size}
                itemSize={68}
                height={height}
                width={width}>
                {Row}
            </FixedSizeList>
        )}
    </AutoSizer>
}

export default IntermediateVirtualSongList
