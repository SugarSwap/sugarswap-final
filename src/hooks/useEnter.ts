import {useCallback} from 'react'

import useSgr from './useSgr'
import {useWallet} from 'use-wallet'

import {enter, getXSgrStakingContract} from '../sgr/utils'

const useEnter = () => {
  const {account} = useWallet()
  const sgr = useSgr()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getXSgrStakingContract(sgr),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, sgr],
  )

  return {onEnter: handle}
}

export default useEnter
