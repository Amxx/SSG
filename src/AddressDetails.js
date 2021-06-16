import * as React from 'react'
import { ethers } from 'ethers'

import {
  Table,
} from 'react-bootstrap'

import SlotForm from './SlotForm'

const AddressDetails = (props) => {
  const [ balance, setBalance ] = React.useState()
  const [ nonce,   setNonce   ] = React.useState()
  const [ code,    setCode    ] = React.useState()
  const [ addrHex, setAddrHex ] = React.useState()
  const [ addrENS, setAddrENS ] = React.useState()

  React.useEffect(() => {
    props.provider.resolveName(props.address).then(setAddrHex).catch(() => setAddrHex(null))
    props.provider.getBalance(props.address).then(value => setBalance(ethers.utils.formatEther(value))).catch(() => setBalance(null));
    props.provider.getTransactionCount(props.address).then(setNonce).catch(() => setNonce(null));
    props.provider.getCode(props.address).then(setCode).catch(() => setCode(null));
  }, [ props.provider, props.address ])

  React.useEffect(() => {
    if (addrHex) {
      props.provider.lookupAddress(addrHex).then(setAddrENS).catch(() => setAddrENS(null))
    }
  }, [ props.provider, addrHex ])

  return (
    <>
      <Table className={props.className}>
        <tbody>
          <tr>
            <td>Address</td>
            <td>{addrHex} { addrENS && `(${addrENS})` }</td>
          </tr>
          <tr>
            <td>Balance</td>
            <td>{balance} {ethers.constants.EtherSymbol}</td>
          </tr>
          <tr>
            <td>Transaction Count</td>
            <td>{nonce}</td>
          </tr>
          <tr>
            <td>Code</td>
            <td><pre><code>{code}</code></pre></td>
          </tr>
        </tbody>
      </Table>
      <SlotForm {...props} address={addrHex}/>
    </>
  )
}

export default AddressDetails
