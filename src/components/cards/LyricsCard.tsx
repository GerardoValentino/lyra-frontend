import { 
  Card, 
  CardHeader, 
  CardContent, 
  Typography, 
  Divider, 
  Box,
  Avatar, 
  Button,
  Backdrop
} from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useSongStore } from '../../store';
import { useState } from 'react';
import { CircularSpinner } from '../spinners';
import api from '../../axios/client';
import Swal from 'sweetalert2';
import { SongAnalysisDialog } from '../dialogs';

export const LyricsCard = () => {
  const { 
        trackName, 
        artistName, 
        albumName, 
        duration, 
        plainLyrics,
        analysis,
        clearSongData,
        setSongAnalysis
    } = useSongStore();

    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

  if (!plainLyrics) return null;

  const handleAnalyzeSong = async () => {
    try {
        setIsLoading(true);
        const response = await api.post("/api/v1/songs/analysis", {
            song_lyrics: plainLyrics
        });

        if(!response.data.success) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${response.data.message}`
            });

            setIsLoading(false);
            return;
        }

        setSongAnalysis(response.data.data.response)
        setIsModalOpen(true);
        
    } catch (error) {
        console.error("Algo salio mal analizando la canción: ", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Algo salio mal analizando la canción`
        });
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
        >
            <CircularSpinner />
        </Backdrop>
        <Card sx={{ maxWidth: 600, margin: '20px auto', borderRadius: 4, boxShadow: 3 }}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <MusicNoteIcon />
                </Avatar>
                }
                title={trackName || "Título desconocido"}
                subheader={`${artistName} • ${albumName}`}
                action={
                <Typography variant="caption" color="text.secondary" sx={{ pr: 2 }}>
                    {duration ? `${duration} seg` : ''}
                </Typography>
                }
            />
            
            <Divider />

            <CardContent 
                sx={{ 
                maxHeight: '400px',
                overflowY: 'auto', 
                backgroundColor: '#f9f9f9',
                whiteSpace: 'pre-line',
                padding: 3
                }}
            >
                <Typography variant="body1" color="text.primary" sx={{ fontStyle: 'italic', lineHeight: 1.8 }}>
                {plainLyrics}
                </Typography>
            </CardContent>

            <Divider />
            
            <Box sx={{ p: 1, textAlign: 'center' }}>
                <Button
                    onClick={() => {
                        clearSongData();
                    }}
                >
                    Regresar
                </Button>
                <Button 
                    variant='outlined'
                    onClick={handleAnalyzeSong}
                    disabled={isLoading}
                >
                    Analizar
                </Button>
            </Box>
        </Card>
        <SongAnalysisDialog 
            open={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            rawAnalysis={analysis} 
        />
    </>
  );
};