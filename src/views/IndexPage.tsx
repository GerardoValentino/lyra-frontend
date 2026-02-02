// import { Button } from "@mui/material";
import { Box } from "@mui/material";
import SearchForm from "../components/forms/SearchForm";
import { MainLogo } from "../components/headers";
import { useSongStore } from "../store";
import { LyricsCard } from "../components/cards";


export default function IndexPage() {
  const { plainLyrics } = useSongStore();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <MainLogo />
      {plainLyrics.length > 0 ? (
        <LyricsCard />
      ) : ( <SearchForm /> )}
      
    </Box>
  );
}