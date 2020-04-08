import React, { Component } from "react"
import { withRouter } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { ISession } from "../dataHandler";
import dataHandler from "../dataHandler";
import Game from "../game/game";
import config from "../config"
import Axios from "axios";
import pickCanvasSize from "./helpers/pickCanvasSize";

type P = {
  gameSessionData: ISession,
}

type S = {
  error: Error,
  spawnedScript: HTMLScriptElement,
}

type IEndSessionData = {
  sessionId: string,
  finishedAt: Date,
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

  async endGame() {
    window.gameEnded = true;
    const { lessonId, sessionId } = this.props.gameSessionData;
    const payload: IEndSessionData = { sessionId, finishedAt: new Date() };
    Axios.post(`${config.gameElementApiURL}/lesson/${lessonId}/session/register/end`, payload);
  }

  async componentDidMount() {
    try {
      const canvasConfig = pickCanvasSize();
      // set global props for server script to use
      window.session = this.props.gameSessionData;
      window.htmlCanvas = {
        canvasWidth: canvasConfig.width,
        canvasHeight: canvasConfig.height,
      }

      if (this.state.error == null) {
        // render game on <div id="game" />
        new Game(canvasConfig);
        // Must be created after Phaser created HTMLcanvas
        var newScript = document.createElement("script");
        newScript.src = config.gameElementApiURL + "/bundle.js";
        const spawnedScript = document.body.appendChild(newScript);
        this.setState({ spawnedScript })
        // FIXME: should load scene here (so optional elements receive CSS)
      }
    } catch (error) {
      this.setState({ error })
    }
  }

  componentWillUnmount() {
    this.endGame();
    // Reset global props set with componentDidMount
    window.session = undefined;
    // Reload window to ensure all processes are stopped
    window.stop();
  }

  renderGameContainer() {
    return (
      <div id="game" />
    )
  }

  renderAlert() {
    const { error } = this.state;
    return (
        <Alert variant="danger">{error.toString()}</Alert>
    )
  }

  render() {
    const { error } = this.state

    return (
      <div className="page">
        {error ?
          this.renderAlert() :
          this.renderGameContainer()
        }
      </div>
    )
  }
}

export default withRouter(Page);