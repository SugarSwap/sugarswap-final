import { useCallback } from 'react'

import useSgr from './useSgr'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract } from '../sgr/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const sgr = useSgr()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterChefContract(sgr),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, sgr],
  )

  return { onStake: handleStake }
}

export default useStake
