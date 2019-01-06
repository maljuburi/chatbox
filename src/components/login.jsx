import React, { Component } from "react";
import { Link } from "react-router-dom";
class Login extends Component {
  state = {
    username: ""
  };

  handleRead = e => {
    this.setState({ username: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 my-5">
            <h3 className="text-muted text-center">Login to Chat</h3>
            <hr />
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                onInput={this.handleRead}
                name="username"
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <Link
                to={{
                  pathname: "/chat",
                  state: { username: this.state.username }
                }}
                className="btn btn-primary"
              >
                Enter Chat
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
