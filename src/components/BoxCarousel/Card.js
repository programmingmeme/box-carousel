import React, { Component } from 'react'

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
    
  }
  render() {
    console.log('this.props', this.props)
    return (
      <div>
        {this.props.index}
      </div>
    )
  }
}
