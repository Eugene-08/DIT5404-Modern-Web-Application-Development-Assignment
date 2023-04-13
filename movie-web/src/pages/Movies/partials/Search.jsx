import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { POST } from '../../../utils/APIService';
import { SearchForm, TextSearch } from '../../../utils/FormUtil';
import { Container } from '../../../utils/Container';
import { StyledModal } from '../../../utils/StyleModal';
import { StyledButton } from '../../../utils/Button';
import { selectMovie, searchMovie, rateMovie, getMovie } from '../../../store/reducers/movie';
import { selectAuth } from '../../../store/reducers/auth';
import { handleSetPopupMessage } from '../../../store/reducers/util';
import { ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';
import { CardActionArea, Typography, CardMedia, CardContent, Card, Grid, Button, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

function Search() {
  const dispatch = useDispatch();
  const movieState = useSelector(selectMovie);
  const authState = useSelector(selectAuth);
  const [open, setOpen] = useState({ MovieDetail: false, Rate: false });
  const [search, setSearch] = useState({});
  const [searchStatus, setSearchStatus] = useState(false);
  const [current, setCurrent] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortFields, setSortFields] = useState("title");

  const [movieCards, setMovieCards] = useState([]);

  const [edit, setEdit] = useState({});
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const rows = movieState?.movies?.movie || [];

  const handleSortModelChange = (event) => {
    setCurrent(1);
    setSortOrder(event[0]?.sort);
    setSortFields(event[0]?.field);
  };

  function handleOpenEdit(e) {
    let json = {
      movieid: e._id,
      userid: authState?.data?.user?._id || localStorage?.getItem('token')?.user?._id,
    };
    dispatch(POST(getMovie, '/movies/searchByMovie', json));
    setEdit(e);
    setOpen({ ...open, MovieDetail: true });
  }

  function handleSearch(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let title = data.get("title");

    let json = {
      title,
    };

    setSearch(json);
    setSearchStatus(true);
  }

  function handleRateMovie(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let feedback = data.get("feedback");

    let json = {
      title: edit.title,
      movieid: edit._id,
      rating: userRating == null || isNaN(userRating) ? 0 : userRating,
      userid: authState?.data?.user?._id || localStorage?.getItem('token')?.user?._id,
      feedback: feedback,
    };

    dispatch(POST(rateMovie, '/movies/rateMovie', json));
  };

  // search movie
  useEffect(() => {
    if (search != {} && searchStatus) {
      dispatch(POST(searchMovie, '/movies/search', search));
      setSearchStatus(false);
    }
  }, [searchStatus]);

  useEffect(() => {
    if (movieState.rateMovieSuccess) {
      dispatch(handleSetPopupMessage({
        msg: {
          message: "Rate Success",
          open: true,
          severity: "success",
        }
      }));
      setSearchStatus(true);
      setOpen({ MovieDetail: false, Rate: false });
    }
  }, [movieState.rateMovieSuccess]);

  useEffect(() => {
    if (movieState.getMovieSuccess) {
      let rate = movieState?.userRating?.userrating?.rating || 0;
      setUserRating(rate);
    }
  }, [movieState.getMovieSuccess]);

  useEffect(() => {
    if (movieState.searchMovieSuccess) {
      let list = [];
      rows?.map(item => {
        let movieDetail = item.movieDetail;
        list.push(
          movieDetail
          // <StyledCard label={movieDetail.title} text={movieDetail.details.description} image={movieDetail.details.image} imageType={movieDetail.details.imageType} rating={movieDetail.rating} onClick={() => handleOpenEdit(movieDetail)} />
        );
      });

      setMovieCards(list);
    }
  }, [movieState.searchMovieSuccess]);
  console.log('here list ', movieCards);

  return (
    <>
      <StyledModal open={open.MovieDetail} onClose={() => { setEdit({}); setOpen({ ...open, MovieDetail: false }) }} title={"Movie Detail"} >
        <Grid container sx={{ color: "black" }} textAlign={"center"} >
          <Grid item xs={12}>
            <Typography>Title: {edit?.title}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Leading Actor / Actresse: </Typography>
            {edit?.details?.leadingactor?.map((item) => { return (<Typography>Name: {item}</Typography>) })}
          </Grid>
          <Grid item xs={6}>
            <Typography>Director: {edit?.details?.director}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Year of Release: {edit?.details?.release}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Category: {edit?.details?.category}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Duration: {edit?.details?.duration}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Description: {edit?.details?.description}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Rating: {edit?.rating}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Rating count: {edit?.ratecount}</Typography>
          </Grid>
          <Grid item xs={12}>
            <StyledButton name={"rateMovie"} label={!authState?.data?.user?._id && !localStorage?.getItem('token')?.user?._id ? "Please Login Before You Rate":"Rate Movie"} onClick={() => setOpen({ ...open, Rate: true })} disabled={!authState?.data?.user?._id && !localStorage?.getItem('token')?.user?._id} />
          </Grid>
        </Grid>
      </StyledModal>

      <StyledModal open={open.Rate} onClose={() => setOpen({ ...open, Rate: false })} title={edit.title}>
        <SearchForm onSubmit={(e) => handleRateMovie(e)} submitText={"Rate"}>
          <Grid container spacing={2} textAlign={"center"} >
            <Grid item xs={6}>
              <Typography component="legend" sx={{ color: "black" }}>Rating</Typography>
            </Grid>
            <Grid item xs={6}>
              <Rating
                name="read-only"
                defaultValue={edit.rating}
                max={10}
                readOnly
              />
            </Grid>
            <Grid item xs={6}>
              <Typography component="legend" sx={{ color: "black" }}>Your Rating</Typography>
            </Grid>
            <Grid item xs={6}>
              <Rating
                name="rating"
                max={10}
                value={userRating}
                onChange={(event, newValue) => {
                  setUserRating(newValue);
                }}
              />
            </Grid>
          </Grid>
          <TextSearch name={"feedback"} label={"Feedback"} defaultValue={movieState?.userRating?.userrating?.feedback} multiline variant={"outlined"} />
        </SearchForm>
      </StyledModal>

      <Container>
        <SearchForm onSubmit={(e) => handleSearch(e)} submitText={"Search"}>
          <TextSearch name={"title"} label={"Title"} />
        </SearchForm>
        <div className={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          overflow: 'hidden',
        }}>
          <ImageList className={{ flexWrap: 'nowrap' }} cols={2.5} rowHeight={300} >
            {movieCards.map((item) => (
              <ImageListItem key={item._id} style={{ height: 380, width: 200 }}>
                <Card sx={{ width: 200 }}>
                  <CardActionArea onClick={() => handleOpenEdit(item)}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`data:image/${item.details.imageType};base64, ${item.details.image}`}
                    />
                    <CardContent>
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
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      </Container>
    </>
  )
}

export default Search;