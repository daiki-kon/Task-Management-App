import React,{ FC, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { KanbanInfo, TaskCardInfo} from '../../DefineInfo'
import { kanbanDelete } from '../../actions/kanban'
import { taskCardAdd, taskCardDeleteAll, taskCardEdit } from '../../actions/TaskCard'
import { storeData } from '../../reducer'
import { TaskCardForm, TaskCard,TaskCardEmpty } from './TaskCard' 

import { Button, Grid, Icon, Container} from 'semantic-ui-react'
import './Kanban.css'

const initKanbanProps: KanbanInfo = {
  parentProjectID: '',
  kanbanID: '',
  kanbanTitle: '',
}

const initTask: TaskCardInfo = { 
  parentKanbanID: '',
  taskCardID: '',
  content: ''
}

export const Kanban: FC<KanbanInfo> = (
  kanban = initKanbanProps
) =>{
  const [isOpen,setIsOpen] = useState(false);
  const [isEdit,setIsEdit] = useState(false);
  const [editTask,setEditTask] = useState(initTask)

  const dispatch = useDispatch();
  const taskCards = useSelector((state:storeData) => state.taskCards);  

  const currentTaskCards: TaskCardInfo[]  = taskCards.items.filter((taskCard) => taskCard.parentKanbanID === kanban.kanbanID);

  const editForm = (preEditTask: TaskCardInfo) =>{
    setIsOpen(true)
    setIsEdit(true);
    setEditTask(preEditTask)
  }

  const kanbanClose = () => {
    dispatch(taskCardDeleteAll(kanban.kanbanID || ''));
    dispatch(kanbanDelete(kanban));
  }

  return(
  <div className='kanban'>
    <Grid.Column >
      <div className='kanbanHeader'>
        <p>{ kanban.kanbanTitle }</p>
        <div className='kanbanClose'>
          <Button icon onClick={() => kanbanClose()}>
            <Icon name='close'/>
          </Button>
        </div>
      </div>
      {currentTaskCards.length ? 
      (currentTaskCards.map((task:TaskCardInfo) => (<TaskCard {...task} editForm={(task:TaskCardInfo) => editForm(task)}/>)))  :  <TaskCardEmpty/>}
      <Button onClick={() => setIsOpen(true)}>ADD</Button>
      <TaskCardForm 
        parentKanbanID={kanban.kanbanID||''} 
        isOpen={isOpen}
        isEdit={isEdit}
        preEditTask={editTask}
        changeIsOpen={(open:boolean) => setIsOpen(open)}/>
    </Grid.Column>
  </div>
  )
};

export const KanbanEmpty: FC = () =>(
  <Container className='kanban-empt' textAlign='center'>    
      Kanban is none<br/>
      Please create new Kanban
  </Container>
);

