import './App.css';
import { FILMSGRAPH } from './graphql';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import {
  styled, CircularProgress, CardContent, Typography, Card, Collapse, IconButton, Grid, createTheme, ThemeProvider,
  FormControl, InputLabel, Select, MenuItem, SelectChangeEvent
} from '@mui/material/';
import { blue, blueGrey } from '@mui/material/colors';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CharDrawer from './CharDrawers';

type filmsType = {
  allFilms: {
    films: {
      director: string,
      id: string,
      releaseDate: string,
      title: string,
      __typename: string,
      openingCrawl: string
      characterConnection: {
        edges:
        [
          node: {
            gender: string,
            id: string,
            name: string,
            species: string,
            __typename: string,
          },
          __typename: string
        ]
      }
    }[]
  }
};

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: blueGrey
  },
});

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function App() {

  const { loading, error, data: films } = useQuery<filmsType>(FILMSGRAPH);
  const [selectExpand, setSelectExpand] = useState<string | null>(null);
  const [directorFilter, setDirectorFilter] = useState(' ');

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

  const renderCharacterConnection = (items: any, title: string) => {
    return <CharDrawer title={title} items={items.edges} />
  }

  const renderFilmBlocks = () => {
    let myFilmList;
    if (directorFilter !== ' ') {
      myFilmList = getFilmsByDirector(directorFilter)
    } else {
      myFilmList = getAllFilms();
    }

    return myFilmList?.map(({ title, director, releaseDate, openingCrawl, id, characterConnection }) => {
      return (
        <Grid item lg={4} md={6} xs={12}>
          <Card key={id}>
            <CardContent>
              <Typography sx={{ fontSize: 28 }} color="text.secondary" gutterBottom>
                {title}
              </Typography>
              {releaseDate} <br />
              {director}
              <Collapse in={isExpanded(id)} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>
                    {openingCrawl}
                  </Typography>
                </CardContent>
              </Collapse>

              {renderCharacterConnection(characterConnection, title)}
              <ExpandMore
                expand={isExpanded(id)}
                onClick={() => handleExpandClick(id)}
                aria-expanded={isExpanded(id)}
                aria-label="show more"
                color="primary"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardContent>
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
        <FormControl fullWidth>
          <InputLabel>Director</InputLabel>
          <Select
            value={directorFilter}
            label="Director"
            onChange={handleDirectorFilter}
          >
            <MenuItem value={' '}>All</MenuItem>
            {getDirectorsFilters().map((item: string) => <MenuItem value={item}>{item}</MenuItem>)}
          </Select>
        </FormControl>
        {renderFilmBlocks()}
      </Grid>
    </>
  );


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div className="container">
          {
            !loading ? renderFilms() : <CircularProgress />
          }
        </div>
      </ThemeProvider >
    </div>
  );
}

export default App;
