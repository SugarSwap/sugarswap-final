import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useSgr from '../../hooks/useSgr'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../sgr/utils'
import { getFarms } from '../../sgr/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const sgr = useSgr()
  const { account } = useWallet()

  const farms = getFarms(sgr)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
