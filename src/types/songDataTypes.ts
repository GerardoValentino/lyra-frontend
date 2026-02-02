// Esto es una estimacion de lo que la API puede devolver,
// en dado caso que la estructura cambie, se debe cambiar el tipo, o bien
// implementar validaciones de tipos con la libreria valibot

export interface SongPayload {
    trackName?: string;
    artistName?: string;
    albumName?: string;
    duration?: string;
    plainLyrics?: string;
    instrumental?: boolean;
}