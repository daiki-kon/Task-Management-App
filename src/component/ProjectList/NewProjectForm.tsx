import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectCreate　} from '../../actions/Projects';
import { ProjectInfo } from '../../DefineInfo';
import useReactRouter from 'use-react-router';

import { Button, Form} from 'semantic-ui-react';

const counterSelector = (state:ProjectInfo) => ( {...state} );

export const NewProjectForm: FC = () => {

  const dispatch = useDispatch();
  const { history, location, match } = useReactRouter();

  const submit = (titleP: string, descP: string) => {
    history.push('/');
    dispatch(projectCreate({projectTitle:titleP,projectDesc:descP}));
  }

  const [title, setTitle] = useState('');
  const [desc,setDesc] = useState('')
  
  return (
    <>
      <Form>
        <Form.Field>
          <label>Project Title</label>
          <input type="text" placeholder="ProjectTitle" onChange={(e) => setTitle(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <Form.TextArea type='text' label='Project Description' placeholder='Please Describe This Project...' onChange={(e) => setDesc(e.currentTarget.value)} />
        </Form.Field>
        <Button onClick={() => {submit(title,desc)}}>Create</Button>
      </Form>
    </>
  );
};
