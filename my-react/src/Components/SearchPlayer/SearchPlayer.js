import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import Axios from "axios";
import PlayerCard from "../Player/PlayerCard/PlayerCard";

class SearchPlayer extends React.Component {
  state = {
    players: null,
  };

  ButtonClick = async () => {
    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const stage = document.querySelector("#stage").value;
    const level = document.querySelector("#level").value;

    const DataPassing = {
      url: "http://localhost:5050/api/find",
      method: "post",
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

    Axios(DataPassing).then((res) => {
      this.setState({
        players: res.data.data,
      });
    });
    console.log(this.state.players);
  };

  render() {
    return (
      <Container>
        <Row>
          <Col lg="4">
            <h1>Search Player</h1>
            <p style={{ color: "red" }}>Find player based on username, email, stage, or level</p>
            <box>
              username
              <input type="text" name="username" id="username" />
            </box>
            <box>
              email
              <input type="text" name="email" id="email" />
            </box>
            <box>
            stage
              <select id="stage" name="stage">
                <option value="">Choose stage...</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </box>
            <box>
              level
              <input type="text" name="level" id="level" />
            </box>
            <button className="btn btn-primary" onClick={this.ButtonClick}>
              Submit
            </button>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col lg="4">
            {this.state.players === null
              ? null
              : this.state.players.map((player, i) => {
                  return (
                    <PlayerCard
                      key={i}
                      uid={player._id}
                      username={player.username}
                      email={player.email}
                      stage={player.stage}
                      level={player.level}
                    />
                  );
                })}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SearchPlayer;
