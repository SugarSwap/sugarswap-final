import { useCallback } from 'react'

import useSgr from './useSgr'
import { useWallet } from 'use-wallet'

import { harvest, getMasterChefContract } from '../sgr/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const sgr = useSgr()
  const masterChefContract = getMasterChefContract(sgr)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, sgr])

  return { onReward: handleReward }
}

export default useReward
