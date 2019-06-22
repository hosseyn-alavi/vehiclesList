import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import VehicleList from "../vehicleList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={()=><VehicleList />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
