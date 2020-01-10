import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Alert } from "react-bootstrap";
import datahandler, { ISession } from "../dataHandler";
import Game from "../game/game";

type P = {
  gameSessionData: ISession,
}

type S = {
  error: Error,
}

class Page extends Component<P, S> {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  componentDidMount() {
    // create game
    new Game();
  }

  render() {
    const { error } = this.state
    const { sessionId } = this.props.gameSessionData;

    return (
      <div className="page">
        {error &&
          <Alert variant="danger">{JSON.stringify(error)}</Alert>
        }
        <span>{`session Id: ${sessionId}`}</span>
      </div>
    )
  }
}

export default withRouter(Page);