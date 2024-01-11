import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import times from 'lodash/times'
import isEqual from 'lodash/isEqual'
import Glide from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.min.css'
import '@glidejs/glide/dist/css/glide.theme.min.css'
import Arrow from './../components/Arrow'
import './Slider.css'

class Slider extends Component {
  constructor() {
    super()

    this.state = {
      showSlider: false,
    }
  }

  componentDidMount() {
    if (this.props.isEditingOmnishipping) {
      this.createGlide()
    }
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (isEqual(this.props.children, nextProps.children)) {
      return
    }

    this.setState(
      {
        showSlider: false,
      },
      () => {
        this.createGlide()
      }
    )
  }

  createGlide() {
    const {
      hasAutoplay,
      autoPlaySpeed,
      onSlideChange,
      startAt,
      type,
    } = this.props

    this.setState(
      {
        showSlider: true,
      },
      () => {
        try {
          new Glide('.glide', {
            type,
            focusAt: 'center',
            peek: 34,
            gap: 8,
            autoPlaySpeed,
            autoplay: hasAutoplay,
            startAt,
            onSlideChange,
          }).mount()
        } catch (err) {
          console.log(err)
        }
      }
    )
  }

  render() {
    const {
      arrowColors,
      children,
      hasArrows,
      hasBullets,
      isEditingOmnishipping,
    } = this.props

    return (
      this.state.showSlider &&
      isEditingOmnishipping && (
        <div className="glide-container">
          <div className="glide">
            {hasArrows && (
              <div className="glide__arrows" data-glide-el="controls">
                <button
                  className="glide__arrow glide__arrow--left packages-prev btn btn-link"
                  data-glide-dir="<">
                  <Arrow color={arrowColors} direction="left" />
                </button>
                <button
                  className="glide__arrow glide__arrow--right packages-next btn btn-link "
                  data-glide-dir=">">
                  <Arrow color={arrowColors} />
                </button>
              </div>
            )}

            <div className="glide__track" data-glide-el="track">
              <div className="glide__slides">{children}</div>
            </div>

            {hasBullets && (
              <div className="glide__bullets" data-glide-el="controls[nav]">
                {times(Children.count(children), i => (
                  <button
                    className="glide__bullet"
                    data-glide-dir={`=${i}`}
                    key={i}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )
    )
  }
}

Slider.defaultProps = {
  arrowColors: '#368df7',
  autoPlaySpeed: 2000,
  hasArrows: true,
  hasAutoplay: false,
  hasBullets: true,
  isEditingOmnishipping: true,
  onSlideChange: () => {},
  startAt: 0,
  type: 'slider',
}

Slider.propTypes = {
  arrowColors: PropTypes.string,
  autoPlaySpeed: PropTypes.number,
  children: PropTypes.node.isRequired,
  hasArrows: PropTypes.bool,
  hasAutoplay: PropTypes.bool,
  hasBullets: PropTypes.bool,
  isEditingOmnishipping: PropTypes.bool,
  onSlideChange: PropTypes.func,
  startAt: PropTypes.number,
  type: PropTypes.string,
}

export default Slider
