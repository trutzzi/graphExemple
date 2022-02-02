import { FC } from "react";
import { CardContent, Typography, Collapse, IconButton, styled, } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CharDrawer from '../CharDrawers';
import { FilmsType } from '../graphql';

type FilmProps = {
    data: {
        title: string,
        releaseDate: string,
        director: string,
        openingCrawl: string,
        id: string,
        characterConnection: {},
    }
    handleExpandClick: (id: string) => void
    isExpanded: (id: string) => boolean,
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

const FilmCard: FC<FilmProps> = ({ data, isExpanded, handleExpandClick }) => {
    const { title, releaseDate, director, openingCrawl, characterConnection, id } = data;
    const renderCharacterConnection = (items: any, title: string) => {
        return <CharDrawer title={title} items={items.edges} />
    }

    return (<CardContent>
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
    </CardContent>);
}
export default FilmCard;