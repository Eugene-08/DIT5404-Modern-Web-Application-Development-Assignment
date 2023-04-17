import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
// import { CardActionArea } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';
// import IconButton from '@mui/material/IconButton';
import {IconButton, CardActionArea, Typography, CardMedia, CardContent, Card}  from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    imageList: {
        flexWrap: 'nowrap',
    }
}));

export function StyledCard(props) {
    // const { label, text, imageType, image, rating, sx, ...common } = props;
    const { itemList, ...common } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ImageList className={classes.ImageList} cols={2.5} rowHeight={300} >
                {itemList.map((item) => (
                    <ImageListItem key={item._id} >
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`data:image/${item.details.imageType};base64, ${item.details.image}`}
                                />
                                <CardContent {...common}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.details.description}
                                    </Typography>
                                    <StarIcon sx={{ color: "yellow" }} /> {Math.round(item.rating * 10) / 10}
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <ImageListItemBar
                            title={item.title}
                            actionIcon={
                                <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}