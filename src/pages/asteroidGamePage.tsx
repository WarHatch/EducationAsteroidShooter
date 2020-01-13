import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Alert } from "react-bootstrap";
import datahandler, { ISession } from "../dataHandler";
import Game from "../game/game";
import { createElementFromHtml } from '../helpers';

type P = {
  gameSessionData: ISession,
}

type S = {
  error: Error,
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
    };
  }

  componentDidMount() {
    // set global session var
    // @ts-ignore
    window.session = this.props.gameSessionData;

    document.body.appendChild(createElementFromHtml("<script src='http://localhost:8090/bundle.js' />"));
    // render game on <div id="game" />
    if (this.state.error == null)
      new Game();
  }

  renderGameElements() {
    const { sessionId } = this.props.gameSessionData;
    return (
      <>
        <span>{`session Id: ${sessionId}`}</span>
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