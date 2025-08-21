import {useEffect, useRef} from 'react'

export const useElementClick = (className: string, callback: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.classList.contains(className)) {
        callback()
      }
    }

    const elem = ref.current
    if (!elem) return

    elem.addEventListener('click', handleClick)
    return () => {
      elem.removeEventListener('click', handleClick)
    }
  }, [className, callback])

  return ref
}
