import {Song} from "../model/Song.model";
import {ChordProGroup} from "../model/chord-pro-group.model";
import * as shortId from 'shortid';

export function parseSongsFromChordProFile(chordProFileContent: string, callback: (progress: number) => void): Song[] {
    const chordProSongs = chordProFileContent.split('{new_song}');
    return parseSongsFromChordProFileRecursive(chordProSongs, 0, callback);
}

function parseSongsFromChordProFileRecursive(chordProSongs: string[], index: number, callback: (progress: number) => void): Song[] {
    callback(index / chordProSongs.length);
    if (index < chordProSongs.length) {
        console.log((index + 1) + ' of ' + chordProSongs.length);
        const song = chordProSongs[index];
        const title = song.match('{(title|t):.+}');
        const author = song.match('{(artist|a):.+}');
        const language = song.match('{(language|l):.+}');
        const result = parseSongsFromChordProFileRecursive(chordProSongs, index + 1, callback);
        if (title && author && language) {
            result.push({
                id: shortId.generate(),
                title: title[0].substring(title[0].indexOf(':') + 2, title[0].indexOf('}')),
                author: author[0].substring(author[0].indexOf(':') + 2, author[0].indexOf('}')),
                language: language[0].substring(language[0].indexOf(':') + 2, language[0].indexOf('}')),
                content: song
            });
        }
        return result;
    } else {
        return [] as Song[];
    }
}

export function parseChordPro(chordProText: string): ChordProGroup[] {
    const result: ChordProGroup[] = [];
    let currentChords = '';
    let currentChordsArray = [];
    let tempText: string[] = [];
    const lines = chordProText.split('\n');
    for (const line of lines) {
        const splitLeft = line.split('[');
        let chords = '';
        let text = '';
        if (splitLeft.length > 1) {
            currentChordsArray.push(currentChords);
            currentChords = '';
            if (tempText.filter(elem => elem && elem.length > 0).length > 0) {
                result.push(new ChordProGroup(currentChordsArray, tempText));
                currentChordsArray = [];
                tempText = [];
            }
            for (const left of splitLeft) {
                if (left.includes(']')) {
                    const splitRight = left.split(']');
                    for (let i = 0; i < splitRight.length; ++i) {
                        if (i % 2 === 0) {
                            chords += splitRight[i];
                        } else {
                            text += splitRight[i];
                            chords += ' ' + '_'.repeat(splitRight[i].length) + ' ';
                        }
                    }
                } else {
                    text += left;
                    chords += ' ' + '_'.repeat(left.length) + ' ';
                }
            }
            if (text.trim() !== '') {
                tempText.push(text);
            }
            currentChords = chords;
        } else if (splitLeft[0].includes(']')) {
            currentChordsArray.push(currentChords);
            currentChords = '';
            if (tempText.filter(elem => elem && elem.length > 0).length > 0) {
                result.push(new ChordProGroup(currentChordsArray, tempText));
                tempText = [];
                currentChordsArray = [];
                currentChords = splitLeft[0];
            }
        } else if (!(
            tempText.length >= 2
            && splitLeft[0].trim() === ''
            && tempText[tempText.length - 1].trim() === ''
            && tempText[tempText.length - 2].trim() === '')
        ) {
            tempText.push(splitLeft[0]);
        }
    }
    if (currentChords !== '') {
        currentChordsArray.push(currentChords);
    }
    if (tempText.length > 0 || currentChords.length > 0) {
        result.push(new ChordProGroup(currentChordsArray, tempText));
    }
    return result;
}
