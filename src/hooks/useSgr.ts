import { useContext } from 'react'
import { Context } from '../contexts/SgrProvider'

const useSgr = () => {
  const { sgr } = useContext(Context)
  return sgr
}

export default useSgr
