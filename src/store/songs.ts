import {createSlice} from '@reduxjs/toolkit'
import {Song} from "../model/Song.model";

const songComparator = (first: Song, second: Song) => first.author === second.author ? first.title.localeCompare(second.title) : first.author.localeCompare(second.author)

export const attributePredicate = (attributeName: string, attributeValue: any) => (song: Song) => (song as any)[attributeName] === attributeValue
export const combinePredicates = (...predicates: ((song: Song) => boolean)[]) => (song: Song) => predicates.every(predicate => predicate(song))

const slice = createSlice({
    name: 'songs',
    initialState: {
        // value: Array.from(Array(1000), (_, i) => { return {
        //     id: Math.random()+"",
        //         title: "Yellow Brick Road",
        //         author: "Wizard of Oz",
        //         language: "EN"
        // }})
        index: ([
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
            },
            {
                id: "5",
                title: "Bad moon rising",
                author: "CCR",
                language: "EN",
                content: "{t: Bad Moon Rising [C] }  \n" +
                    "{key: C}  \n" +
                    "{artist:Creedence Clearwater Revival}  \n" +
                    "{c: } \n" +
                    "[C] I see the [G] bad [F] moon [C] rising,   \n" +
                    "[C] I see [G] trouble [F] on the [C] way   \n" +
                    "[C] I see [G] earth[F]quakes and [C] lightning,   \n" +
                    "[C] I see [G] bad [F] times [C] today [C7]   \n" +
                    "{c: } \n" +
                    "[F] Don't go around tonight,   \n" +
                    "Well it's [C] bound to take your life   \n" +
                    "[G] There's a [F] bad moon on the [C] rise   \n" +
                    "{c: } \n" +
                    "[C] I hear [G] hurri-[F]canes [C] blowing,   \n" +
                    "[C] I know the [G] end is [F] coming [C] soon   \n" +
                    "[C] I fear [G] rivers [F] over-[C]flowing,   \n" +
                    "[C] I hear the [G] voice of [F] rage and [C] ruin [C7]   \n" +
                    "{c: } \n" +
                    "[F] Don't go around tonight,   \n" +
                    "Well it's [C] bound to take your life   \n" +
                    "[G] There's a [F] bad moon on the [C] rise   \n" +
                    "{c: } \n" +
                    "[C] Hope you [G] got your [F] things [C] together,   \n" +
                    "[C] hope you are [G] quite [F] prepared to [C] die   \n" +
                    "[C] Looks like we're [G] in for [F] nasty [C] weather,   \n" +
                    "[C] One eye is [G] taken [F] for an [C] eye [C7]   \n" +
                    "{c: } \n" +
                    "[F] Don't go around tonight, well it's [C] bound to take your life   \n" +
                    "[G] There's a [F] bad moon on the [C] rise [C7]   \n" +
                    "{c: } \n" +
                    "[F] Don't go around tonight,   \n" +
                    "Well it's [C] bound to take your life   \n" +
                    "[G] There's a [F] bad moon on the [C] rise   \n" +
                    "[G] There's a [F] bad moon on the [C] rise   \n" +
                    "[G] There's a [F] bad moon on the [C] rise   \n" +
                    "[C] [G] [C]   \n" +
                    "{c: }"
            }
        ] as Song[]).sort(songComparator)
    },
    reducers: {
        addSong: (state, action) => {
            state.index = state.index.filter(song => song.id !== action.payload.id)
            state.index.push(action.payload)
            state.index = state.index.sort(songComparator)
        },
        removeSong: (state, action) => {
            state.index = state.index.filter(song => song.id !== action.payload)
        }
    },
});

export const {addSong, removeSong} = slice.actions
export const selectSongsBy = (state: any) => (predicate?: (song: Song) => boolean) => predicate ? state.songs.index.filter(predicate) : state.songs.index

export default slice.reducer
