import {useCallback} from 'react'

import useSgr from './useSgr'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {
  approve,
  getSgrContract,
  getXSgrStakingContract
} from '../sgr/utils'

const useApproveStaking = () => {
  const {account}: { account: string; ethereum: provider } = useWallet()
  const sgr = useSgr()
  const lpContract = getSgrContract(sgr)
  const contract = getXSgrStakingContract(sgr)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return {onApprove: handleApprove}
}

export default useApproveStaking
