import './App.css';
import { FILMSGRAPH, FilmsType } from './graphql';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import {
  CircularProgress, Typography, Card, Grid, ThemeProvider, SelectChangeEvent
} from '@mui/material/';
import DirectorSearch from './components/DirectorSearch';
import FilmCard from './components/FilmCard';
import { theme } from './theme';

function App() {

  const { loading, error, data: films } = useQuery<FilmsType>(FILMSGRAPH);
  const [selectExpand, setSelectExpand] = useState<string | null>(null);
  const [directorFilter, setDirectorFilter] = useState('all');

  const isExpanded = (id: string) => {
    return (selectExpand === id);
  };

  const handleExpandClick = (id: string) => {
    isExpanded(id) ? setSelectExpand(null) : setSelectExpand(id);
  };

  const getDirectorsFilters = () => {
    const uniqDirectors: string[] = [];
    films?.allFilms?.films.map(item => {
      const existDirector = uniqDirectors?.indexOf(item.director);
      existDirector && uniqDirectors.push(item.director);
    });
    return uniqDirectors;
  }

  const getFilmsByDirector = (director: string) => films?.allFilms?.films.filter(item => item.director === director);
  const getAllFilms = () => films?.allFilms?.films.map(item => item);

  const handleDirectorFilter = (event: SelectChangeEvent<string>) => {
    console.log(event.target.value)
    setDirectorFilter(event.target.value);
  }

  const renderFilmBlocks = () => {
    let myFilmList;
    if (directorFilter !== 'all') {
      myFilmList = getFilmsByDirector(directorFilter)
    } else {
      myFilmList = getAllFilms();
    }

    return myFilmList?.map(({ title, director, releaseDate, openingCrawl, id, characterConnection }) => {
      return (
        <Grid item lg={4} md={6} xs={12}>
          <Card key={id}>
            <FilmCard data={{ title, id, director, releaseDate, openingCrawl, characterConnection }} isExpanded={isExpanded} handleExpandClick={handleExpandClick} />
          </Card>
        </Grid>
      )
    })
  }
  const renderFilms = () => (
    <>
      <Grid container spacing={2}>
        <Grid lg={12} md={12} xs={12} item>
          <Typography sx={{ fontSize: 42 }} color="text.secondary" gutterBottom>
            StarWars API
          </Typography>
          <Typography variant="subtitle1">
            <a target="_blank" href="https://graphql.org/">GraphQL</a>, <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>, <a href="https://reactjs.org/" target="_blank">ReactJS</a> and the new <a target="_blank" href="https://mui.com/">MaterialUI</a> exemple
          </Typography>
        </Grid>

        <DirectorSearch getDirectorsFilters={getDirectorsFilters} handleDirectorFilter={handleDirectorFilter} directorFilter={directorFilter} />
        {renderFilmBlocks()}
      </Grid>
    </>
  );


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div className="container">
          {loading ? <CircularProgress /> : renderFilms()}
        </div>
      </ThemeProvider >
    </div>
  );
}

export default App;
