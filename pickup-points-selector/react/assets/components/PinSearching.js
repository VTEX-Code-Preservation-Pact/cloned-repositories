import React, { PureComponent } from 'react'
import styles from '../../components/Geolocation.css'

class PinSearching extends PureComponent {
  render() {
    return (
      <svg
        className={`pkpmodal-locating-image-searching-pin ${
          styles.locatingImageSearchingPin
        }`}
        height="96px"
        version="1.1"
        viewBox="0 0 67 96"
        width="67px"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M33.3333333,0 C14.9285714,0 0,14.9825301 0,33.4538153 C0,58.5441767 33.3333333,95.5823293 33.3333333,95.5823293 C33.3333333,95.5823293 66.6666667,58.5441767 66.6666667,33.4538153 C66.6666667,14.9825301 51.7380952,0 33.3333333,0 Z M33.3333333,45.4016064 C26.7619048,45.4016064 21.4285714,40.048996 21.4285714,33.4538153 C21.4285714,26.8586345 26.7619048,21.5060241 33.3333333,21.5060241 C39.9047619,21.5060241 45.2380952,26.8586345 45.2380952,33.4538153 C45.2380952,40.048996 39.9047619,45.4016064 33.3333333,45.4016064 Z"
          fill="#368DF7"
        />
      </svg>
    )
  }
}

export default PinSearching
