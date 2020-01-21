import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Alert } from "react-bootstrap";
import datahandler from "../dataHandler";
import { IGlobalState } from '..';

type P = {
  changeGlobalState: (newState: Partial<IGlobalState>) => void,
}

type S = {
  error: Error,
  lessonIdInput: string,
  studentInput: string,
}

class Page extends Component<P, S> {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      error: null,

      lessonIdInput: "chemistry",
      studentInput: "Jon Doe",
    };
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  async handleSubmit(event) {
    const { changeGlobalState } = this.props;

    event.preventDefault();

    const {
      lessonIdInput,
      studentInput,
    } = this.state;

    try {
      const newSessionData = await datahandler.createNewSession({
        lessonId: lessonIdInput,
        playerName: studentInput,
      })
      changeGlobalState({
        gameSessionData: newSessionData,
      });
      // @ts-ignore WithRouterStatics
      this.props.history.push(`/asteroidGame`);
    } catch (error) {
      this.setState({ error });
      console.error(error)
    }
  }

  render() {
    const { lessonIdInput, studentInput, error } = this.state

    return (
      <div className="page">
        <form id="startForm" onSubmit={(event) => this.handleSubmit(event)}>
          <label>Lesson Id (provided by teacher):</label>
          <input name="lessonIdInput" value={lessonIdInput} type="text" required onChange={this.handleInputChange} />
          <label>Your name:</label>
          <input name="studentInput" value={studentInput} type="text" required onChange={this.handleInputChange} />
          <input id="startFormSubmit" type="submit" value="Start!" />
        </form>
        {error &&
          <Alert variant="danger">{error.message}</Alert>
        }
      </div>
    )
  }
}

export default withRouter(Page);