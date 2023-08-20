import React from 'react'

import { ProfileForm } from './ProfileForm'
import { useProfileForm } from './useProfileForm'

const ProfileFormContainer = () => {
  const profileForm = useProfileForm()

  return <ProfileForm {...profileForm} />
}

export default ProfileFormContainer
