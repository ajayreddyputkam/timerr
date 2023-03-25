// Write your code here
import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {isTimerRunning: false, totalSeconds: 0}

  incrementSeconds = () => {
    this.setState(prevState => ({totalSeconds: prevState.totalSeconds + 1}))
  }

  startTimer = () => {
    const {isTimerRunning} = this.state

    if (!isTimerRunning) {
      this.intervalId = setInterval(() => {
        this.incrementSeconds()
      }, 1000)

      this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
    }
  }

  stopTimer = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning) {
      clearInterval(this.intervalId)
      this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
    }
  }

  resetTimer = () => {
    const {isTimerRunning} = this.state
    clearInterval(this.intervalId)
    if (isTimerRunning) {
      this.setState(prevState => ({
        isTimerRunning: !prevState.isTimerRunning,
        totalSeconds: 0,
      }))
    } else {
      this.setState({totalSeconds: 0})
    }
  }

  getMinutes = () => {
    const {totalSeconds} = this.state
    const minutes = Math.floor(totalSeconds / 60)
    if (minutes <= 9) {
      return `0${minutes}`
    }
    return minutes
  }

  getSeconds = () => {
    const {totalSeconds} = this.state
    const seconds = Math.floor(totalSeconds % 60)
    if (seconds <= 9) {
      return `0${seconds}`
    }
    return seconds
  }

  render() {
    const stringifiedMinutes = this.getMinutes()
    const stringifiedSeconds = this.getSeconds()

    return (
      <div className="bg-container">
        <div className="main-container">
          <h1 className="heading">Stopwatch</h1>
          <div className="card">
            <div className="timer-heading-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
                className="watch-image"
              />
              <h1 className="timer-heading">Timer</h1>
            </div>
            <h1 className="timer">
              {stringifiedMinutes}:{stringifiedSeconds}
            </h1>
            <div className="buttons-container">
              <button
                type="button"
                className="start-button"
                onClick={this.startTimer}
              >
                Start
              </button>
              <button
                type="button"
                className="stop-button"
                onClick={this.stopTimer}
              >
                Stop
              </button>
              <button
                type="button"
                className="reset-button"
                onClick={this.resetTimer}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
