import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    root: {
        height: "50vh",
        backgroundColor: "grey",
        display: 'flex',
        flexDirection: "column",
        justifyContent: "flex-end"
    }
  }));

const HarbourPerimeter = props => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h3>This projec use Willy Weather API to generate real-time speed</h3>
            <h3>Location id: {props.locationDetail.id}</h3>
            <h3>Location Name: {props.locationDetail.name}</h3>
            <h3>Location Wind Speed: {props.locationDetail.windSpeed}</h3>
        </div>
    );
};

HarbourPerimeter.propTypes = {
    
};

export default HarbourPerimeter;