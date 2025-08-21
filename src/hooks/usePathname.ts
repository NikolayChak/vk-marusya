import {useLocation} from 'react-router-dom'

export const usePathname = (): string => {
  return useLocation().pathname
}
