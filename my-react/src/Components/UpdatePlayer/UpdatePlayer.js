import { useParams, useHistory } from "react-router";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

class UpdatePlayer extends React.Component {
  state = {
    players: null,
    player: null,
  };

  componentDidMount(props) {
    Axios.get("http://localhost:5050/api/read")
      .then((response) => {
        this.setState({
          players: response.data.data,
          player: response.data.data.find((player) => player._id === this.props.match.params.id),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate() {
    console.log(this.state.player);
  }

  ButtonClick = async (props) => {
    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const stage = document.querySelector("#stage").value;
    const level = document.querySelector("#level").value;

    const DataPassing = {
      url: "http://localhost:5050/api/update",
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        username: username,
        email: email,
        stage: stage,
        level: level,
      }),
    };
    Axios(DataPassing)
      .then(this.props.history.push("/"))
      .catch((err) => console.log(err));
  };

  onTodoChange(email, stage, level) {
    this.setState({
      player: {
        email: email,
        stage: stage,
        level: level,
      },
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col lg="3">
            <box>
              username
              <input
                type="text"
                name="username"
                id="username"
                value={this.state.player === null ? null : this.state.player.username}
                disabled="disabled"
              />
            </box>
            <box>
              email
              <input
                type="text"
                name="email"
                id="email"
                value={this.state.player === null ? null : this.state.player.email}
                onChange={(e) => this.onTodoChange(e.target.email)}
              />
            </box>
            <box>
            stage
              <select
                id="stage"
                name="stage"
                value={this.state.player === null ? null : this.state.player.stage}
                onChange={(e) => this.onTodoChange(e.target.stage)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>``` `
              </select>
            </box>
            <box>
              level
              <input
                type="text"
                name="level"
                id="level"
                value={this.state.player === null ? null : this.state.player.level}
                onChange={(e) => this.onTodoChange(e.target.level)}
              />
            </box>
            <button type="submit" className="btn btn-primary" onClick={this.ButtonClick}>
              Update
            </button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UpdatePlayer;
