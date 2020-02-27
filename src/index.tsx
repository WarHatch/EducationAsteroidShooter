import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { render } from "react-dom"

import StartPage from "./pages/startPage";
import AsteroidGamePage from "./pages/asteroidGamePage";
import { ISession } from "./dataHandler";

// Define global parameters
declare global {
  interface Window {
    session?: ISession | null;
    htmlCanvas: {
      canvasWidth: number
      canvasHeight: number
    }
    gameEnded: boolean;
  }
}

export type IGlobalState = {
  error: Error,
  gameSessionData: ISession,
}

class App extends React.Component<{}, IGlobalState> {
  constructor(props) {
    super(props);
    
    this.state = {
      error: null,
      gameSessionData: null,
    };

    // bind
    this.changeGlobalState = this.changeGlobalState.bind(this);
  }

  changeGlobalState(newState: Partial<IGlobalState>){
    this.setState((prevState) => ({
      ...prevState,
      ...newState,
    }))
    console.log(this.state);
  }

  render() {
    return (
      <Router>
        <Link to={"/"}> Home </Link>
        <Switch>
          <Route exact path="/">
            <StartPage changeGlobalState={this.changeGlobalState} />
          </Route>
          <Route path="/asteroidGame">
            <AsteroidGamePage gameSessionData={this.state.gameSessionData}/>
          </Route>
          <Route>{"Incorrect URL"}</Route>
        </Switch>
      </Router>
    );
  }
}

render(
  <App />,
  document.getElementById("app")
);