/**
 *
 * PriorityList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PriorityList extends React.Component {
  static propTypes = {
    priorities: PropTypes.object.isRequired,
    priority: PropTypes.number.isRequired,
    tasks: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedRow: null,
    };
    this.icons = {
      Add: () => <FontAwesomeIcon icon={['fas', 'plus-circle']} />,
      Edit: () => <FontAwesomeIcon icon={['fas', 'edit']} />,
      Delete: () => <FontAwesomeIcon icon={['fas', 'trash']} />,
      Check: () => <FontAwesomeIcon icon={['fas', 'check-circle']} />,
      Promote: () => <FontAwesomeIcon icon={['fas', 'arrow-circle-up']} />,
      Demote: () => <FontAwesomeIcon icon={['fas', 'arrow-circle-down']} />,
      Uncheck: () => <FontAwesomeIcon icon={['fas', 'times-circle']} />,
      Clear: () => <FontAwesomeIcon icon={['fas', 'times']} />,
      Cancel: () => <FontAwesomeIcon icon={['fas', 'times']} />,
      ResetSearch: () => <FontAwesomeIcon icon={['fas', 'times']} />,
      Search: () => <FontAwesomeIcon icon={['fas', 'search']} />,
      Filter: () => <FontAwesomeIcon icon={['fas', 'filter']} />,
      SortArrow: () => <FontAwesomeIcon icon={['fas', 'sort']} />,
      FirstPage: () => <FontAwesomeIcon icon={['fas', 'fast-backward']} />,
      LastPage: () => <FontAwesomeIcon icon={['fas', 'fast-forward']} />,
      NextPage: () => <FontAwesomeIcon icon={['fas', 'step-forward']} />,
      PreviousPage: () => <FontAwesomeIcon icon={['fas', 'step-backward']} />,
    };
  }

  render() {
    return (
      <MaterialTable
        title={this.props.priorities[this.props.priority]}
        style={{
          fontSize: 10,
        }}
        icons={this.icons}
        columns={[
          {
            title: 'Task',
            field: 'task',
            type: 'string',
            initialEditValue: '',
            searchable: true,
          },
          {
            title: 'Age',
            field: 'timestamp',
            type: 'datetime',
            editable: 'never',
            filtering: false,
            readonly: true,
            render: rowData => moment(rowData.timestamp).fromNow(true),
          },
        ]}
        data={this.props.tasks.filter(
          rowData => rowData.priority === this.props.priority,
        )}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const { data } = this.state;
                  data.push(newData);
                  this.setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const { data } = this.state;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  this.setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const { data } = this.state;
                  const index = data.indexOf(oldData);
                  data.splice(index, 1);
                  this.setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            }),
        }}
        onRowSelected={(evt, selectedRow) => this.setState({ selectedRow })}
        actions={[
          {
            icon: this.icons.Promote,
            tooltip: 'Promote Task',
            isFreeAction: false,
            onClick: event => alert('You want to promote task'),
          },
          {
            icon: this.icons.Demote,
            tooltip: 'Demote Task',
            isFreeAction: false,
            onClick: event => alert('You want to demote task'),
          },
          {
            icon: this.icons.Check,
            tooltip: 'Mark Task as Complete',
            isFreeAction: false,
            onClick: event => alert('You want to mark task as complete'),
          },
          {
            icon: this.icons.Uncheck,
            tooltip: 'Mark Task as Pending',
            isFreeAction: false,
            onClick: event => alert('You want to mark task as pending'),
          },
          {
            icon: this.icons.Delete,
            tooltip: 'Delete Task',
            isFreeAction: false,
            onClick: event => alert('You want to delete task'),
          },
        ]}
        options={{
          sorting: true,
          filtering: true,
          selection: true,
          search: true,
          cellStyle: {
            fontSize: 12,
            color: 'black',
          },
          rowStyle: rowData => ({
            backgroundColor:
              this.state.selectedRow &&
              this.state.selectedRow.tableData.id === rowData.tableData.id
                ? 'silver'
                : 'none',
          }),
          headerStyle: {
            fontSize: 16,
            backgroundColor: 'none',
            color: 'darkGray',
          },
        }}
      />
    );
  }
}

export default PriorityList;
