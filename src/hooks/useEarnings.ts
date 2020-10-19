import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract } from '../sgr/utils'
import useSgr from './useSgr'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const sgr = useSgr()
  const masterChefContract = getMasterChefContract(sgr)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterChefContract, sgr])

  useEffect(() => {
    if (account && masterChefContract && sgr) {
      fetchBalance()
    }
  }, [account, block, masterChefContract, setBalance, sgr])

  return balance
}

export default useEarnings
