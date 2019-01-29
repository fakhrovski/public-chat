import React, { Component, createRef } from 'react'
import './App.css'
import Formulaire from './components/Formulaire';
import Message from './components/Message'

//Firebase
import base from './base'
class App extends Component {
  state = {
    messages: {},
    pseudo: this.props.match.params.pseudo
  }
  messageRef = createRef()
  componentDidMount() {
    base.syncState('/', {
      context: this,
      state: 'messages'
    })
  }
  componentDidUpdate() {
    const ref = this.messageRef.current
    ref.scrollTop = ref.scrollHeight
  }

  addMessage = message => {
    const messages = { ...this.state.messages }
    messages[`message-${Date.now()}`] = message
    Object
      .keys(messages)
      .slice(0, -10)
      .forEach(key => {
        messages[key] = null
      })
    this.setState({ messages })
  }
  isUser = pseudo => pseudo === this.state.pseudo
  render() {
    const messages = Object
      .keys(this.state.messages)
      .map(key => (
        <Message
          key={key}
          isUser={this.isUser}
          message={this.state.messages[key].message}
          pseudo={this.state.messages[key].pseudo} />
      ))
    return (
      <div className='box'>
        <div>
          <div className='messages'
            ref={this.messageRef}>
            <div className='message'>{messages}</div>
          </div>
        </div>
        <Formulaire
          length={100}
          pseudo={this.state.pseudo}
          addMessage={this.addMessage} />
      </div>

    )
  }
}

export default App
