import React from 'react'
import type { ComponentType } from 'react'
import { render } from '@vtex/test-tools/react'

import MediaList from '../MediaList'
import type {
  ImageListSchemaElement,
  MediaListSchemaElement,
  VideoListSchemaElement,
} from '../MediaTypes'

let mockDeviceDetectorReturn = { isMobile: false }

jest.mock('vtex.device-detector', () => ({
  useDevice: jest.fn(() => mockDeviceDetectorReturn),
}))

const MediaListSiteEditor = MediaList as ComponentType<{
  mediaList?: MediaListSchemaElement[]
  height?: number
}>

describe('Using list-context.media-list block via site-editor', () => {
  it('should render an youtube player correctly', () => {
    const mediaList = [
      {
        mediaType: 'video',
        video: 'https://www.youtube.com/watch?v=hT0OMD11b0A',
      },
    ] as VideoListSchemaElement[]

    const { queryByTestId } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    expect(queryByTestId('html5-player')).not.toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).toBeInTheDocument()
  })

  it('should render a vimeo player correctly', () => {
    const mediaList = [
      {
        mediaType: 'video',
        video: 'https://vimeo.com/89404519',
      },
    ] as VideoListSchemaElement[]

    const { queryByTestId } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    expect(queryByTestId('html5-player')).not.toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).toBeInTheDocument()
    expect(queryByTestId('youtube-player')).not.toBeInTheDocument()
  })

  it('should render a HTML5 player correctly', () => {
    const mediaList = [
      {
        mediaType: 'video',
        video: 'http://vtex.com/vtex.mp4',
      },
    ] as VideoListSchemaElement[]

    const { queryByTestId } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    expect(queryByTestId('html5-player')).toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).not.toBeInTheDocument()
  })

  it('should render a HTML5 player using "video" even if "src" is set', () => {
    const video = 'http://vtex.com/vtex-video-url.mp4'
    const src = 'http://vtex.com/vtex-src.mp4'

    const mediaList = [
      {
        mediaType: 'video',
        video,
        src,
      },
    ] as Array<VideoListSchemaElement & { src: string }>

    const { queryByTestId } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    expect(queryByTestId('html5-player')).toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).not.toBeInTheDocument()

    // Checks if the <source> inside <video> has the correct src value
    expect(queryByTestId('html5-player')?.firstElementChild).toHaveAttribute(
      'src',
      video
    )
  })

  it('should render using mobileVideo when browsing through a mobile device', () => {
    mockDeviceDetectorReturn = { isMobile: true }

    const mediaList = [
      {
        mediaType: 'video',
        video: 'https://www.youtube.com/watch?v=hT0OMD11b0A',
        mobileVideo: 'http://vtex.com/vtex.mp4',
      },
    ] as VideoListSchemaElement[]

    const { queryByTestId } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    // Cleaning vtex.device-detector mobile mock
    mockDeviceDetectorReturn = { isMobile: false }

    expect(queryByTestId('html5-player')).toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).not.toBeInTheDocument()
  })

  it('should render using video when browsing through a mobile device and mobileVideo is not set', () => {
    mockDeviceDetectorReturn = { isMobile: true }

    const mediaList = [
      {
        mediaType: 'video',
        video: 'https://www.youtube.com/watch?v=hT0OMD11b0A',
      },
    ] as VideoListSchemaElement[]

    const { queryByTestId } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    // Cleaning vtex.device-detector mobile mock
    mockDeviceDetectorReturn = { isMobile: false }

    expect(queryByTestId('html5-player')).not.toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).toBeInTheDocument()
  })

  it('should render using video when browsing through a desktop device, even if mobileVideo is set', () => {
    const mediaList = [
      {
        mediaType: 'video',
        video: 'https://www.youtube.com/watch?v=hT0OMD11b0A',
        mobileVideo: 'http://vtex.com/vtex.mp4',
      },
    ] as VideoListSchemaElement[]

    const { queryByTestId } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    expect(queryByTestId('html5-player')).not.toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).toBeInTheDocument()
  })

  it('should render a HTML5 player even if "video" is malformed', () => {
    const mediaList = [
      {
        mediaType: 'video',
        // File with no extension
        video: 'vtex',
      },
    ] as VideoListSchemaElement[]

    const { queryByTestId } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    expect(queryByTestId('html5-player')).toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).not.toBeInTheDocument()
  })

  it('should render HTML5, Youtube and Vimeo player', () => {
    const mediaList = [
      {
        mediaType: 'video',
        video: 'http://vtex.com/vtex.mp4',
      },
      {
        mediaType: 'video',
        video: 'https://www.youtube.com/watch?v=hT0OMD11b0A',
      },
      {
        mediaType: 'video',
        video: 'https://vimeo.com/89404519',
      },
    ] as VideoListSchemaElement[]

    const { queryByTestId } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    expect(queryByTestId('html5-player')).toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).toBeInTheDocument()
    expect(queryByTestId('youtube-player')).toBeInTheDocument()
  })

  it('should render an image correctly', () => {
    const image = 'vtex.png'
    const altText = 'vtex-image'

    const mediaList = [
      {
        mediaType: 'image',
        description: altText,
        image,
      },
    ] as ImageListSchemaElement[]

    const { queryByAltText } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', image)
  })

  it('should render an image with default maxHeight if height is not set', () => {
    const DEFAULT_HEIGHT = 420
    const image = 'vtex.png'
    const altText = 'vtex-image'

    const mediaList = [
      {
        mediaType: 'image',
        description: altText,
        image,
      },
    ] as ImageListSchemaElement[]

    const { queryByAltText } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', image)
    expect(queryByAltText(altText)).toHaveStyle(
      `max-height: ${DEFAULT_HEIGHT}px`
    )
  })

  it('should render an image with maxHeight if height is set', () => {
    const image = 'vtex.png'
    const altText = 'vtex-image'
    const height = 300

    const mediaList = [
      {
        mediaType: 'image',
        description: altText,
        image,
      },
    ] as ImageListSchemaElement[]

    const { queryByAltText } = render(
      <MediaListSiteEditor mediaList={mediaList} height={height} />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', image)
    expect(queryByAltText(altText)).toHaveStyle(`max-height: ${height}px`)
  })

  it('should render an image with default width if it is not set', () => {
    const DEFAULT_WIDTH = '100%'
    const image = 'vtex.png'
    const altText = 'vtex-image'

    const mediaList = [
      {
        mediaType: 'image',
        description: altText,
        image,
      },
    ] as ImageListSchemaElement[]

    const { queryByAltText } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', image)
    expect(queryByAltText(altText)).toHaveStyle(`width: ${DEFAULT_WIDTH}`)
  })

  it('should render an image with width if it is set', () => {
    const image = 'vtex.png'
    const altText = 'vtex-image'
    const width = '50%'

    const mediaList = [
      {
        mediaType: 'image',
        description: altText,
        width,
        image,
      },
    ] as ImageListSchemaElement[]

    const { queryByAltText } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', image)
    expect(queryByAltText(altText)).toHaveStyle(`width: ${width}`)
  })

  it('should render an image using "image" even if "src" is set', () => {
    const image = 'vtex-image.png'
    const src = 'vtex-image-src.png'
    const altText = 'vtex-image'

    const mediaList = [
      {
        mediaType: 'image',
        description: altText,
        image,
        src,
      },
    ] as Array<ImageListSchemaElement & { src: string }>

    const { queryByAltText } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', image)
  })

  it('should render using mobileImage when browsing through a mobile device', () => {
    mockDeviceDetectorReturn = { isMobile: true }

    const image = 'vtex-image.png'
    const mobileImage = 'vtex-image-mobile.png'
    const altText = 'vtex-image'

    const mediaList = [
      {
        mediaType: 'image',
        description: altText,
        image,
        mobileImage,
      },
    ] as Array<ImageListSchemaElement & { src: string }>

    const { queryByAltText } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    // Cleaning vtex.device-detector mobile mock
    mockDeviceDetectorReturn = { isMobile: false }

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', mobileImage)
  })

  it('should render using image when browsing through a mobile device and mobileImage is not set', () => {
    mockDeviceDetectorReturn = { isMobile: true }

    const image = 'vtex-image.png'
    const altText = 'vtex-image'

    const mediaList = [
      {
        mediaType: 'image',
        description: altText,
        image,
      },
    ] as Array<ImageListSchemaElement & { src: string }>

    const { queryByAltText } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    // Cleaning vtex.device-detector mobile mock
    mockDeviceDetectorReturn = { isMobile: false }

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', image)
  })

  it('should render using image when browsing through a desktop device, even if mobileImage is set', () => {
    const image = 'vtex-image.png'
    const mobileImage = 'vtex-image-mobile.png'
    const altText = 'vtex-image'

    const mediaList = [
      {
        mediaType: 'image',
        description: altText,
        image,
        mobileImage,
      },
    ] as Array<ImageListSchemaElement & { src: string }>

    const { queryByAltText } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', image)
  })

  it('should render a list of images correctly', () => {
    const image1 = 'vtex-1.png'
    const image2 = 'vtex-2.png'
    const image3 = 'vtex-3.png'
    const altText1 = 'vtex-image-1'
    const altText2 = 'vtex-image-2'
    const altText3 = 'vtex-image-3'

    const mediaList = [
      {
        mediaType: 'image',
        description: altText1,
        image: image1,
      },
      {
        mediaType: 'image',
        description: altText2,
        image: image2,
      },
      {
        mediaType: 'image',
        description: altText3,
        image: image3,
      },
    ] as ImageListSchemaElement[]

    const { queryByAltText } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    expect(queryByAltText(altText1)).toBeInTheDocument()
    expect(queryByAltText(altText2)).toBeInTheDocument()
    expect(queryByAltText(altText3)).toBeInTheDocument()
    expect(queryByAltText(altText1)).toHaveAttribute('src', image1)
    expect(queryByAltText(altText2)).toHaveAttribute('src', image2)
    expect(queryByAltText(altText3)).toHaveAttribute('src', image3)
  })

  it('should render an image even if "image" is malformed', () => {
    // File with no extension
    const image = 'vtex'
    const altText = 'vtex-image'

    const mediaList = [
      {
        mediaType: 'image',
        description: altText,
        image,
      },
    ] as ImageListSchemaElement[]

    const { queryByAltText } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', image)
  })

  it('should render a list of images and videos correctly', () => {
    const image1 = 'vtex-1.png'
    const image2 = 'vtex-2.png'
    const altText1 = 'vtex-image-1'
    const altText2 = 'vtex-image-2'

    const mediaList = [
      {
        mediaType: 'image',
        description: altText1,
        image: image1,
      },
      {
        mediaType: 'video',
        video: 'http://vtex.com/vtex.mp4',
      },
      {
        mediaType: 'image',
        description: altText2,
        image: image2,
      },
      {
        mediaType: 'video',
        video: 'https://www.youtube.com/watch?v=hT0OMD11b0A',
      },
    ] as ImageListSchemaElement[]

    const { queryByAltText, queryByTestId } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    expect(queryByAltText(altText1)).toBeInTheDocument()
    expect(queryByAltText(altText2)).toBeInTheDocument()
    expect(queryByAltText(altText1)).toHaveAttribute('src', image1)
    expect(queryByAltText(altText2)).toHaveAttribute('src', image2)
    expect(queryByTestId('html5-player')).toBeInTheDocument()
    expect(queryByTestId('youtube-player')).toBeInTheDocument()
  })
})

describe('Migration from list-context.image-list to list-context.media-list', () => {
  // The cases below are only possible in case of migration from
  // list-context.image-list to list.context.media-list
  it('should render an image correctly', () => {
    const image = 'vtex.png'
    const altText = 'vtex-image'

    const mediaList = [
      {
        description: altText,
        image,
      },
    ] as ImageListSchemaElement[]

    const { queryByAltText } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', image)
  })

  it('should render an image using "image" even if "src" is set', () => {
    const image = 'vtex-image.png'
    const src = 'vtex-src.png'
    const altText = 'vtex-image'

    const mediaList = [
      {
        description: altText,
        image,
        src,
      },
    ] as Array<ImageListSchemaElement & { src: string }>

    const { queryByAltText } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', image)
  })

  it('should render a list of images correctly', () => {
    const image1 = 'vtex-1.png'
    const image2 = 'vtex-2.png'
    const image3 = 'vtex-3.png'
    const altText1 = 'vtex-image-1'
    const altText2 = 'vtex-image-2'
    const altText3 = 'vtex-image-3'

    const mediaList = [
      {
        description: altText1,
        image: image1,
      },
      {
        description: altText2,
        image: image2,
      },
      {
        description: altText3,
        image: image3,
      },
    ] as ImageListSchemaElement[]

    const { queryByAltText } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    expect(queryByAltText(altText1)).toBeInTheDocument()
    expect(queryByAltText(altText2)).toBeInTheDocument()
    expect(queryByAltText(altText3)).toBeInTheDocument()
    expect(queryByAltText(altText1)).toHaveAttribute('src', image1)
    expect(queryByAltText(altText2)).toHaveAttribute('src', image2)
    expect(queryByAltText(altText3)).toHaveAttribute('src', image3)
  })

  it('should render an image even if "image" is malformed', () => {
    // File with no extension
    const image = 'vtex'
    const altText = 'vtex-image'

    const mediaList = [
      {
        description: altText,
        image,
      },
    ] as ImageListSchemaElement[]

    const { queryByAltText } = render(
      <MediaListSiteEditor mediaList={mediaList} />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', image)
  })
})

describe('Using list-context.media-list as a React Component', () => {
  it('should render an youtube player correctly', () => {
    const mediaList = [
      {
        src: 'https://www.youtube.com/watch?v=hT0OMD11b0A',
      },
    ]

    const { queryByTestId } = render(<MediaList mediaList={mediaList} />)

    expect(queryByTestId('html5-player')).not.toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).toBeInTheDocument()
  })

  it('should render a vimeo player correctly', () => {
    const mediaList = [
      {
        src: 'https://vimeo.com/89404519',
      },
    ]

    const { queryByTestId } = render(<MediaList mediaList={mediaList} />)

    expect(queryByTestId('html5-player')).not.toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).toBeInTheDocument()
    expect(queryByTestId('youtube-player')).not.toBeInTheDocument()
  })

  it('should render a HTML5 player correctly', () => {
    const mediaList = [
      {
        src: 'http://vtex.com/vtex.mp4',
      },
    ]

    const { queryByTestId } = render(<MediaList mediaList={mediaList} />)

    expect(queryByTestId('html5-player')).toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).not.toBeInTheDocument()
  })

  it('should render HTML5, Youtube and Vimeo player', () => {
    const mediaList = [
      {
        src: 'http://vtex.com/vtex.mp4',
      },
      {
        src: 'https://www.youtube.com/watch?v=hT0OMD11b0A',
      },
      {
        src: 'https://vimeo.com/89404519',
      },
    ]

    const { queryByTestId } = render(<MediaList mediaList={mediaList} />)

    expect(queryByTestId('html5-player')).toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).toBeInTheDocument()
    expect(queryByTestId('youtube-player')).toBeInTheDocument()
  })

  it('should render an image correctly', () => {
    const src = 'vtex.png'
    const altText = 'vtex-image'

    const mediaList = [
      {
        alt: altText,
        src,
      },
    ]

    const { queryByAltText } = render(<MediaList mediaList={mediaList} />)

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', src)
  })

  it('should render a list of images correctly', () => {
    const src1 = 'vtex-1.png'
    const src2 = 'vtex-2.png'
    const src3 = 'vtex-3.png'
    const altText1 = 'vtex-image-1'
    const altText2 = 'vtex-image-2'
    const altText3 = 'vtex-image-3'

    const mediaList = [
      {
        alt: altText1,
        src: src1,
      },
      {
        alt: altText2,
        src: src2,
      },
      {
        alt: altText3,
        src: src3,
      },
    ]

    const { queryByAltText } = render(<MediaList mediaList={mediaList} />)

    expect(queryByAltText(altText1)).toBeInTheDocument()
    expect(queryByAltText(altText2)).toBeInTheDocument()
    expect(queryByAltText(altText3)).toBeInTheDocument()
    expect(queryByAltText(altText1)).toHaveAttribute('src', src1)
    expect(queryByAltText(altText2)).toHaveAttribute('src', src2)
    expect(queryByAltText(altText3)).toHaveAttribute('src', src3)
  })

  it('should render an image even if "src" is malformed', () => {
    // File with no extension
    const src = 'vtex'
    const altText = 'vtex-image'

    const mediaList = [
      {
        alt: altText,
        src,
      },
    ]

    const { queryByAltText } = render(<MediaList mediaList={mediaList} />)

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', src)
  })

  it('should render a list of images and videos correctly', () => {
    const imageSrc1 = 'vtex-1.png'
    const imageSrc2 = 'vtex-2.png'
    const altText1 = 'vtex-image-1'
    const altText2 = 'vtex-image-2'

    const mediaList = [
      {
        alt: altText1,
        src: imageSrc1,
      },
      {
        src: 'http://vtex.com/vtex.mp4',
      },
      {
        alt: altText2,
        src: imageSrc2,
      },
      {
        src: 'https://www.youtube.com/watch?v=hT0OMD11b0A',
      },
    ]

    const { queryByAltText, queryByTestId } = render(
      <MediaList mediaList={mediaList} />
    )

    expect(queryByAltText(altText1)).toBeInTheDocument()
    expect(queryByAltText(altText2)).toBeInTheDocument()
    expect(queryByAltText(altText1)).toHaveAttribute('src', imageSrc1)
    expect(queryByAltText(altText2)).toHaveAttribute('src', imageSrc2)
    expect(queryByTestId('html5-player')).toBeInTheDocument()
    expect(queryByTestId('youtube-player')).toBeInTheDocument()
  })
})
