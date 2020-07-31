import {createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'songs',
    initialState: {
        // value: Array.from(Array(1000), (_, i) => { return {
        //     id: Math.random()+"",
        //         title: "Yellow Brick Road",
        //         author: "Wizard of Oz",
        //         language: "EN"
        // }})
        value: [
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
            state.value.push(action.payload)
        }
    },
});

export const {addSong} = slice.actions
export const selectSongIndex = (state: any) => state.songs.value
export default slice.reducer
