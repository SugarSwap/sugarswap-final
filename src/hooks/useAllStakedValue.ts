import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getMasterChefContract,
  getWethContract,
  getFarms,
  getTotalLPWethValue,
} from '../sgr/utils'
import useSgr from './useSgr'
import useBlock from './useBlock'

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sgr = useSgr()
  const farms = getFarms(sgr)
  const masterChefContract = getMasterChefContract(sgr)
  const wethContact = getWethContract(sgr)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
        }) =>
          getTotalLPWethValue(
            masterChefContract,
            wethContact,
            lpContract,
            tokenContract,
            pid,
          ),
      ),
    )

    setBalance(balances)
  }, [account, masterChefContract, sgr])

  useEffect(() => {
    if (account && masterChefContract && sgr) {
      fetchAllStakedValue()
    }
  }, [account, block, masterChefContract, setBalance, sgr])

  return balances
}

export default useAllStakedValue
