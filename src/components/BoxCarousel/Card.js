import React, { Component } from 'react'
import './Card.css'

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
    
  }
  render() {
    // console.log('this.props', this.props)
    const {item} = this.props
    const {source} = item
    return (
      <div id="boxCard">
        <div className="header">
          <div className="avatar">
            <img src="https://lh3.googleusercontent.com/ogw/ADGmqu-iIDYssvSJfa_tlBkBTFHH9jfsrNQL15KiM0ao=s32-c-mo" alt="" srcSet=""/>
          </div>
          <div className="name">
            <a href="//fb.me/ProgrammingMemeDaily">Programming Meme</a>
          </div>
        </div>
        <div className="body">
          <div className="text">
            {item.content}
          </div>
          <div className="image">
            <div className="bg-blur" style={{backgroundImage: `url(${item.source.fileUrl})`}}>
            </div>
            <img src={item.source.fileUrl} alt="" srcset=""/>
          </div>
        </div>
        <div className="bottom">
          Share on
        </div>
      </div>
    )
  }
}
