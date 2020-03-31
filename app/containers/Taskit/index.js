/**
 *
 * Taskit
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectTasks, makeSelectPriorities } from './selectors';
import reducer from './reducer';
import saga from './saga';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import PriorityList from 'components/PriorityList';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function Taskit(props) {
  useInjectReducer({ key: 'taskit', reducer });
  useInjectSaga({ key: 'taskit', saga });

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const priorityTabs = (
    Object.keys(props.priorities)
      .sort()
      .map(
        priority => (
          <Tab
            key={`ptab_${props.priorities[priority]}`}
            label={props.priorities[priority]}
          />
        )
      )
  );

  const priorityLists = (
    Object.keys(props.priorities)
      .sort()
      .map(
        priority => (
          <PriorityList
            key={`plist_${props.priorities[priority]}`}
            value={value}
            index={Number(priority)}
            priority={Number(priority)}
            priorities={props.priorities}
            tasks={props.tasks}
          />
        )
      )
  );


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Taskit
          </Typography>
        </Toolbar>
      </AppBar>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
        indicatorColor="primary"
        textColor="primary"
      >
        {priorityTabs}
      </Tabs>
      {priorityLists}
    </div>
  );
}

Taskit.propTypes = {
  tasks: PropTypes.array.isRequired,
  priorities: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tasks: makeSelectTasks(),
  priorities: makeSelectPriorities(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Taskit);
