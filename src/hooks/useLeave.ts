import {useCallback} from 'react'

import useSgr from './useSgr'
import {useWallet} from 'use-wallet'

import {leave, getXSgrStakingContract} from '../sgr/utils'

const useLeave = () => {
  const {account} = useWallet()
  const sgr = useSgr()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXSgrStakingContract(sgr),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, sgr],
  )

  return {onLeave: handle}
}

export default useLeave
