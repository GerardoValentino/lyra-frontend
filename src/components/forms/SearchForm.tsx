import { useForm } from 'react-hook-form';
import { TextField, Button, Stack, Box, Typography, Backdrop } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { SongFormData } from '../../types';
import Swal from "sweetalert2";
import api from '../../axios/client';
import { useState } from 'react';
import { SquareSpinner } from '../spinners';
import { useSongStore } from '../../store';
import type { ApiResponse } from '../../types/responseTypes';
import type { SongPayload } from '../../types/songDataTypes';

export default function SearchForm() {
  const { plainLyrics, setSongData, clearSongData } = useSongStore();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<SongFormData>();

  const onSubmit = async (data: SongFormData) => {
    try {
        setIsLoading(true);
        if(plainLyrics.length > 0) clearSongData();

        const response = await api.get<ApiResponse<SongPayload>>("/api/v1/songs/lyrics", {
            params: {
                artist: data.artistName,
                song_name: data.songName
            }
        });

        const responseData = response.data;

        if(!responseData.success) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${responseData.message}`
            });

            setIsLoading(false);

            return;
        }

        if(!responseData.data.instrumental) {
          setSongData({
            trackName: responseData.data.trackName ?? "",
            artistName: responseData.data.artistName ?? "",
            albumName: responseData.data.albumName ?? "",
            duration: responseData.data.duration ?? "",
            plainLyrics: responseData.data.plainLyrics ?? "",
          })
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salio mal al obtener la letra"
        });
        console.error("Ocurrio un problema buscando la letra de la canción: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit(onSubmit)} 
      noValidate 
      sx={{ maxWidth: 400, margin: '20px auto' }}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <SquareSpinner />
      </Backdrop>
      <Typography variant="h6" marginBottom={2} gutterBottom>
        Busca la canción por su nombre y artista
      </Typography>

      <Stack spacing={2} direction="column">
        <TextField
          label="Nombre de la canción"
          variant="outlined"
          fullWidth
          {...register("songName", { required: "Este campo es obligatorio" })}
          error={!!errors.songName}
          helperText={errors.songName?.message}
          sx={{
                '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                }
            }}
        />

        <TextField
          label="Nombre del artista"
          variant="outlined"
          fullWidth
          {...register("artistName", { required: "Este campo es obligatorio" })}
          sx={{
                '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                }
            }}
        />

        <Button 
          type="submit" 
          variant="contained" 
          size="large"
          startIcon={<SearchIcon />}
          sx={{ borderRadius: 3 }}
          disabled={isLoading}
        >
          Buscar
        </Button>

      </Stack>
    </Box>
  );
}