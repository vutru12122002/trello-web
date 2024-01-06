// import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
// import ModeSelect from '../../components/ModeSelect';
// import theme from '../../theme';
import AppBar from '../../components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { mockData } from '~/apis/mock-data';

function Board() {
 
  return (
    <Container disableGutters maxWidth={ false } sx={ { height: '100vh', backgroundColor: 'primary.main' } }>
        <AppBar/>  
      <BoardBar board={ mockData?.board} />
        <BoardContent board={ mockData?.board}/>          
    </Container>
      
  )
}
export default Board