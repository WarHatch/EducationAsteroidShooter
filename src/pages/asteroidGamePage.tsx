import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Alert } from "react-bootstrap";
import { ISession } from "../dataHandler";
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

  componentDidMount() {
    // set global session var
    // @ts-ignore
    window.session = this.props.gameSessionData;

    if (this.state.error == null) {
      // render game on <div id="game" />
      new Game();
      // Must be created after game exists
      var newScript = document.createElement("script");
      newScript.src = "http://localhost:8090/bundle.js";
      const spawnedScript = document.body.appendChild(newScript);
      this.setState({ spawnedScript })
    }
  }

  componentWillUnmount() {
    // window.session = undefined;

    // const scriptElement = this.state.spawnedScript;
    // try {
    //   scriptElement.parentElement.removeChild(scriptElement);
    // } catch (error) {
    //   console.warn("Unable to remove script element");
    // }
    // Forces a reload. // TODO: Maybe there's a better way to stop the scripts?
    window.stop();
  }

  renderGameElements() {
    const { sessionId } = this.props.gameSessionData;
    return (
      <>
        {/* <span>{`session Id: ${sessionId}`}</span> */}
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