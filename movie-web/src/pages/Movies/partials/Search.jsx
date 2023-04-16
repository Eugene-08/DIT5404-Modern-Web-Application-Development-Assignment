import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { POST } from '../../../utils/APIService';
import { SearchForm, TextSearch } from '../../../utils/FormUtil';
import { Container } from '../../../utils/Container';
import { StyledModal } from '../../../utils/StyleModal';
import { StyledButton } from '../../../utils/Button';
import { selectMovie, searchMovie, rateMovie, getMovie, addFavourite } from '../../../store/reducers/movie';
import { selectAuth } from '../../../store/reducers/auth';
import { handleSetPopupMessage } from '../../../store/reducers/util';
import { ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';
import { CardActionArea, Typography, CardMedia, CardContent, Card, Grid, Rating, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import HowToRegIcon from '@mui/icons-material/HowToReg';

function Search() {
  const dispatch = useDispatch();
  const movieState = useSelector(selectMovie);
  const authState = useSelector(selectAuth);
  const [open, setOpen] = useState({ MovieDetail: false, Rate: false });
  const [search, setSearch] = useState({title: ""});
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


  function handleAddFavourite(movieId) {
    const json = {
      movieId,
      userId: authState?.data?.user?._id
    };
    console.log('here json', json)
    dispatch(POST(addFavourite, '/accounts/addFavourite', json));
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
  }

  function genAllFeedback() {
    let html = [];
    movieState?.userRating?.movieDetail?.allFeedback?.map(item => {
      html.push(
        <>
          <Grid item xs={2}>
            <Typography component="legend" sx={{ color: "black" }}>{item.username}</Typography>
          </Grid>
          <Grid item xs={2}>
            {item.rating}<StarIcon sx={{ color: "yellow" }} />
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ color: "black", wordWrap: "auto" }}>{item.feedback}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ m: 1 }} />
          </Grid>
        </>
      );
    });
    return html;
  }

  // search movie at 1st time
  useEffect(() => {
    const json = {
      title: ""
    };
    dispatch(POST(searchMovie, '/movies/search', json));
  }, []);

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
      let rate = movieState?.userRating?.movieDetail?.allFeedback?.find(x => x.userid == authState?.data?.user?._id)?.rating || 0;
      let feedback = movieState?.userRating?.movieDetail?.allFeedback?.find(x => x.userid == authState?.data?.user?._id)?.feedback || "";
      setUserRating(rate);
      setFeedback(feedback);
    }
  }, [movieState.getMovieSuccess]);

  useEffect(() => {
    if (movieState.searchMovieSuccess) {
      let list = [];
      rows?.map(item => {
        list.push(item.movieDetail);
      });
      setMovieCards(list);
    }
  }, [movieState.searchMovieSuccess]);

  return (
    <>
      <StyledModal open={open.MovieDetail} onClose={() => { setEdit({}); setOpen({ ...open, MovieDetail: false }) }} title={edit.title}
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "80vw",
          height: "40vw",
          bgcolor: "#1E1E1E",
          boxShadow: 24,
          p: 2,
          maxHeight: "90vh",
          borderRadius: "5px"
        }}
      >
        <div style={{ width: "75vw", height: "35vw", display: "flex", flexDirection: "row", borderRadius: "5px", marginLeft: "1.5vw" }}>
          <div style={{ width: "70%", height: "100%", }}>
            <iframe
              title="video"
              src={edit?.details?.trailer}
              style={{ width: "100%", height: "100%", borderRadius: "5px" }}
            ></iframe>
          </div>
          <div style={{ width: "5%" }} />
          <div style={{ width: "25%", height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ width: "100%", height: "90%", backgroundColor: "#ccc", borderRadius: "5px", overflow: "overlay", color: "black", textAlign: "left" }}>
              <div style={{ textAlign: "center" }}>
                <Typography>Movie Details</Typography>
              </div>
              <div>
                <Typography>Leading Actor / Actresse: {edit?.details?.leadingactor?.join(", ")}</Typography>
              </div>
              <div>
                <Divider sx={{ m: 1 }} />
              </div>
              <div>
                <Typography>Director: {edit?.details?.director?.join(", ")}</Typography>
              </div>
              <div>
                <Divider sx={{ m: 1 }} />
              </div>
              <div>
                <Typography>Year of Release: {edit?.details?.release}</Typography>
              </div>
              <div>
                <Divider sx={{ m: 1 }} />
              </div>
              <div>
                <Typography>Category: {edit?.details?.category?.join(", ")}</Typography>
              </div>
              <div>
                <Divider sx={{ m: 1 }} />
              </div>
              <div>
                <Typography>Duration: {edit?.details?.duration}</Typography>
              </div>
              <div>
                <Divider sx={{ m: 1 }} />
              </div>
              <Grid container>
                <Grid item xs={6}>
                  <Typography>Rating:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      <Typography sx={{ mb: 0.5 }}>{edit?.rating}</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "left" }}>
                      <StarIcon sx={{ color: 'yellow' }} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Rating count:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      <Typography sx={{ mb: 0.5 }}>{edit?.ratecount}</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "left" }}>
                      <HowToRegIcon />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <div>
                <Divider sx={{ m: 1 }} />
              </div>
              <div>
                <Typography>Description: </Typography>
                <div style={{ height: "50%", overflowY: "scroll" }}>
                  <Typography>{edit?.details?.description}</Typography>
                </div>
              </div>
            </div>
            <div style={{ width: "100%", height: "5%" }}>
              <Grid container>
                <Grid item xs={6}>
                  <StyledButton
                    name={"addFavourite"}
                    label={!authState?.data?.user?._id && !localStorage?.getItem('token')?.user?._id ? "Please Login Before You Can Add To Favourite" : "Add To Favourite"}
                    onClick={() => handleAddFavourite(edit._id)} disabled={!authState?.data?.user?._id && !localStorage?.getItem('token')?.user?._id}
                    sx={{ mt: 2 }}
                    position={'center'}
                  />
                </Grid>
                <Grid item xs={6}>
                  <StyledButton
                    name={"rateMovie"}
                    label={!authState?.data?.user?._id && !localStorage?.getItem('token')?.user?._id ? "Please Login Before You Rate" : "Rate Movie"}
                    onClick={() => setOpen({ ...open, Rate: true })} disabled={!authState?.data?.user?._id && !localStorage?.getItem('token')?.user?._id}
                    sx={{ mt: 2 }}
                    position={'center'}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </StyledModal>

      <StyledModal open={open.Rate} onClose={() => setOpen({ ...open, Rate: false })} title={edit.title} width={'60vw'}>
        <Container sx={{ maxHeight: 300, overflow: 'auto' }}>
          <Grid container textAlign="left">
            <Grid item xs={2}>
              <Typography component="legend" sx={{ color: "black" }}>Username</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography component="legend" sx={{ color: "black" }}>Rating</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography sx={{ color: "black", wordWrap: "auto" }}>Feedback</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ m: 1 }} />
            </Grid>
            {movieState?.userRating?.movieDetail?.allFeedback?.length > 0 && genAllFeedback()}
          </Grid>
        </Container>
        <SearchForm onSubmit={(e) => handleRateMovie(e)} submitText={"Rate"} cellWidth={{ minWidth: "40ch", width: "98%" }}>
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
          <TextSearch name={"feedback"} label={"Feedback"} defaultValue={feedback} multiline={5} variant={"outlined"} />
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
          <ImageList className={{ flexWrap: 'nowrap' }} cols={2.5} rowHeight={500} >
            {movieCards.map((item) => (
              <ImageListItem key={item._id} style={{ height: 500, width: 200 }}>
                <Card sx={{ width: 200 }}>
                  <CardActionArea onClick={() => handleOpenEdit(item)}>
                    <CardMedia
                      component="img"
                      height={380}
                      image={`data:image/${item.details.imageType};base64, ${item.details.image}`}
                    />
                    <CardContent sx={{ height: 120 }}>
                      <Typography gutterBottom variant="h7" component="div">
                        {item.title}
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

<iframe width="1280" height="536" src="" title="His Only Son | Official Trailer | Angel Studios" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>