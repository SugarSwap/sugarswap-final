import { useCallback } from 'react'

import useSgr from './useSgr'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../sgr/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const sgr = useSgr()
  const masterChefContract = getMasterChefContract(sgr)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, sgr],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
