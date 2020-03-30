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
import Grid from '@material-ui/core/Grid';

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
      <Grid item xs={12} sm={6}>
        <PriorityList
          priority={4}
          priorityMap={props.priorityMap}
          tasks={props.tasks}
        />
        <PriorityList
          priority={3}
          priorityMap={props.priorityMap}
          tasks={props.tasks}
        />
        <PriorityList
          priority={2}
          priorityMap={props.priorityMap}
          tasks={props.tasks}
        />
        <PriorityList
          priority={1}
          priorityMap={props.priorityMap}
          tasks={props.tasks}
        />
      </Grid>
    </div>
  );
}

Taskit.propTypes = {
  tasks: PropTypes.array.isRequired,
  priorityMap: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tasks: makeSelectTasks(),
  priorityMap: makeSelectPriorities(),
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
