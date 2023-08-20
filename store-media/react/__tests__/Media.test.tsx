import React from 'react'
import type { ComponentType } from 'react'
import { render } from '@vtex/test-tools/react'

import Media from '../Media'
import type { MediaSchema, MediaProps } from '../MediaTypes'

describe('Using media block via site-editor', () => {
  const MediaSiteEditor = Media as ComponentType<MediaProps & MediaSchema>

  it('should render a youtube player correctly', () => {
    const { queryByTestId } = render(
      <MediaSiteEditor
        mediaType="video"
        videoUrl="https://www.youtube.com/watch?v=hT0OMD11b0A"
      />
    )

    expect(queryByTestId('html5-player')).not.toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).toBeInTheDocument()
  })

  it('should render a vimeo player correctly', () => {
    const { queryByTestId } = render(
      <MediaSiteEditor
        mediaType="video"
        videoUrl="https://vimeo.com/89404519"
      />
    )

    expect(queryByTestId('html5-player')).not.toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).toBeInTheDocument()
    expect(queryByTestId('youtube-player')).not.toBeInTheDocument()
  })

  it('should render a HTML5 player correctly', () => {
    const { queryByTestId } = render(
      <MediaSiteEditor mediaType="video" videoUrl="http://vtex.com/vtex.mp4" />
    )

    expect(queryByTestId('html5-player')).toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).not.toBeInTheDocument()
  })

  it('should render a HTML5 player using videoUrl even if src is set', () => {
    const videoUrl = 'http://vtex.com/vtex-video-url.mp4'
    const src = 'http://vtex.com/vtex-src.mp4'

    const { queryByTestId } = render(
      <MediaSiteEditor mediaType="video" videoUrl={videoUrl} src={src} />
    )

    expect(queryByTestId('html5-player')).toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).not.toBeInTheDocument()

    // Checks if the <source> inside <video> has the correct src value
    expect(queryByTestId('html5-player')?.firstElementChild).toHaveAttribute(
      'src',
      videoUrl
    )
  })

  it('should render a HTML5 player even if videoUrl is malformed', () => {
    const { queryByTestId } = render(
      // File with no extension
      <MediaSiteEditor mediaType="video" videoUrl="vtex" />
    )

    expect(queryByTestId('html5-player')).toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).not.toBeInTheDocument()
  })

  it('should render an image correctly', () => {
    const altText = 'vtex-image'

    const { queryByAltText } = render(
      <MediaSiteEditor mediaType="image" src="vtex.png" alt={altText} />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', 'vtex.png')
  })

  it('should render an image even if src is malformed', () => {
    const altText = 'vtex-image'
    const src = 'vtex'

    const { queryByAltText } = render(
      <MediaSiteEditor mediaType="image" src={src} alt={altText} />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', src)
  })
})

describe('Using media with fixed mediaType', () => {
  it('should render a youtube player correctly', () => {
    const { queryByTestId } = render(
      <Media
        mediaType="video"
        src="https://www.youtube.com/watch?v=hT0OMD11b0A"
      />
    )

    expect(queryByTestId('html5-player')).not.toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).toBeInTheDocument()
  })

  it('should render a vimeo player correctly', () => {
    const { queryByTestId } = render(
      <Media mediaType="video" src="https://vimeo.com/89404519" />
    )

    expect(queryByTestId('html5-player')).not.toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).toBeInTheDocument()
    expect(queryByTestId('youtube-player')).not.toBeInTheDocument()
  })

  it('should render a HTML5 player correctly', () => {
    const { queryByTestId } = render(
      <Media mediaType="video" src="http://vtex.com/vtex.mp4" />
    )

    expect(queryByTestId('html5-player')).toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).not.toBeInTheDocument()
  })

  it('should render a HTML5 player even if src is malformed', () => {
    const { queryByTestId } = render(
      // File with no extension
      <Media mediaType="video" src="vtex" />
    )

    expect(queryByTestId('html5-player')).toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).not.toBeInTheDocument()
  })

  it('should render an image correctly', () => {
    const altText = 'vtex-image'
    const src = 'vtex.png'

    const { queryByAltText } = render(
      <Media mediaType="image" src={src} alt={altText} />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', src)
  })

  it('should render an image even if src is malformed', () => {
    const altText = 'vtex-image'
    const src = 'vtex'

    const { queryByAltText } = render(
      <Media mediaType="image" src={src} alt={altText} />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', src)
  })

  it('should render an image if mediaType is set to image, even if src has mp4 extension', () => {
    const altText = 'vtex-image'

    const { queryByAltText } = render(
      <Media
        mediaType="image"
        src="http://vtex.com/vtex-png.mp4"
        alt={altText}
      />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
  })
})

describe('Using media with imageOrVideo mediaType', () => {
  it('should render a youtube player correctly', () => {
    const { queryByTestId } = render(
      <Media
        mediaType="imageOrVideo"
        src="https://www.youtube.com/watch?v=hT0OMD11b0A"
      />
    )

    expect(queryByTestId('html5-player')).not.toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).toBeInTheDocument()
  })

  it('should render a vimeo player correctly', () => {
    const { queryByTestId } = render(
      <Media mediaType="imageOrVideo" src="https://vimeo.com/89404519" />
    )

    expect(queryByTestId('html5-player')).not.toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).toBeInTheDocument()
    expect(queryByTestId('youtube-player')).not.toBeInTheDocument()
  })

  it('should render a HTML5 player correctly', () => {
    const { queryByTestId } = render(
      <Media mediaType="imageOrVideo" src="http://vtex.com/video.mp4" />
    )

    expect(queryByTestId('html5-player')).toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).not.toBeInTheDocument()
  })

  it('should render a HTML5 player correctly even if src has name "png" on it', () => {
    const { queryByTestId } = render(
      <Media mediaType="imageOrVideo" src="http://vtex.com/vtex-png.mp4" />
    )

    expect(queryByTestId('html5-player')).toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).not.toBeInTheDocument()
  })

  it('should render a HTML5 player correctly even if src has query params', () => {
    const { queryByTestId } = render(
      <Media
        mediaType="imageOrVideo"
        src="http://vtex.com/vtex-png.mp4?one=1&two=2&three=3"
      />
    )

    expect(queryByTestId('html5-player')).toBeInTheDocument()
    expect(queryByTestId('vimeo-player')).not.toBeInTheDocument()
    expect(queryByTestId('youtube-player')).not.toBeInTheDocument()
  })

  it('should render an image correctly', () => {
    const altText = 'vtex-image'
    const src = 'vtex.png'

    const { queryByAltText } = render(
      <Media mediaType="imageOrVideo" src={src} alt={altText} />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', src)
  })

  it('should render an image if src is malformed', () => {
    const altText = 'vtex-image'
    const src = 'vtex'

    const { queryByAltText } = render(
      <Media mediaType="imageOrVideo" src={src} alt={altText} />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
    expect(queryByAltText(altText)).toHaveAttribute('src', src)
  })

  it('should render an image correctly even if src has "mp4", "youtube" or "vimeo" on it', () => {
    const altText = 'vtex-image'

    const { queryByAltText } = render(
      <Media
        mediaType="imageOrVideo"
        src="vtex-youtube-vimeo-mp4.png"
        alt={altText}
      />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
  })

  it('should render an image correctly even if src has query params', () => {
    const altText = 'vtex-image'

    const { queryByAltText } = render(
      <Media
        mediaType="imageOrVideo"
        src="vtex-mp4.png?one=1&two=2&three=3"
        alt={altText}
      />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
  })

  it('should render an image correctly even if src has no extension', () => {
    const altText = 'vtex-image'

    const { queryByAltText } = render(
      <Media
        mediaType="imageOrVideo"
        src="http://vtex.com/vtex-image-mp4"
        alt={altText}
      />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
  })

  it('should render an image if src is not set', () => {
    const altText = 'vtex-image'

    const { queryByAltText } = render(
      <Media mediaType="imageOrVideo" alt={altText} />
    )

    expect(queryByAltText(altText)).toBeInTheDocument()
  })
})
