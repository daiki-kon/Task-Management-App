import React,{ FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import marked from "marked";
import highlightjs from "highlight.js";
import { KanbanInfo, TaskCardInfo} from '../../DefineInfo'
import { taskCardAdd, taskCardDeleteAll, taskCardEdit } from '../../actions/TaskCard'
import { postTaskCard, putTaskCard } from '../..//actions/kanban'
import { storeData } from '../../reducer'
import { Button, Card , Modal, Header, Grid, Icon, Form, Label, TextArea, Message, Container, Segment, Divider} from 'semantic-ui-react'
import './TaskCard.css'
import { postProject } from '../../actions/Projects';
import { prependListener } from 'process';


type TaskCardProps = TaskCardInfo & {editForm: (preEditTask:TaskCardInfo) => void}

const markdownToHtml = (markdown: string): string => {
  marked.setOptions({
    highlight: function(code, lang) {
      return highlightjs.highlightAuto(code, [lang]).value;
    },               
    pedantic: false, 
    gfm: true,       
    breaks: true,    
    silent: false    
  });

  return marked(markdown)
}

export const TaskCard: FC<TaskCardProps> = (
  task
) => {

  let html = markdownToHtml(task.content)

  return(
    <Card className="todo-card" onClick={() => task.editForm(task)}>
      <Card.Content>
        <span dangerouslySetInnerHTML={{__html: html}}></span>
      </Card.Content>
    </Card>
  )
}

export const TaskCardEmpty: FC = () => {
  return(
    <Card className="todo-card">
      <Card.Content>
          <Card.Header>Task is None</Card.Header>
      </Card.Content>
    </Card>
  )
}

interface TaskCardFormProps{
  parentProjectID: string;
  parentKanbanID: string;
  isOpen: boolean;
  isEdit: boolean;
  preEditTask?: TaskCardInfo;
  changeIsOpen: (open: boolean) => void;
}

export const TaskCardForm: FC<TaskCardFormProps> = ({
  parentProjectID,
  parentKanbanID,
  isOpen,
  isEdit,
  preEditTask,
  changeIsOpen,
}) =>{

  const dispatch = useDispatch();
  const user = useSelector((state:storeData) => state.user);


  const [preContent,setPreContent] = useState('');
  const [postContent,setPostContent] = useState('');

  useEffect(() => { 
    if(isEdit === true){
      setPreContent(preEditTask?.content || '')

      const html = markdownToHtml(preEditTask?.content || '')
    
      setPostContent(html);
    }else{
    setPreContent('')
    }
  }, [isOpen, preEditTask]);

  
  const taskCardCancel = () =>{
    setPreContent('');
    setPostContent('')
    changeIsOpen(false);
  }

  const taskCardSave = () => {
    changeIsOpen(false)
    if (isEdit === true){
      dispatch(putTaskCard.start({ userName: user.userName, parentProjectID: parentProjectID, kanbanID: parentKanbanID, taskID: preEditTask?.taskCardID || '', taskContent: preContent}));
    }else{
      dispatch(postTaskCard.start({userName: user.userName, parentProjectID: parentProjectID, kanbanID: parentKanbanID, taskContent: preContent }));
    }
    setPreContent('');
    setPostContent('')
  }

  const handleChange = (preContent: string) =>{
    setPreContent(preContent) 

    let html = markdownToHtml(preContent)

    setPostContent(html);
  }

  return(
    <div>
      <Modal
        open={isOpen}
        closeOnDimmerClick={false} 
        size={'large'}
      >
        <Header icon='archive' content='Enter with markdown'/>
        <Modal.Content>
          <Form>
            <Grid columns={2} stackable>
              <Divider vertical>
                <Icon name='angle double right'/>
              </Divider>
              <Grid.Column>
                <Form.Field>
                  <TextArea
                    className='pre-content'
                    onChange={(e) => handleChange(e.currentTarget.value)} 
                    value={preContent}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <span dangerouslySetInnerHTML={{__html: postContent}}></span>
              </Grid.Column>
            </Grid>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => (taskCardCancel())} >
          <Icon name='cancel' /> Cancel
          </Button>
          <Button color='green' onClick={() => (taskCardSave())}>
            <Icon name='checkmark' /> Save
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}