import React, { Component } from 'react';
import HarbourPerimeter from './Components/HarbourPerimeter';
import Boats from './Components/Boats';
class App extends Component {
  state = {
    boats: [
      {
        boatId: 0,
        boatType: "Speedboat",
        boatSpeed: 30,
        isInPerimeter: false,
        isAtDock: false
      },
      {
        boatId: 1,
        boatType: "Sailboat",
        boatSpeed: 15,
        isInPerimeter: false,
        isAtDock: false
      },
      {
        boatId: 2,
        boatType: "Cargoship",
        boatSpeed: 5,
        isInPerimeter: false,
        isAtDock: false
      }
    ],
    perimeterHasShip: false,
    locationDetail: {},
    error: null,
  }
  generateRandomNumber = () => {
    return Math.floor(Math.random() * 3);
  }

  boatId = 3;
  randomGenerateBoat = () => {
    let newboat = "";
    let typeid = this.generateRandomNumber();
    if (typeid === 0) {
      newboat = {
        boatId: this.boatId,
        boatType: "Speedboat",
        boatSpeed: 30,
        isInPerimeter: false,
        isAtDock: false
      };
    } else if (typeid === 1) {
      newboat = {
        boatId: this.boatId,
        boatType: "Sailboat",
        boatSpeed: 15,
        isInPerimeter: false,
        isAtDock: false
      };

    } else if (typeid === 2) {
      newboat = {
        boatId: this.boatId,
        boatType: "Cargoship",
        boatSpeed: 5,
        isInPerimeter: false,
        isAtDock: false
      };

    }
    this.setState(prevState => ({
      boats: [
        ...prevState.boats,
        newboat
      ]
    })
    );
    this.boatId = this.boatId + 1;
  }

  updatelocationDetail = (updatedlocation) => {
    this.setState(prevState => ({
      locationDetail: updatedlocation
    }));
  }

  updatelocationWindSpeed = (windspeed) => {
    this.setState(prevState => ({
      locationDetail: {
        ...prevState.locationDetail,
        windSpeed: windspeed
      }
    }));
  }

  render() {

    return (
      <div>
        <HarbourPerimeter
          locationDetail={this.state.locationDetail}
        />
        <Boats
          randomGenerateBoat={this.randomGenerateBoat}
          generateRandomNumber={this.generateRandomNumber}
          boats={this.state.boats}
          locationDetail={this.state.locationDetail}
          updatelocationDetail={this.updatelocationDetail}
          updatelocationWindSpeed={this.updatelocationWindSpeed}
        />
      </div>
    );
  }
}

App.propTypes = {

};

export default App;
