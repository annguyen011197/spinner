import React from 'react';
import './App.css';
import playbutton from './right-arrow.png'
import settingbutton from './settings-gears.png'
import Draggable from 'react-draggable';
import RandomSpiner from './cpn/RandomSpiner';
import Modal from 'react-modal';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      spinner: [],
      refs: [],
    }
    this.playSpinner = this.playSpinner.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.openModal = this.openModal.bind(this)
    this.widthField = React.createRef()
    this.heightField = React.createRef()
  }

  getStyle(width, height) {
    return {
      backgroundColor: 'white',
      minWidth: width,
      minHeight: height
    }
  }

  loadSpinner(width, height) {
    console.log(`loadSpinner ${width} ${height}`)
    var spinner = []
    var refs = []
    var ref = React.createRef()
    spinner.push(<Draggable
      bounds="body"
    >
      <div className="drag" style={this.getStyle(width, height)}>
        <RandomSpiner
          items={["TOÁN", "LÝ", "HÓA", "VĂN", "KHÔNG CHUYÊN", "ĐỊA", "SINH", "TIN"]}
          ref={ref}
        />
      </div>
    </Draggable>)
    refs.push(ref)

    var ref = React.createRef()
    spinner.push(<Draggable
      bounds="body"
    >
      <div className="drag" style={this.getStyle(width, height)}>
        <RandomSpiner
          items={["10", "11", "12"]}
          ref={ref}
        />
      </div>
    </Draggable>)
    refs.push(ref)

    var ref = React.createRef()
    var stt = Array(35).fill(1).map((_, index) => `${index + 1}`)
    console.log(stt)
    spinner.push(<Draggable
      bounds="body"
    >
      <div className="drag" style={this.getStyle(width, height)}>
        <RandomSpiner
          items={stt}
          ref={ref}
        />
      </div>
    </Draggable>)
    refs.push(ref)

    this.setState({
      spinner: spinner,
      refs: refs
    })
  }

  componentWillMount() {
    this.loadSpinner(100, 100)
  }

  playSpinner() {
    this.state.refs.forEach(spinner => spinner.current.play())
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    })
  }

  closeModal() {
    let width = Number(this.widthField.current.value)
    let height = Number(this.heightField.current.value)
    this.setState({
      modalIsOpen: false
    },() => {
      this.loadSpinner(width, height)
    })
  }

  render() {
    const { modalIsOpen } = this.state;
    return (
      <div className="App">
        {this.state.spinner}
        <Draggable>
          <button className="button"
            onClick={this.playSpinner}
          >
            <img src={playbutton} />
          </button>
        </Draggable>
        <button className="setting"
          onClick={this.openModal}
        >
          <img src={settingbutton} />
        </button>
        <Modal
          isOpen={modalIsOpen}
          contentLabel="Example Modal"
          style={{
            overlay: {
              top: '40%',
              right: '40%',
              left: '40%',
              bottom: '40%'
            }
          }}
        >
          <div className="modal">
            <div className="line">
              <p>width:</p>
              <input ref={this.widthField} type="number" min="100" />
            </div>
            <div className="line">
              <p>height:</p>
              <input ref={this.heightField} type="number" min="100" />
            </div>
            <button onClick={this.closeModal}>close</button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;
