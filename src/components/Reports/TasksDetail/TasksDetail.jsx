import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import EditTaskModal from '../../Projects/WBS/WBSDetail/EditTask/EditTaskModal';
import 'react-table/react-table.css';
import Collapse from 'react-bootstrap/Collapse';
import './TasksDetail.css';

const ShowCollapse = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(!open)} aria-expanded={open}>
        {props.resources.length} ➤
      </Button>

      <div>{props.resources[0].name}</div>

      {props.resources.slice(1).map((resource) => (
        <Collapse in={open}>
          <div key={resource._id} white-space="pre-line" white-space="nowrap" className="new-line">
            {resource.name}
          </div>
        </Collapse>
      ))}
    </div>
  );
};

export const TasksDetail = (props) => {
  let tasksList = [];
  let tasks = [];
  tasks = props.tasks_filter;

  if (props.tasks_filter.length > 0) {

    tasks = ["priority", "status", "classification", "isActive", "isAssigned"].reduce(
      (filteredTask, filter) => {
        return props[filter] ? filteredTask.filter((item) => item[filter] === props[filter]) : filteredTask;
      },
      tasks
    );


    if (props.users) {
      let test = [];
      for (var i = 0; i < tasks.length; i++) {
        for (var j = 0; j < tasks[i].resources.length; j++) {
          if (tasks[i].resources[j].name === props.users) {
            test.push(tasks[i]);
          }
        }
      }
      tasks = test;
    }
  }

  tasksList = tasks.map((task, index) => (
    <div id={'tr_' + task._id} className='tasks-detail-table-row'>
      <div>
        <EditTaskModal
          key={`editTask_${task._id}`}
          parentNum={task.num}
          taskId={task._id}
          wbsId={task.wbsId}
          parentId1={task.parentId1}
          parentId2={task.parentId2}
          parentId3={task.parentId3}
          mother={task.mother}
          level={task.level}
        />
      </div>
      <div>
        <div>{index + 1}</div>
      </div>
      <div>{task.taskName}</div>
      <div>{task.priority}</div>
      <div>{task.status}</div>
      <div>
        {task.resources.length <= 2 ? (
          task.resources.map((resource) => <div key={resource._id}>{resource.name}</div>)
        ) : (
          <ShowCollapse resources={task.resources} />
        )}
      </div>

      <div className="projects__active--input">
        {task.isActive ? (
          <tasks className="isActive">
            <i className="fa fa-circle" aria-hidden="true"></i>
          </tasks>
        ) : (
          <div className="isNotActive">
            <i className="fa fa-circle-o" aria-hidden="true"></i>
          </div>
        )}
      </div>

      <div className="projects__active--input">
        {task.isAssigned ? <div>Assign</div> : <div>Not Assign</div>}
      </div>
      <div className="projects__active--input">{task.classification}</div>
      <div className="projects__active--input">{task.estimatedHours.toFixed(2)}</div>
      <div>{task.startedDatetime}</div>
      <div>{task.dueDatetime}</div>
    </div>
  ));

  return (
    <div>
      <div className="tasks-detail-total">Total: {tasksList.length}</div>
      <div className="tasks-detail-table-head tasks-detail-table-row">
        <div id="projects__order">
          Action
        </div>
        <div id="projects__order">
          #
        </div>
        <div id="projects__active">
          Task
        </div>
        <div id="projects__active">
          Priority
        </div>
        <div id="projects__active">
          Status
        </div>
        <div>Resources</div>
        <div id="projects__active">
          Active
        </div>
        <div id="projects__active">
          Assign
        </div>
        <div id="projects__active">
          Class
        </div>
        <div id="projects__active">
          Estimated Hours
        </div>
        <div id="projects__active">
          Start Date
        </div>
        <div id="projects__active">
          End Date
        </div>
      </div>
      <div>{tasksList}</div>
    </div >
  );
};
