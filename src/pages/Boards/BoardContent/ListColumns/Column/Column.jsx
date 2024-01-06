import Box from '@mui/material/Box';
import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
// import CommentIcon from '@mui/icons-material/Comment';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCardIcon from '@mui/icons-material/AddCard';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { mapOrder } from '~/utils/sorts';
// import GroupIcon from '@mui/icons-material/Group';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import AttachmentIcon from '@mui/icons-material/Attachment';
import ListCards from './ListCards/ListCards';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Opacity } from '@mui/icons-material';

function Column({ column }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
    id: column._id,
    data: { ...column}
  });
  const DndKitColumnStyles = {
      // touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  };
     const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
  return (  
    <div ref={ setNodeRef } style={ DndKitColumnStyles } { ...attributes } >
      <Box 
        { ...listeners }
      sx={ {
        minWidth: '300px',
        maxWidth: '300px',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
        ml: 2,
        borderRadius: '6px',
        height: 'fit-content',
        maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
      }}>
      <Box
        sx={ {
          height: (theme) => theme.trello.columnHeaderHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography sx={ {
            fontWeight: 'bold',
            cursor: 'pointer',

        } }>{column?.title}
        </Typography>
          <Box>
            <Tooltip title="more option">
            <ExpandMoreIcon
              sx={ { color: 'text.primary', cursor: 'pointer' } }
              id="basic-column-dropdown"
              aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={ handleClick }
              endIcon={<ExpandMoreIcon/>}
              />
              </Tooltip>
      <Menu
        id="basic-menu-column-dropdown"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-column-dropdown',
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <AddCardIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add new Card</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
        </MenuItem>
        <Divider />
              <MenuItem>
                <ListItemIcon><DeleteForeverIcon fontSize='small' /></ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
               <MenuItem>
                <ListItemIcon><Cloud fontSize='small' /></ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
      </Menu>
    </Box>
        </Box >
          <ListCards cards={orderedCards}/>
        <Box sx={ {
            height: (theme) => theme.trello.columnFooterHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        } }>
          <Button startIcon={ <AddCardIcon /> }>Add new car</Button>
          <Tooltip title="Drag to move">
            <DragHandleIcon sx={ {cursor: 'pointer'}} />
          </Tooltip>
        </Box>
       
      
      </Box>
      </div>

     
  )
}

export default Column
