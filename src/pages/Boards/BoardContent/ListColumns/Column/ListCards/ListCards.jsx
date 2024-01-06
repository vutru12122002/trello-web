import Box from '@mui/material/Box';
import Card from './Card/Card';
// import Typography from '@mui/material/Typography'
// import Button from '@mui/material/Button';

// import CommentIcon from '@mui/icons-material/Comment';

// import GroupIcon from '@mui/icons-material/Group';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import AttachmentIcon from '@mui/icons-material/Attachment';

function ListCards({cards}) {
  return (
    <Box sx={{
          p: '0 5px',
          m: '0 5px',
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    overflowX: 'hidden',
    overflowY: 'auto',
          maxHeight: (theme) => `calc(
      ${theme.trello.boardContentHeight} - 
      ${theme.spacing(5)} - 
      ${theme.trello.columnHeaderHeight} - 
      ${theme.trello.columnFooterHeight})`,
    '&::-webkit-scrollbar-thumb': { backgroundColor: '#bcde1'},
    '&::-webkit-scrollbar-thumb:hover': { backgroundColor: 'white',}
    } }>
      { cards?.map(card => <Card key={card._id} card={card} />)}
      {/* <Card/> */}
      {/* <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia /> */}
      
          </Box>
  )
}

export default ListCards
