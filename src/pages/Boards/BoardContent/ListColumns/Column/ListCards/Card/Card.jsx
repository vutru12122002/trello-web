import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import CommentIcon from '@mui/icons-material/Comment';
import GroupIcon from '@mui/icons-material/Group';
import { Card as MuiCard } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AttachmentIcon from '@mui/icons-material/Attachment';

import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

function Card({ card }) {
   const { attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
    id: card._id,
    data: { ...card}
  });
  const DndKitCardStyles = {
    // touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined
  };
  const shouldShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  // if (temporaryHideMedia)
  // {
  //   return (
  //     <MuiCard sx={ {
  //           cursor: 'pointer',
  //           boxShadow: '0 1px 1px rgba(0,0,0, 0.2)',
  //           overflow: 'unset'
  //         } }>
  
  //           <CardContent sx={ {
  //       p: 1.5, '&:last-child':{p: 1.5}
  //     }}>
  //       <Typography >Trello Clone 01</Typography>
              
  //     </CardContent>
  //         </MuiCard>
  //   )
  //   }
  return (
    <MuiCard
      ref={ setNodeRef } style={ DndKitCardStyles } { ...attributes } { ...listeners }
      sx={ {
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0,0,0, 0.2)',
        overflow: 'unset',
            display: card?.FE_PlaceholderCard ? 'none' : 'block'
        // overflow: card?.FE_PlaceholderCard ? 'hiden' : 'unset',
        //     height: card?.FE_PlaceholderCard ? '0px' : 'unset'
    } }>
      { card?.cover && <CardMedia sx={ { height: 140 } } image={card?.cover}/>}
      {/* <CardMedia
        sx={{ height: 140 }}
        image="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/09/hinh-nen-anime-nam-18.jpg"
        title="green iguana"
      /> */}
            <CardContent sx={ {p: 1.5, '&:last-child':{p: 1.5}}}>
        <Typography >{ card?.title}</Typography>
              
      </CardContent>
      { shouldShowCardActions() && <CardActions sx={ { p: '0 4px 8px 4px' } }>
        { !!card?.memberIds?.length && <Button size="small" startIcon={ <GroupIcon /> }>{ card?.memberIds?.length }</Button>}
        { !!card?.comments?.length && <Button size="small" startIcon={ <CommentIcon /> }>{ card?.comments?.length }</Button> }
        { !!card?.attachments?.length && <Button size="small" startIcon={ <AttachmentIcon /> }>{ card?.attachments?.length }</Button> }
      </CardActions>
      }
      
          </MuiCard>
  )
}

export default Card
