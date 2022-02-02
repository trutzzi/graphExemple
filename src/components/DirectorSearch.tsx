import { Badge, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import ViewListIcon from '@mui/icons-material/ViewList';
import { FC, useMemo } from "react"

type DirectorProps = {
    getDirectorsFilters: Function,
    handleDirectorFilter: (event: SelectChangeEvent<string>) => void,
    directorFilter: string
};

const DirectorSearch: FC<DirectorProps> = ({ getDirectorsFilters, handleDirectorFilter, directorFilter }) => {
    const directors = useMemo(() => getDirectorsFilters(), [directorFilter]);
    return (
        <>
            <Grid lg={12} md={12} xs={12} item>
                {directorFilter !== 'all' && (<div>
                    <Badge anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }} badgeContent={directors.length} color="primary">
                        <ViewListIcon />
                        <span>Director Filter applied</span>
                    </Badge>
                </div>)
                }
            </Grid>
            <Grid lg={12} md={12} xs={12} item>
                <FormControl fullWidth>
                    <InputLabel>Director</InputLabel>
                    <Select
                        value={directorFilter}
                        label="Director"
                        onChange={handleDirectorFilter}
                    >
                        <MenuItem value={'all'}>All</MenuItem>
                        {directors.map((item: string) => <MenuItem value={item}>{item}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
        </>
    );
};
export default DirectorSearch