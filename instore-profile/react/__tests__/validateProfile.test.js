import {
  applyMask,
  applyValidation,
  addFocusToFirstInvalidInput,
  isProfileValid,
  applyFullValidation,
} from '../modules/validateProfile'
import addValidation from '../modules/addValidation'
import removeValidation from '../modules/removeValidation'
import cleanProfile from '../__mocks__/profile'
import validatedProfile from '../__mocks__/validatedProfile'
import invalidProfile from '../__mocks__/invalidProfile'
import mockRules from '../__mocks__/rules'

describe('validateProfile', () => {
  it('should add validation data to a clean profile', () => {
    // Act
    const result = addValidation(cleanProfile, mockRules)

    // Assert
    expect(result).toEqual({
      birthDate: { value: '23/05/92' },
      firstName: { value: 'John' },
      gender: { value: null },
      lastName: { value: 'Appleseed' },
      tradeName: { value: null },
    })
  })

  it('should apply pre-display transformation to data if necessary', () => {
    // Arrange
    const displayRules = {
      ...mockRules,
      businessFields: [
        {
          name: 'tradeName',
          display: value => value.toUpperCase(),
        },
      ],
    }
    const displayProfile = { ...cleanProfile, tradeName: 'Apple Inc.' }

    // Act
    const result = addValidation(displayProfile, displayRules)

    // Assert
    expect(result).toEqual({
      birthDate: { value: '23/05/92' },
      firstName: { value: 'John' },
      gender: { value: null },
      lastName: { value: 'Appleseed' },
      tradeName: { value: 'APPLE INC.' },
    })
  })

  it('should remove validation data from a validated profile', () => {
    // Act
    const result = removeValidation(validatedProfile, mockRules)

    // Assert
    expect(result).toEqual({
      birthDate: '23/05/92',
      firstName: 'John',
      gender: null,
      lastName: 'Appleseed',
      tradeName: null,
    })
  })

  it('should apply pre-submit transformation to data if necessary', () => {
    // Arrange
    const submitRules = {
      ...mockRules,
      businessFields: [
        {
          name: 'tradeName',
          submit: value => value.toUpperCase(),
        },
      ],
    }
    const submitProfile = {
      ...validatedProfile,
      tradeName: { value: 'Apple Inc.' },
    }

    // Act
    const result = removeValidation(submitProfile, submitRules)

    // Assert
    expect(result).toEqual({
      birthDate: '23/05/92',
      firstName: 'John',
      gender: null,
      lastName: 'Appleseed',
      tradeName: 'APPLE INC.',
    })
  })

  it('should apply a given mask to a value', () => {
    // Arrange
    const mockField = { mask: value => '**' + value + '**' }

    // Act
    const result = applyMask(mockField, 'hello')

    // Assert
    expect(result).toBe('**hello**')
  })

  it('should validate a required field', () => {
    // Arrange
    const mockField = { required: true }

    // Act
    const result = applyValidation(mockField, '')

    // Assert
    expect(result).toBe('EMPTY_FIELD')
  })

  it('should validate a field according to rules', () => {
    // Arrange
    const mockField = { validate: value => value.length === 3 }

    // Act
    const validResult = applyValidation(mockField, 'AAA')
    const invalidResult = applyValidation(mockField, 'AAAA')

    // Assert
    expect(validResult).toBeNull()
    expect(invalidResult).toBe('INVALID_FIELD')
  })

  it('should check if a profile is valid', () => {
    // Act
    const result = isProfileValid(invalidProfile)

    // Assert
    expect(result).toBe(false)
  })

  it('should apply focus to the first invalid input', () => {
    // Arrange
    const focusRules = {
      personalFields: [
        ...mockRules.personalFields,
        { name: 'gender', required: true },
      ],
    }

    // Act
    const focusedProfile = addFocusToFirstInvalidInput(
      focusRules,
      invalidProfile,
    )

    // Assert
    expect(focusedProfile.gender.focus).toBe(true)
  })

  it('should not validate business fields if the profile is not corporate', () => {
    // Arrange
    const corpRules = {
      personalFields: [...mockRules.personalFields],
      businessFields: [
        ...mockRules.businessFields,
        {
          name: 'stateRegistration',
          required: true,
        },
      ],
    }

    // Act
    const checkedProfile = applyFullValidation(
      corpRules,
      validatedProfile,
      false,
    )

    // Assert
    expect(checkedProfile.stateRegistration.error).not.toBeTruthy()
  })

  it('should validate business fields if the profile is corporate', () => {
    // Arrange
    const corpRules = {
      personalFields: [...mockRules.personalFields],
      businessFields: [
        ...mockRules.businessFields,
        {
          name: 'stateRegistration',
          required: true,
        },
      ],
    }

    // Act
    const checkedProfile = applyFullValidation(
      corpRules,
      validatedProfile,
      true,
    )

    // Assert
    expect(checkedProfile.stateRegistration.error).toBeTruthy()
  })
  it('should check for emojis', () => {
    const rules = {
      personalFields: [...mockRules.personalFields],
      businessFields: [],
    }

    const profile = { ...validatedProfile }

    const validProfile = applyFullValidation(rules, profile, false)

    expect(validProfile.firstName.error).toBeFalsy()

    profile.firstName.value = '🥰'

    const inValidProfile = applyFullValidation(rules, profile, false)

    expect(inValidProfile.firstName.error).toBeTruthy()
  })
})
