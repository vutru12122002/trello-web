import {useState} from 'react'
import Box from '@mui/material/Box';
import ModeSelect from '~/components/ModeSelect/ModeSelect';
import theme from '../../theme';
import AppsIcon from '@mui/icons-material/Apps';
import trelloIcon from '~/assets/trello.svg'
// import { ReactComponent as trelloIcon } from '~/assets/trello.svg';
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces';
import Recent from './Menus/Recent';
import Starred from './Menus/Starred';
import Templates from './Menus/Templates';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Profiles from './Menus/Profiles';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import InputAdornment from '@mui/material/InputAdornment';

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function AppBar() {
  const [searchValue, setsearchValue] = useState('');
  return (
    <Box px={ 2 } sx={ {
      backgroundColor: 'white',
      width: '100%',
      height: (() => theme.trello.appBarHeight)(theme),
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      bgcolor: ( theme ) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
        
      } }>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
              <AppsIcon sx={ { color: 'white' } } />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5}}>
              <img src={ trelloIcon } style={{color: 'white'}} />
              <Typography variant='span' sx={{fontSize: '1.2rem', fontWeight: 'bold', color: 'white'}}>Trello</Typography>
        </Box>
        <Box sx={{display: {xs: 'none', md: 'flex', gap: 1}}}>
        <Workspaces />
        <Recent />
        <Starred />
        <Templates />
          <Button variant="outlined" startIcon={<AddToPhotosIcon/>} sx={{color: 'white', border: 'none', '&:hover': {border: 'none'}}}>Create</Button>
          </Box>
          </Box>
      <Box  sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
        <TextField
          id="outlined-search"
          label="Search.."
          type="search" size='small'
          value={ searchValue }
          onChange={ (e) => setsearchValue(e.target.value) }
          sx={ {
          minWidth: 120, maxWidth: 170, '& label': { color: 'white' }, '& input': { color: 'white' }, '& label.Mui-focused': { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'white' },
            '&:&hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset' : { borderColor: 'white'}
        }
        } } InputProps={ {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{color: 'white'}}/>
            </InputAdornment>
          ),
          endAdornment: (
            <CloseIcon
              fontSize='small'
              sx={ { color: searchValue ? 'white' : 'transparent', cursor: 'pointer' } }
              onClick={ () => setsearchValue('')}
            />
          )
        }} />
        <ModeSelect />
        <Tooltip title="Notification">
          <Badge color="warning" variant="dot" sx={{ cursor: 'pointer'}}>
            <NotificationsNoneIcon  sx={{cursor: 'pointer'}}/>
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white'}}/>
        </Tooltip>
        <Profiles/>
      </Box>
    </Box>
  )
}

export default AppBar
