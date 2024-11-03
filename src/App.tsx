import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { ConnectionProvider, useConnection, useWallet, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletConnectButton, WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js"
import { useMemo, useState } from "react"
import '@solana/wallet-adapter-react-ui/styles.css';
import { EnvironmentVariables } from "../EnvironmentVariables.ts"
//const receiverPubKey = new PublicKey(import.meta.env.PUBLICK_KEY)


function App() {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(()=> clusterApiUrl(network), [network])
  return (
    <>
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider >
          <Dapp />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
      
    </>
  )
}

function Dapp() {
  return <>
  <ConnectWallet />
  <TransactionBlock />
  </>
}

function ConnectWallet() {
  return <>
    <div style={{display: "flex", justifyContent: "space-between"}}>
      <WalletMultiButton />
      <WalletDisconnectButton />
    </div>
  </>
}

function TransactionBlock() {
  const [sol, setLamports] = useState("")
  const wallets = useWallet()
  const {connection} = useConnection()
  if (!wallets.connected) {
    return <div> Please Connect Your Wallet </div>
  }
  function submit() {
    const transaction = new Transaction()
    const amount = (sol as unknown) as number
    if (Number.isNaN(amount)) {
      return
    }
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallets.publicKey as PublicKey,
        toPubkey: EnvironmentVariables.sharedInstance().receiverPublicKey,
        lamports: amount*LAMPORTS_PER_SOL
      })
    )
    wallets.sendTransaction(transaction, connection).then((value)=>{
      console.log(value)
      alert(`amount transfered succefully pleace check in your wallet for YT Token`)
      setLamports("")
    }).catch((e)=>{
      console.log(e)
      alert(`error occured while sending transaction please retry`)
      setLamports("")
    })
  }

  return <>
  <div>
    <input placeholder="Enter Lamports" onChange={(e)=>{setLamports(e.target.value)} } type="number" step={0.0000001}></input>
    <button onClick={()=> {submit()}}>Send</button>
  </div>
  </>
}

export default App
