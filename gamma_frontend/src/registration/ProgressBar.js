import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    root: {
        height: 7
    },
    colorSecondary: {
        backgroundColor: "#aaaaaa"
    }
});

const ProgressBar = ({ progress }) => {
    const classes = useStyles();

    return (
        <LinearProgress classes={{ ...classes }}
                        color="secondary"
                        variant="determinate"
                        value={progress}></LinearProgress>
    );
};

export default ProgressBar;