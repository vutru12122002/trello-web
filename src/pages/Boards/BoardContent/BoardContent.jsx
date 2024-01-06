import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '~/utils/sorts';
import {
  DndContext,
  PointerSensor,
  useSensor,
  MouseSensor,
  TouchSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCenter,
  closestCorners,
  pointerWithin, 
  getFirstCollision,
} from '@dnd-kit/core'
import { useEffect, useState, useCallback,  useRef } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Card/Card';
import { cloneDeep, isEmpty } from 'lodash';
import { generatePlaceholderCard } from '~/utils/formatters';
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
function BoardContent({ board }) {
  
  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, telerance: 5}})

  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setactiveDragItemId] = useState(null)
  
  const [activeDragItemType, setactiveDragItemType] = useState(null)
  const [activeDragItemData, setactiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)
  const lastOverId = useRef(null)

  useEffect(() => {
    // const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }
  const moveCardBetweenDifferentColumn = (
    overColumn,
    overCardId,
    over,
    active,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
   
     setOrderedColumns(prevColumns => {
            const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
            let newCardIndex
            const isBelowOverItem = active.rect.current.translated &&
                active.rect.current.translated.top > over.rect.top + over.rect.height;
                const modifier = isBelowOverItem ? 1 : 0;
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;
       
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)
        if (nextActiveColumn) { 
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
          if (isEmpty(nextActiveColumn.cards)) {
            console.log('card keo tha cuoi cung')
            nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
          }
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }
        if (nextOverColumn) {
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
          const rebuild_activeDraggingCardData = {
            ...activeDraggingCardData,
            columnId: nextOverColumn._id
          }
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
          nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_placeholderCard)

          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }
        // console.log('nextColumns', nextColumns)
        return nextColumns
      })
  }

  const handleDragStart = (event) => {
    // console.log(event)
    setactiveDragItemId(event?.active?.id)
    setactiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setactiveDragItemData(event?.active?.data?.current)

    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id)) 
    }
  }
  const handleDragOver = (event) => {
    // console.log(event)
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    const { active, over } = event 
    
    if (!active || !over) return 
    
    const { id: activeDraggingCardId, data: {current: activeDraggingCardData} } = active
    const { id: overCardId } = over
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    // console.log('activeColumn', activeColumn)
    if (!activeColumn || !overColumn) return
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumn(overColumn,
    overCardId,
    over,
    active,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData)
    }
  }
  const handleDragEnd = (event)  => {
    // console.log(event)
    const { active, over } = event

     if(!active || !over) return
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
          const { id: activeDraggingCardId, data: {current: activeDraggingCardData} } = active
          const { id: overCardId } = over
          const activeColumn = findColumnByCardId(activeDraggingCardId)
          const overColumn = findColumnByCardId(overCardId)
          // console.log('activeColumn', activeColumn)
      if (!activeColumn || !overColumn) return
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumn(
          overColumn,
    overCardId,
    over,
    active,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData)
      
      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
      
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)
        const dndorderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
        setOrderedColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)
          targetColumn.cards = dndorderedCards
          targetColumn.cardOrderIds = dndorderedCards.map(card => card._id)
         // console.log(targetColumn)
          return nextColumns
        })
       }
    }
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) { 
      if (active.id !== over.id) {
      const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
      
      const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
      const dndorderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
      // const dndorderedColumnsIds = dndorderedColumns.map(c => c._id)

      setOrderedColumns(dndorderedColumns)
    }
    }
    
    setactiveDragItemId(null)
    setactiveDragItemType(null)
    setactiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }
  const customdropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }
  
  const collisionDetectionStrategy = useCallback((args) => {
    // console.log('co con cac')
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners( { ...args })
    }
    const pointerIntersections = pointerWithin(args)
    // console.log('point', pointerIntersections)

    if(!pointerIntersections?.length) return 
    // const intersections = !!pointerIntersections?.length ? pointerIntersections : rectIntersection(args)
    
    let overId = getFirstCollision(pointerIntersections, 'id')
    console.log('overId: ',overId)
    if (overId) {
      const checkColumn = orderedColumns.find(column => column._id === overId)
      if (checkColumn) {
        console.log('trc', overId)
        lastOverId.current = overId
        overId = closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container._id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
          })
        })[0]?.id
        console.log('sau', overId)
      }
      lastOverId.current = overId
      return [{id: overId}]
    }
    return lastOverId.current ? [{id : lastOverId.current}] : []
  }, [activeDragItemType, orderedColumns])
  return (
    <DndContext
      onDragStart={ handleDragStart }

      collisionDetection={ collisionDetectionStrategy }
      // collisionDetection={ closestCorners }
      onDragOver={handleDragOver}
      onDragEnd={ handleDragEnd }
      sensors={ sensors }>
    <Box sx={ {
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1976d2'),
         width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
    } }>
        <ListColumns columns={ orderedColumns } />
        <DragOverlay dropAnimation={customdropAnimation}>
          { (!activeDragItemId || !activeDragItemType) && null }
          { (activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={ activeDragItemData } /> }
          { (activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={ activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
