import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Alert } from "react-bootstrap";
import datahandler from "../dataHandler";

import { v1 } from "uuid";

type S = {
  error: Error,
  lessonIdInput: string,
  studentInput: string,
}

class Page extends Component<{}, S> {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      error: null,

      lessonIdInput: "",
      studentInput: "",
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
    event.preventDefault();

    const {
      lessonIdInput,
      studentInput,
    } = this.state;

    try {
      const placeholderDefaultConfigData = {
        asteroidSecondsToCrash: 12,
        asteroidSpawnPerMinute: 20,
      }
      const newSessionData = await datahandler.createNewSession({
        lessonId: lessonIdInput,
        studentName: studentInput,

        sessionConfigs: [placeholderDefaultConfigData]
      })
      // TODO: send newSessionData to the game page
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
          <Alert variant="danger">{JSON.stringify(error)}</Alert>
        }
      </div>
    )
  }
}

export default withRouter(Page);