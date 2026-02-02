import { create } from "zustand" 
import { devtools } from "zustand/middleware"
import type { SongPayload } from "./types/songDataTypes";

type SongStore = {
    trackName: string,
    artistName: string,
    albumName: string,
    duration: string,
    plainLyrics: string,
    analysis: string
    //loading: boolean
    setSongData: (data: SongPayload) => void;
    setSongAnalysis: (text: string) => void;
    clearSongData: () => void;
    clearSongAnalysis: () => void;
}

export const useSongStore = create<SongStore>()(devtools((set) => ({
    trackName: "",
    artistName: "",
    albumName: "",
    duration: "",
    plainLyrics: "",
    analysis: "",
    //loading: boolean
    setSongData: (data: SongPayload) => {
        set(() => ({ 
            trackName: data.trackName ?? "",
            artistName: data.artistName ?? "",
            albumName: data.albumName ?? "",
            duration: data.duration ?? "",
            plainLyrics: data.plainLyrics ?? "",
        }));
    },

    setSongAnalysis: (text: string) => {
        set(() => ({ analysis: text }));
    },

    clearSongAnalysis: () => {
        set(() => ({ analysis: "" }));
    },

    clearSongData: () => {
        set(() => ({ 
            trackName: "",
            artistName: "",
            albumName: "",
            duration: "",
            plainLyrics: ""
        }));
    }
})))