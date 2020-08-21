import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import './BoxCarousel.css' 
import DefaultCard from './Card'

export default class BoxCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      slideLeft: false,
      slideRight: false,
      cur: 0,
      sliding: false,
      keydown: false,
      translateZ: 90
    };
    
    this.boxCarousel = React.createRef()
  }

  prev = () => {
    if (!this.canSlidePrev()) return 

    const cur = this.state.cur - 1
    this.setState({cur})
  }

  next = () => {
    if (!this.canSlideNext()) return 

    const cur = this.state.cur + 1
    this.setState({cur})

    let onEnding = this.state.cur === this.props.items.length - 3
    if (onEnding) {
      this.props.getMoreItems()
    }
  }

  canSlidePrev = () => {
    let endOfLeft = this.state.cur === 0
    let sliding = this.state.sliding
    if (endOfLeft || sliding) return false 
    return true
  }
  canSlideNext = () => {
    let endOfRight = this.state.cur === this.props.items.length - 1
    let sliding = this.state.sliding
    if (endOfRight || sliding) return false 
    return true
  }

  handleKeyDown = (event) => {
    if(event.key === 'ArrowLeft'){
      this.prev();
    }
    if(event.key === 'ArrowRight'){
      this.next();
    }
  }
  handleKeyUp = (e)=> {
    // this.setState({keydown: false})
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
    document.addEventListener('keyup', this.handleKeyUp, false);

    this.setState({translateZ: this.boxCarousel.current.offsetWidth / 2})

    this.boxCarousel.current.addEventListener('transitionstart', () => {
      this.setState({sliding: true})
    })
    this.boxCarousel.current.addEventListener('transitionend', () => {
      this.setState({sliding: false})
    })
  }

  render() {
    const {translateZ, cur} = this.state
    const {items, Card, speed, transitionTimingFunction} = this.props
    const carouselStyle = {
      transition:` transform ${speed/1000}s`,
      transitionTimingFunction: transitionTimingFunction,
    }

    return (
      <div id="hungfBoxCarousel" ref={this.boxCarousel}>
        <div className="carousel"  style={{
              transform: ` translateZ(${-translateZ}px)`
            }}>
          {
            items.map((o, i) => {
              if (Math.abs(cur - i) > 2) return
              let zIndex = Math.abs(cur - i) <= 1 ? 1 : 0
              return (
                <div 
                  key = {i}
                  className="carousel__cell" 
                  style={{
                    ...carouselStyle,
                    transform: `rotateY(${(i-cur) * 90}deg) translateZ(${translateZ}px)`, 
                    zIndex: zIndex 
                  }}
                  >
                    <Card item={o} index={i}></Card>
                  </div>
                  )
            })
          }
        </div>
      </div>
    )
  }
}

// BoxCarousel.propTypes = {
//   items: PropTypes.element.isRequired,
//   Card: propTypes.element.isRequired,
// }

BoxCarousel.defaultProps = {
  items: [0, 1, 2, 3, 4, 5, 6, 7],
  Card: DefaultCard,
  auto: false,
  speed: 400,
  transitionTimingFunction: "ease-in-out"
}