import {createSlice} from '@reduxjs/toolkit'
import {Song} from "../model/Song.model";

const slice = createSlice({
    name: 'songs',
    initialState: {
        // value: Array.from(Array(1000), (_, i) => { return {
        //     id: Math.random()+"",
        //         title: "Yellow Brick Road",
        //         author: "Wizard of Oz",
        //         language: "EN"
        // }})
        index: [
            {
                id: "1",
                title: "Yellow Brick Road",
                author: "Wizard of Oz",
                language: "EN"
            },
            {
                id: "2",
                title: "Dream On",
                author: "Aerosmith",
                language: "EN"
            },
            {
                id: "3",
                title: "Kiss to build a dream on",
                author: "Louis Armstrong",
                language: "EN"
            },
            {
                id: "4",
                title: "Amazing",
                author: "Aerosmith",
                language: "EN"
            }
        ]
    },
    reducers: {
        addSong: (state, action) => {
            state.index = state.index.filter(song => song.id !== action.payload.id)
            state.index.push(action.payload)
        }
    },
});

export const {addSong} = slice.actions
export const selectSongBy = (state: any) => (predicate: (song: Song) => boolean) => state.songs.index.filter(predicate)
export const attributePredicate = (attributeName: string, attributeValue: any) => (song: Song) => (song as any)[attributeName] === attributeValue
export const combinePredicates = (...predicates: ((song: Song) => boolean)[]) => (song: Song) => predicates.every(predicate => predicate(song))

export default slice.reducer
