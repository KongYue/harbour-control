import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const Boat = props => {
  const classes = makeStyles({

    root: {
      width: "150px",
      height: "150px",
      backgroundColor: "lightblue",
      border: "1px yellow solid",
      transition: props.boatTransition,
    },

  })();

  return (
    <div className={`${classes.root} boat`}>
      <span>{props.boatType}</span> <br></br>
        <span>Speed is {props.boatSpeed}km/hour</span>
   </div>
      );
  };
  
Boat.propTypes = {

      };
      
export default Boat;