import * as types from './action-types'

export const updateSelectedPackageSlider = packageIndex => ({
  type: types.UPDATE_SELECTED_PACKAGE_SLIDER,
  packageIndex,
})
