import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


type CharDrawerProps = {
    items: {
        gender: string,
        id: string,
        name: string,
        species: []
    },
    title: string
};

const CharDrawer: React.FC<CharDrawerProps> = ({ items, title }) => {

    const [state, setState] = React.useState(false);

    const renderItems = (item: any) => {
        return item.map(({ node }: { node: any }) => {
            const { gender, id, name, species } = node;
            return (
                <div >
                    <h3>{name}</h3>
                    <p>{species && species.name} {species && gender && '~'} {gender !== "n/a" && gender}
                    </p>
                </div>
            )
        })
    }

    const toggleDrawer = (anchor: any, open: any) => (event: any) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState(!state);
    };

    const list = (anchor: any) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            style={{ padding: '15px' }}
        >
            <h2>{title} <br />Characters List</h2>
            <Divider />
            {renderItems(items)}
        </Box>
    );

    return (
        <div>
            <React.Fragment key={'right'}>
                <Button onClick={toggleDrawer('right', true)}>Open Characters</Button>
                <SwipeableDrawer
                    anchor={'right'}
                    open={state}
                    onClose={toggleDrawer('right', false)}
                    onOpen={toggleDrawer('right', true)}
                >
                    {list('right')}
                </SwipeableDrawer>
            </React.Fragment>
        </div >
    );
}

export default CharDrawer;