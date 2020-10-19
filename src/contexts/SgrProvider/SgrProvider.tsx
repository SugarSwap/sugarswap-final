import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Sgr } from '../../sgr'

export interface SgrContext {
  sgr?: typeof Sgr
}

export const Context = createContext<SgrContext>({
  sgr: undefined,
})

declare global {
  interface Window {
    sgrsauce: any
  }
}

const SgrProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [sgr, setSgr] = useState<any>()

  // @ts-ignore
  window.sgr = sgr
  // @ts-ignore


  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const sgrLib = new Sgr(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setSgr(sgrLib)
      window.sgrsauce = sgrLib
    }
  }, [ethereum])

  return <Context.Provider value={{ sgr }}>{children}</Context.Provider>
}

export default SgrProvider
