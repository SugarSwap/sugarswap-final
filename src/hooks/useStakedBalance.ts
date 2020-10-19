import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../sgr/utils'
import useSgr from './useSgr'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const sgr = useSgr()
  const masterChefContract = getMasterChefContract(sgr)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, sgr])

  useEffect(() => {
    if (account && sgr) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, sgr])

  return balance
}

export default useStakedBalance
