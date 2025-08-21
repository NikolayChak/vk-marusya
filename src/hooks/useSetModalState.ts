import {useDispatch} from 'react-redux'
import type {AppDispatch} from '@/store'
import {openModal, closeModal} from '@/store'

export const useSetModalState = () => {
  const dispatch = useDispatch<AppDispatch>()

  const showModal = () => dispatch(openModal())
  const hideModal = () => dispatch(closeModal())

  return {showModal, hideModal}
}
