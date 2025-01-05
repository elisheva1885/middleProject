import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import { Routes  , Route , Link} from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import PersonIcon from '@mui/icons-material/Person';


import Users from './Users';
import Todos from './Todos';
import Posts from './Posts';

const pages = ['Users', 'Posts', 'Todos'];

const Home = () => {
 return(
    <>
    <h3>bbbbbbbbbbbbbbb</h3>
    <Grid container wrap='nowrap' sx={{overflow: "auto"}} spacing={2} disableEqalOverflow m={13}> 
    <Routes>
        <Route path = '/Users' element={<Grid size={12}><Users/></Grid>} />
        <Route path = '/Posts' element={<Grid size={12}><Posts/></Grid>} />
        <Route path = '/Todos' element={<Grid size={12}><Todos/></Grid>} />
    </Routes>
  <Grid size={12} gap={50}>
    <AppBar position="fixed" >
    <Container maxWidth="xl">
      <Toolbar disableGutters>
      {/* <Link to={`/`} style={{textDecoration : 'none'}} > */}
        <DeviceHubIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          MIDDLE PROJECT
         </Typography>
         {/* </Link> */}
        <Box  sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Link to={`/${page}`} style={{textDecoration : 'none'}} >
            <Button
              key={page}

              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page}
            </Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
  </Grid>
  </Grid>
  </>
  );
}



export default Home;