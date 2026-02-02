import { Card, CardMedia } from "@mui/material";


export function MainLogo () {
    return (
        <>
            <Card 
                elevation={0} 
                sx={{
                    border: 'none', 
                    borderRadius: 0
                }}
            >
                <CardMedia
                    component="img"
                    height="200" 
                    image="lyra-logo.png"
                    alt="Portada del álbum"
                    sx={{
                        width: '100%',
                        objectFit: 'contain'
                    }}
                />
            </Card>
        </>
    );
}