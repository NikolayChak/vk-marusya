import {FC, SetStateAction, useEffect, useMemo, useState} from 'react'
import {useMutation} from '@tanstack/react-query'

import './HeaderInput.css'
import {Searchs} from '@/assets/icons'
import {CloseButton} from '@/components/ui'
import {useDebouncedValue} from '@/hooks'
import {getMovieForSearch} from '@/api'
import {ModalForInputSearch} from '@/components/widgets'

interface HeaderInputProps {
  hideModal?: () => void
}

const HeaderInput: FC<HeaderInputProps> = ({hideModal}) => {
  const [inputs, inputsChange] = useState('')
  const [isOpenModal, setOpenModal] = useState(false)
  const debouncedSearchValue = useDebouncedValue(inputs)

  const {mutate, data} = useMutation({
    mutationFn: () => getMovieForSearch('title', debouncedSearchValue),
  })

  const cachedData = useMemo(() => data, [data])

  const handleInput = (e: {target: {value: SetStateAction<string>}}) => {
    inputsChange(e.target.value)
  }

  const handleBlur = () => {
    setTimeout(() => setOpenModal(false), 200)
  }

  const handleFocus = () => {
    if (cachedData && cachedData.length > 0) {
      setOpenModal(true)
    }
  }

  const clearInput = () => {
    inputsChange('')
    setOpenModal(false)
    hideModal?.()
  }

  useEffect(() => {
    if (debouncedSearchValue) {
      mutate()
    }
  }, [debouncedSearchValue])

  useEffect(() => {
    if (cachedData && cachedData.length > 0) {
      setOpenModal(true)
    } else {
      setOpenModal(false)
    }
  }, [cachedData?.length, debouncedSearchValue])

  return (
    <div className="input-wrap ">
      <input
        onChange={handleInput}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className="input"
        placeholder="Поиск"
        value={inputs}
      />
      <Searchs fill={'#FFFFFF80'} />

      {inputs.trim().length > 0 && (
        <CloseButton onClick={clearInput} name={'search'} fill={'#FFFFFF80'} />
      )}
      {isOpenModal && cachedData && inputs.length > 0 && (
        <ModalForInputSearch data={cachedData} clearInput={clearInput} />
      )}
    </div>
  )
}

export default HeaderInput
