import {create} from 'zustand'

export interface ProfileState {
  name: string
  surname: string
  email: string
}

interface ProfileActions {
  setProfile: (profile: ProfileState) => void
}

export const useProfileState = create<ProfileState & ProfileActions>((set) => ({
  name: '',
  surname: '',
  email: '',
  setProfile: (profile) => set(profile),
}))
