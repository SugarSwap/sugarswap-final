import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract, getFarms } from '../sgr/utils'
import useSgr from './useSgr'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sgr = useSgr()
  const farms = getFarms(sgr)
  const masterChefContract = getMasterChefContract(sgr)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefContract, sgr])

  useEffect(() => {
    if (account && masterChefContract && sgr) {
      fetchAllBalances()
    }
  }, [account, block, masterChefContract, setBalance, sgr])

  return balances
}

export default useAllEarnings
