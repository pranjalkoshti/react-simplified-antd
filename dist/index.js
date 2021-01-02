import React, { Component, Fragment } from "react";

class TimerSegment extends Component {
  leadingZero(num) {
    return num < 10 ? "0" + num : num;
  }

  getTimeUntil(deadline) {
    const time = Date.parse(deadline) - Date.parse(new Date());

    if (time < 0) {
      this.setState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });
    } else {
      const seconds = Math.floor(time / 1000 % 60);
      const minutes = Math.floor(time / 1000 / 60 % 60);
      const hours = Math.floor(time / (1000 * 60 * 60) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      this.setState({
        days,
        hours,
        minutes,
        seconds
      });
    }
  }

  constructor(props) {
    super(props);
    this.defaultDate = new Date(new Date().setDate(new Date().getDate() + 1));
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      deadline: this.props.date ? this.props.date : this.defaultDate // deadline: this.props.date ? this.props.date : "April, 6, 2019"

    };
  }

  componentDidMount() {
    setInterval(() => this.getTimeUntil(this.state.deadline), 1000);
  }

  render() {
    const {
      days,
      hours,
      minutes,
      seconds
    } = this.state;
    let counterStyle = this.props.counterStyle ? this.props.counterStyle : {};
    let timerStyle = this.props.timerStyle ? this.props.timerStyle : {};
    let labelStyle = this.props.labelStyle ? this.props.labelStyle : {};
    return /*#__PURE__*/React.createElement("div", {
      style: timerStyle
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0px',
        textAlign: 'center',
        height: '100%',
        background: 'none'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        color: labelStyle.color ? labelStyle.color : 'grey',
        marginBottom: '0px'
      }
    }, "STARTS IN"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("h1", {
      className: "timer-counter",
      style: counterStyle
    }, this.leadingZero(days)), /*#__PURE__*/React.createElement("p", {
      style: labelStyle
    }, "Days")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("h1", {
      className: "timer-counter",
      style: counterStyle
    }, this.leadingZero(hours)), /*#__PURE__*/React.createElement("p", {
      style: labelStyle
    }, "Hours")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("h1", {
      className: "timer-counter",
      style: counterStyle
    }, this.leadingZero(minutes)), /*#__PURE__*/React.createElement("p", {
      style: labelStyle
    }, "Minutes")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("h1", {
      className: "timer-counter",
      style: counterStyle
    }, this.leadingZero(seconds)), /*#__PURE__*/React.createElement("p", {
      style: labelStyle
    }, "Seconds")))));
  }

}

export default TimerSegment;