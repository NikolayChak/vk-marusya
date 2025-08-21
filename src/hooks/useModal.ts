import {useSelector} from 'react-redux'
import {RootState} from '@/store'

export const useModal = () => {
  return useSelector((state: RootState) => state.stateModal.value)
}
