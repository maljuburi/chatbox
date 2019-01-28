import React, { Component } from "react";
import typingSVG from "../typing.svg";
import io from "socket.io-client";

class Chat extends Component {
  state = {
    msgs: [],
    username: "",
    socket: null,
    err: false,
    typingTimer: null,
    typing: { username: "", isActive: false },
    doneTyping: 5000
  };

  componentDidMount() {
    if (this.props.location.state === undefined) {
      window.location = "/";
    } else if (this.props.location.state.username === "") {
      window.location = "/";
    }

    this.setState({ username: this.props.location.state.username });
    this.initSocket();
  }

  initSocket = () => {
    const socket = io.connect("https://maljuburi-chat.herokuapp.com");
    this.setState({ socket });
  };

  handleSend = e => {
    e.preventDefault();
    if (e.target.chatbox.value === "") {
      this.setState({ err: true });
      return;
    }

    const { socket } = this.state;
    const msgs = [...this.state.msgs];
    socket.emit("chat", {
      msg: e.target.chatbox.value,
      username: this.state.username
    });

    socket.on("chat", data => {
      msgs.unshift(data);
      this.setState({ msgs });
    });

    e.target.chatbox.value = "";
  };

  handleRead = e => {
    const { socket } = this.state;
    socket.emit("typing", {
      username: this.state.username,
      isActive: true
    });

    socket.on("typing", data => {
      const typing = { ...this.state.typing };
      typing.username = data.username;
      typing.isActive = data.isActive;
      this.setState({ typing, err: false });
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 my-5">
            <h3 className="text-muted text-center">CHAT BOX</h3>
            <hr />
            <h6>Welcome {this.state.username}</h6>
            {this.state.typing.isActive && (
              <div>
                <small className="text-muted">
                  {this.state.typing.username + " is"}
                </small>
                <img src={typingSVG} alt="typing" />
              </div>
            )}
            {this.state.err && (
              <div className="alert alert-danger">
                <small>Box is empty!</small>
              </div>
            )}
            <form onSubmit={e => this.handleSend(e)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onInput={e => this.handleRead(e)}
                  name="chatbox"
                  placeholder="Type a message"
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </div>
            </form>
            <hr />
            {this.state.msgs.length > 0 &&
              this.state.msgs.map((data, i) => (
                <div className="w-100 my-2" key={i}>
                  <div
                    className={`shadow-sm rounded p-1 px-2 text-left ${
                      this.state.username === data.username
                        ? "bg-dark text-light"
                        : "bg-light text-dark"
                    }`}
                  >
                    <span className="badge badge-warning mr-2">
                      {data.username}
                    </span>
                    <span>{data.msg}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
