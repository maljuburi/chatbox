import React, { Component } from "react";
import typingSVG from "./typing.svg";
import "./App.css";

class App extends Component {
  state = {
    msgs: [],
    err: false,
    typingTimer: null,
    typing: false,
    doneTyping: 5000
  };

  handleSend = e => {
    e.preventDefault();
    if (e.target.chatbox.value === "") {
      this.setState({ err: true });
      return;
    }
    const msgs = [...this.state.msgs];
    msgs.push(e.target.chatbox.value);
    this.setState({ msgs });
    e.target.chatbox.value = "";
  };

  handleRead = e => {
    this.setState({ typing: true, err: false });
    clearTimeout(this.state.typingTimer);
    this.setState({
      typingTimer: setTimeout(() => {
        this.setState({ typing: false });
      }, 500)
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 my-5">
            <h3 className="text-muted text-center">CHAT BOX</h3>
            <hr />
            {this.state.typing && <img src={typingSVG} alt="typing" />}
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
              this.state.msgs.map((msg, i) => (
                <div className="w-100 my-1" key={i}>
                  <div className="shadow-sm rounded p-1 px-2 bg-success text-light text-left">
                    {msg}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
