import {useTransition} from '@react-spring/web'

export const transitionStyles = {
  from: {opacity: 0, transform: 'translateY(50px)'},
  enter: {opacity: 1, transform: 'translateY(0px)'},
  leave: {opacity: 0, transform: 'translateY(-50px)'},
}

export function useListTransitions<T>(
  data: T[],
  getKey: (item: T) => string | number
) {
  return useTransition(data ?? [], {
    ...transitionStyles,
    keys: getKey,
  })
}
