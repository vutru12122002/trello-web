// import Button from '@mui/material/Button';
// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
// import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
// import HomeIcon from '@mui/icons-material/Home'
// import { pink } from '@mui/material/colors';
// import Typography from '@mui/material/Typography'
import {
    useColorScheme
} from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import Box from '@mui/material/Box';
// import Container from '@mui/material/Container'
// import theme from './theme';


function ModeSelect() {
  const { mode, setMode } = useColorScheme();
  const handleChange = (event) => {
    // setAge(event.target.value);
    const selectedtMode = event.target.value
    setMode(selectedtMode)

  };

  return (
    <FormControl  size="small">
      <InputLabel
        id="label-select-mode-dark-light-mode"
        sx={ {
          color: 'white',
          '&.Mui-focused':{color: 'white'}
        }}
      >Mode</InputLabel>
      <Select
        labelId="label-select-mode-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={ handleChange }
        sx={ {
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&:Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&.MuiSvgIcon-root': {color: 'white'}
        }}
      >
        <MenuItem value="light">
          <Box style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <LightModeIcon fontSize='small'/>
            Light
            </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <DarkModeOutlinedIcon fontSize='small'/>
            Dark
            </Box>
        </MenuItem>
        <MenuItem value="system">
           <Box style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <SettingsBrightnessIcon fontSize='small'/>
            System
            </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default ModeSelect