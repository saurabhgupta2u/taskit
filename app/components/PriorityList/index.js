/**
 *
 * PriorityList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MaterialTable from 'material-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PriorityList(props) {
  return (
    <MaterialTable
      title={props.priorityMap[props.priority]}
      editable={{
        isEditable: rowData => rowData.name === 'task',
        isDeletable: true,
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {
                /* const data = this.state.data;
                data.push(newData);
                this.setState({ data }, () => resolve()); */
              }
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {
                /* const data = this.state.data;
                const index = data.indexOf(oldData);
                data[index] = newData;
                this.setState({ data }, () => resolve()); */
              }
              resolve();
            }, 1000);
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {
                /* let data = this.state.data;
                const index = data.indexOf(oldData);
                data.splice(index, 1);
                this.setState({ data }, () => resolve()); */
              }
              resolve();
            }, 1000);
          }),
      }}
      columns={[
        { title: 'Status', field: 'status', type: 'boolean' },
        { title: 'Task', field: 'task', type: 'string' },
        { title: 'Age', field: 'timestamp', type: 'datetime' },
      ]}
      data={props.tasks}
      actions={[
        {
          icon: <FontAwesomeIcon icon={['fab', 'plus-circle']} />,
          tooltip: 'Add Task',
          isFreeAction: true,
          onClick: (event) => alert("You want to add a new task")
        },
        {
          icon: <FontAwesomeIcon icon={['fab', 'arrow-circle-up']} />,
          tooltip: 'Promote Task',
          isFreeAction: true,
          onClick: (event) => alert("You want to promote task")
        },
        {
          icon: <FontAwesomeIcon icon={['fab', 'arrow-circle-down']} />,
          tooltip: 'Demote Task',
          isFreeAction: true,
          onClick: (event) => alert("You want to demote task")
        },
        {
          icon: <FontAwesomeIcon icon={['fab', 'check-circle']} />,
          tooltip: 'Mark Task as Complete',
          isFreeAction: true,
          onClick: (event) => alert("You want to demote task")
        },
        {
          icon: <FontAwesomeIcon icon={['fab', 'times-circle']} />,
          tooltip: 'Mark Task as Pending',
          isFreeAction: true,
          onClick: (event) => alert("You want to demote task")
        },
        {
          icon: <FontAwesomeIcon icon={['fab', 'edit']} />,
          tooltip: 'Edit Task',
          isFreeAction: false,
          onClick: (event) => alert("You want to demote task")
        },
        {
          icon: <FontAwesomeIcon icon={['fab', 'trash-alt']} />,
          tooltip: 'Delete Task',
          isFreeAction: false,
          onClick: (event) => alert("You want to demote task")
        },
      ]}
      options={{
        sorting: true,
        filtering: true,
        selection: true,
        search: true,
      }}
    />
  );
}

PriorityList.propTypes = {
  priorityMap: PropTypes.object.isRequired,
  priority: PropTypes.number.isRequired,
  tasks: PropTypes.array.isRequired,
};

export default PriorityList;
