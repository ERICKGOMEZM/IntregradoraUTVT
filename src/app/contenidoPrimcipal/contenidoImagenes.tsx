import * as React from 'react';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Image from 'next/image';

export default function CustomImageList() {
  return (
    <Container maxWidth="md">
      <ImageList
        sx={{
          width: '100%',
          height: 450,
          transform: 'translateZ(0)',
        }}
        rowHeight={200}
        gap={1}
      >
        {itemData.map((item) => {
          const cols = item.featured ? 2 : 1;
          const rows = item.featured ? 2 : 1;

          return (
            <ImageListItem key={item.img} cols={cols} rows={rows}>
              <Image
  src={item.img}
  alt={item.title}
  layout="fill" // Asegura que la imagen llene todo el contenedor.
  objectFit="cover" // Mantiene las proporciones y recorta si es necesario.
  priority={item.featured}
/>

              <ImageListItemBar
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                }}
                title={item.title}
                position="top"
                actionIcon={
                  <IconButton
                    sx={{ color: 'white' }}
                    aria-label={`star ${item.title}`}
                  >
                    <StarBorderIcon />
                  </IconButton>
                }
                actionPosition="left"
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </Container>
  );
}

const itemData = [
  {
    img: '/imagenes/1a.jpg',
    title: 'UTVT',
    featured: true,
  },
  {
    img: '/imagenes/2.jpg',
    title: 'UTVT',
  },
  {
    img: '/imagenes/3.jpg',
    title: 'UTVT',
  },
  {
    img: '/imagenes/4.jpg',
    title: 'UTVT',
  },
  {
    img: '/imagenes/5.jpg',
    title: 'UTVT',
  },
  {
    img: '/imagenes/6.jpg',
    title: 'UTVT',
    featured: true,
  },
  {
    img: '/imagenes/7.jpg',
    title: 'UTVT',
  },
  {
    img: '/imagenes/8.jpg',
    title: 'UTVT',
  },
  {
    img: '/imagenes/9.jpg',
    title: 'UTVT',
  },
  {
    img: '/imagenes/10.jpg',
    title: 'UTVT',
  },
  {
    img: '/imagenes/11.jpg',
    title: 'UTVT',
  },
  {
    img: '/imagenes/12.jpg',
    title: 'UTVT',
  },
];
