import { PublicKey } from "@solana/web3.js"

export class EnvironmentVariables {
    private static envVariables = new EnvironmentVariables()
    public receiverPublicKey: PublicKey

    public static sharedInstance() {
        return this.envVariables
    }

    constructor() {
        console.log(JSON.stringify(import.meta.env.VITE_REACT_PUBLIC_KEY))
        this.receiverPublicKey = new PublicKey(import.meta.env.VITE_REACT_PUBLIC_KEY as string)
    }
}