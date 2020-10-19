import React, {useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import Spacer from '../../components/Spacer'
import useSgr from '../../hooks/useSgr'
import {getContract} from '../../utils/erc20'
import UnstakeXSgr from './components/UnstakeXSgr'
import StakeSgr from "./components/StakeSgr";

import {contractAddresses} from '../../sgr/lib/constants'
import {getXSgrSupply} from "../../sgr/utils";
import BigNumber from "bignumber.js";
import {getBalanceNumber} from "../../utils/formatBalance";

const StakeXSgr: React.FC = () => {
  const {
    tokenAddress,
  } = {
    tokenAddress: contractAddresses.xSgr[56],
  }

  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  const sgr = useSgr()
  const {ethereum} = useWallet()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getXSgrSupply(sgr)
      setTotalSupply(supply)
    }
    if (sgr) {
      fetchTotalSupply()
    }
  }, [sgr, setTotalSupply])



  const lpContract = useMemo(() => {
    debugger
    return getContract(ethereum as provider, tokenAddress)
  }, [ethereum, tokenAddress])

  return (
    <>
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <UnstakeXSgr
              lpContract={lpContract}
            />
          </StyledCardWrapper>
          <Spacer/>
          <StyledCardWrapper>
            <StakeSgr
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <StyledInfo>
              ℹ️️ You will earn a portion of the swaps fees based on the amount
              of xSgr held relative the weight of the staking. xSgr can be minted
              by staking Sgr. To redeem Sgr staked plus swap fees convert xSgr
              back to Sgr. {totalSupply ? `There are currently ${getBalanceNumber(totalSupply)} xSGR in the whole pool.` : '' }
            </StyledInfo>
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default StakeXSgr
