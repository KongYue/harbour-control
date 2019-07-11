import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Boat from './Boat';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
    },
    boat: {
        width: "50px",
        height: "50px",
        backgroundColor: "lightblue",
        border: "1px yellow solid",
    },
    button: {
        margin: theme.spacing(1),
        position: "absolute",
        right: "3%",
        top: "90%",
    },
    startbutton: {
        margin: theme.spacing(1),
        position: "absolute",
        right: "20%",
        top: "90%",
    }
}));

const Boats = props => {
    const classes = useStyles();
    function calculateTransitionTime(boatSpeed) {
        const length = 10;
        return length / boatSpeed * 3600 / 360;
    }
    function generateTransitionValue(boatSpeed) {
        const time = calculateTransitionTime(boatSpeed);
        const value = "transform " + time + "s";
        return value;
    }

    const createBoats = () => {
        var boats = [];
        props.boats.map((boat, index) => {
            return boats.push(
                <Boat
                    key={boat.boatId}
                    boatType={boat.boatType}
                    boatSpeed={boat.boatSpeed}
                    isInperimeter={boat.isInperimeter}
                    isAtDock={boat.isAtDock}
                    boatTransition={generateTransitionValue(boat.boatSpeed)}
                />
            );
        });
        return boats;
    }
  
 function formateNumber (myNumber) {
    var formattedNumber = ("0" + myNumber).slice(-2);
   return formattedNumber;
 }

 function getDate() {
     let d = new Date();
     let year = d.getFullYear();
     let month = formateNumber(d.getMonth()+1);
     let date = d.getDate();
    let result = `${year}-${month}-${date}`;
     return result;
 }
    function getWindSpeed() {
     return  fetch('/v2/NWFmMjA5MDVlMDA0YzM2NWU5NjVjZm/search.json?lat=-33.833507&lng=151.280347&units=distance:km')
            .then(res => res.json())
            .then(response => {
                 props.updatelocationDetail(response.location);
                return response.location.id;
            })
            .then(
                //locationid => fetch(`/v2/NWFmMjA5MDVlMDA0YzM2NWU5NjVjZm/locations/${locationid}/weather.json?observationalGraphs=wind&startDate=${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`)
                locationid => fetch(`/v2/NWFmMjA5MDVlMDA0YzM2NWU5NjVjZm/locations/${locationid}/weather.json?observationalGraphs=wind&startDate=${getDate()}`)
                .then(res => res.json())
                    .then(res => {
                        // console.log(res.observationalGraphs.wind.dataConfig.series.controlPoints.pre.y);
                        props.updatelocationWindSpeed(res.observationalGraphs.wind.dataConfig.series.controlPoints.pre.y);
                        return res.observationalGraphs.wind.dataConfig.series.controlPoints.pre.y;
                    })
            ) ;
    }


    function checkWhetherBoatPass (boat,windspeed) {
        if (boat.boatType === "Sailboat") {
            if (windspeed < 10 || windspeed > 30) {
                return false;
            }
        }

        return true;
     }

    const numberofboat = props.boats.length;
    const boats = props.boats;
    const triggerStart = () => {
        var promise = new Promise(
            function (resolve, reject) {
                resolve(getWindSpeed());
            }
        );
        promise.then(
            windspeed => {
                if (checkWhetherBoatPass(props.boats[0],windspeed)) {
                    document.getElementsByClassName("boat")[0].style.transform = "translate(0, -50vh)";
                }
                var i = 0;
                function myLoop() {
                    let totaltimecost = calculateTransitionTime(boats[i].boatSpeed);
                    setTimeout(function () {
                        i++;
                        if (i < numberofboat) {
                            if (checkWhetherBoatPass(props.boats[i],windspeed)) {
                                document.getElementsByClassName("boat")[i].style.transform = "translate(0, -50vh)";
                            } else {
                                i++;
                                document.getElementsByClassName("boat")[i].style.transform = "translate(0, -50vh)";
                            }
                            myLoop();
                        }
                    }, totaltimecost * 1000)
                }
                myLoop();

            }
        );
        
    }
    return (
        <div className={classes.root} >
            {createBoats()}
            <Button variant="contained" color="primary" onClick={props.randomGenerateBoat} className={classes.button}>
                Generate Random Boat
            </Button>
            <Button variant="contained" color="secondary" onClick={triggerStart} className={classes.startbutton}>
                Start
            </Button>
        </div>

    );
};

Boats.propTypes = {

};

export default Boats;