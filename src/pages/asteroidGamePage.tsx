import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Alert } from "react-bootstrap";
import { ISession } from "../dataHandler";
import dataHandler from "../dataHandler";
import Game from "../game/game";

type P = {
  gameSessionData: ISession,
}

type S = {
  error: Error,
  spawnedScript: HTMLScriptElement,
}

class Page extends Component<P, S> {
  constructor(props) {
    super(props);

    let error = null;
    if (Boolean(this.props.gameSessionData) === false) {
      error = new Error("Game session was not started")
    }

    this.state = {
      error,
      spawnedScript: undefined,
    };
  }

  async componentDidMount() {
    try {
      const canvasConfig = await dataHandler.getCanvasConfig(window.innerWidth);
      console.log(canvasConfig);

      // set global sessionData for server script to use
      window.session = this.props.gameSessionData;

      if (this.state.error == null) {
        // render game on <div id="game" />
        new Game(canvasConfig);
        // Must be created after game exists
        var newScript = document.createElement("script");
        newScript.src = "http://localhost:8090/bundle.js";
        const spawnedScript = document.body.appendChild(newScript);
        this.setState({ spawnedScript })
      }
    } catch (error) {
      this.setState({ error })
    }
  }

  componentWillUnmount() {
    // window.session = undefined;

    // const scriptElement = this.state.spawnedScript;
    // Forces a reload. // TODO: Maybe there's a better way to stop the scripts?
    window.stop();
  }

  renderGameElements() {
    const { sessionId } = this.props.gameSessionData;
    return (
      <>
        {/* <span>{`session Id: ${sessionId}`}</span> */}
        {/* <span>{`game config: ${sessionConfig}`}</span> */}
        <div id="game" />
      </>
    )
  }

  renderAlert() {
    const { error } = this.state;
    return (
      <>
        <Alert variant="danger">{error.message || JSON.stringify(error)}</Alert>
      </>
    )
  }

  render() {
    const { error } = this.state

    return (
      <div className="page">
        {error ?
          this.renderAlert() :
          this.renderGameElements()
        }
      </div>
    )
  }
}

export default withRouter(Page);