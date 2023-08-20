import React from 'react'
import { shallowWithIntl, loadTranslation } from 'enzyme-react-intl'
import ProfileSummary from '../ProfileSummary'
import mockRules from '../__mocks__/rules'
import mockProfile from '../__mocks__/profile'

loadTranslation('../messages/pt.json')

describe('ProfileSummary', () => {
  let wrapper
  beforeEach(() => {
    // Arrange
    wrapper = shallowWithIntl(
      <ProfileSummary profile={mockProfile} rules={mockRules}>
        {displayData => <span displayData={displayData}>It works!</span>}
      </ProfileSummary>,
    ).dive()
  })

  it('should render its children', () => {
    // Act
    const result = wrapper.find('span')

    // Assert
    expect(result).toHaveLength(1)
  })

  it('should pass down the data in the correct structure', () => {
    // Act
    const result = wrapper.find('span').props().displayData

    // Assert
    expect(result.personalData).toBeTruthy()
    expect(result.personalData.firstName).toBeTruthy()
    expect(result.businessData).toBeTruthy()
  })

  it('should correctly signal hidden fields in the data', () => {
    // Arrange
    const hiddenRules = {
      ...mockRules,
      businessFields: [
        {
          name: 'tradeName',
          label: 'tradeName',
          hidden: true,
        },
      ],
    }
    const hiddenWrapper = shallowWithIntl(
      <ProfileSummary profile={mockProfile} rules={hiddenRules}>
        {displayData => <span displayData={displayData}>It works!</span>}
      </ProfileSummary>,
    ).dive()

    // Act
    const result = hiddenWrapper.find('span').props().displayData.businessData
      .tradeName

    // Assert
    expect(result.hidden).toBe(true)
  })

  it('should translate the gender before serving', () => {
    // Arrange
    const panProfile = { ...mockProfile, gender: 'pangender' }
    const panWrapper = shallowWithIntl(
      <ProfileSummary profile={panProfile} rules={mockRules}>
        {displayData => <span displayData={displayData}>It works!</span>}
      </ProfileSummary>,
    ).dive()

    // Act
    const result = panWrapper.find('span').props().displayData.personalData
      .gender

    // Assert
    expect(result.value).toBe('Pangênero')
  })

  it('should apply pre-display transformation to data if necessary', () => {
    // Arrange
    const preProfile = { ...mockProfile, tradeName: 'Apple Inc.' }
    const preRules = {
      ...mockRules,
      businessFields: [
        {
          name: 'tradeName',
          label: 'tradeName',
          display: value => value.toUpperCase(),
        },
      ],
    }
    const preWrapper = shallowWithIntl(
      <ProfileSummary profile={preProfile} rules={preRules}>
        {displayData => <span displayData={displayData}>It works!</span>}
      </ProfileSummary>,
    ).dive()

    // Act
    const result = preWrapper.find('span').props().displayData.businessData
      .tradeName

    // Assert
    expect(result.value).toBe('APPLE INC.')
  })

  it('should pass down the isCorporate profile attribute', () => {
    // Arrange
    const corpProfile = { ...mockProfile, isCorporate: true }
    const preWrapper = shallowWithIntl(
      <ProfileSummary profile={corpProfile} rules={mockRules}>
        {displayData => <span displayData={displayData}>It works!</span>}
      </ProfileSummary>,
    ).dive()

    // Act
    const result = preWrapper.find('span').props().displayData.isCorporate

    // Assert
    expect(result).toBe(true)
  })
})
