import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  Chip,
  Stack
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useSongStore } from '../../store';
//import PsychologyIcon from '@mui/icons-material/Psychology';

interface AnalysisData {
  categoria: string;
  resumen: string;
  interpretacion: string;
  perspectiva: string;
  entidades: string[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  rawAnalysis: string;
}

export const SongAnalysisDialog = ({ open, onClose, rawAnalysis }: Props) => {
    const { clearSongAnalysis } = useSongStore()


  const parseAnalysis = (text: string): AnalysisData | null => {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return null;
    } catch (e) {
      console.error("Error parseando el análisis de la IA", e);
      return null;
    }
  };

  const data = parseAnalysis(rawAnalysis);

  if (!data) return null;

  return (
<Dialog
  open={open}
  onClose={onClose}
  maxWidth="sm"
  fullWidth
  PaperProps={{
    sx: {
      borderRadius: 4,
      maxHeight: '85vh',
      display: 'flex',
      flexDirection: 'column',
    },
  }}
>
    {/* TITLE */}
    <DialogTitle
        sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        pb: 1.5,
        }}
    >
        <AutoAwesomeIcon color="primary" />
        <Typography variant="h6" fontWeight={700}>
            Análisis con IA
        </Typography>
    </DialogTitle>

    {/* CONTENT */}

    <DialogContent dividers sx={{ borderTop: '1px solid #eee' }}>
        <Stack spacing={3} sx={{ mt: 1 }}>
            {/* Categoría */}
            <Box>
                <Chip label="Categoría" color="primary" sx={{ fontWeight: 'bold', mb: 1.5 }} />
                <Typography variant="body1" sx={{ color: '#444', ml: 0.5 }}>
                    {data.categoria}
                </Typography>
            </Box>

            {/* Resumen */}
            <Box>
                <Chip label="Resumen" color="primary" sx={{ fontWeight: 'bold', mb: 1.5 }} />
                <Typography variant="body1" sx={{ color: '#444', ml: 0.5, lineHeight: 1.6 }}>
                    {data.resumen}
                </Typography>
            </Box>

            {/* Interpretación */}
            <Box>
                <Chip label="Interpretación" color="primary" sx={{ fontWeight: 'bold', mb: 1.5 }} />
                <Typography variant="body1" sx={{ color: '#444', ml: 0.5, lineHeight: 1.6 }}>
                    {data.interpretacion}
                </Typography>
            </Box>

            {/* Perspectiva */}
            <Box>
                <Chip label="Perspectiva" color="primary" sx={{ fontWeight: 'bold', mb: 1.5 }} />
                <Typography variant="body1" sx={{ color: '#444', ml: 0.5 }}>
                    {data.perspectiva}
                </Typography>
            </Box>

            {data.entidades?.length > 0 ? (
                <Box>
                    <Chip label="Entidades Detectadas" color="primary" size="small" sx={{ mb: 1, fontWeight: 'bold' }} />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, pl: 1 }}>
                    {data.entidades.map((entidad, index) => (
                        <Chip key={index} label={entidad} variant="outlined" size="small" />
                    ))}
                    </Box>
                </Box>
            ) : (
                <Box>
                    <Chip label="Entidades Detectadas" color="primary" size="small" sx={{ mb: 1, fontWeight: 'bold' }} />
                    <Typography variant="body1" sx={{ color: '#444', ml: 0.5 }}>
                        No se mencionan empresas, marcas ni productos
                    </Typography>
                </Box>
            )}

        </Stack>
    </DialogContent>

  {/* ACTIONS */}
  <DialogActions
    sx={{
      borderTop: '1px solid',
      borderColor: 'divider',
      px: 3,
      py: 2,
    }}
  >
    <Button 
        onClick={() => {
            onClose();
            clearSongAnalysis();
        }} 
        variant="contained"
    >
      Cerrar
    </Button>
  </DialogActions>
</Dialog>


  );
};