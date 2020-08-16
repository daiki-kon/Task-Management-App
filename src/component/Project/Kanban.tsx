import React,{ FC, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { KanbanInfo, TaskCardInfo} from '../../DefineInfo'
import { deleteKanban } from '../../actions/kanban'
import { taskCardAdd, taskCardDeleteAll, taskCardEdit } from '../../actions/TaskCard'
import { storeData } from '../../reducer'
import { TaskCardForm, TaskCard,TaskCardEmpty } from './TaskCard' 

import { Button, Grid, Icon, Container} from 'semantic-ui-react'
import './Kanban.css'

const initKanbanProps: KanbanInfo = {
  parentProjectID: '',
  kanbanID: '',
  kanbanTitle: '',
  taskCards:[]
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
  const kanbans = useSelector((state:storeData) => state.kanbans); 
  const user = useSelector((state:storeData) => state.user); 

  const kanbanIndex: number =  kanbans.items.findIndex((kanbanP:KanbanInfo) => kanbanP.kanbanID === kanban.kanbanID);

  const currentTaskCards: TaskCardInfo[]  = kanbans.items[kanbanIndex].taskCards;

  const editForm = (preEditTask: TaskCardInfo) =>{
    setIsOpen(true);
    setIsEdit(true);
    setEditTask(preEditTask)
  }

  const kanbanClose = () => {
    dispatch(taskCardDeleteAll(kanban.kanbanID || ''));
    dispatch(deleteKanban.start({userName: user.userName, parentProjectID: kanban.parentProjectID, deleteKanbanIDs:[kanban.kanbanID || '']}))
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
      (currentTaskCards.map((task:TaskCardInfo) => (<TaskCard key={task.taskCardID} {...task} editForm={(task:TaskCardInfo) => editForm(task)}/>)))  :  <TaskCardEmpty/>}
      <Button onClick={() => {setIsOpen(true); setIsEdit(false); setEditTask(initTask)}}>ADD</Button>
      <TaskCardForm 
        parentProjectID={kanban.parentProjectID}
        parentKanbanID={kanban.kanbanID} 
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

