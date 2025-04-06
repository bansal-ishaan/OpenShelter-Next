"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"
import { ethers } from "ethers"
import RefugeeFinanceABI from "@/lib/abi/RefugeeFinance.json"

export const Web3Context = createContext({
    provider: null as ethers.BrowserProvider | null,
    signer: null as ethers.JsonRpcSigner | null,
    contract: null as ethers.Contract | null,
    address: null as string | null,
    isConnected: false,
    connect: async () => {},
    disconnect: () => {},
    chainId: null as number | null,
})

const contractAddress = "0x0000000000000000000000000000000000000000" // Replace with actual contract address

export function Web3Provider({ children }: { children: React.ReactNode }) {
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
    const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)
    const [contract, setContract] = useState<ethers.Contract | null>(null)
    const [address, setAddress] = useState<string | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [chainId, setChainId] = useState<number | null>(null)

    useEffect(() => {
        if (typeof window !== "undefined" && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        setProvider(provider)

        // Check if already connected
        provider
            .listAccounts()
            .then((accounts) => {
            if (accounts.length > 0) {
                handleAccountsChanged(accounts)
            }
            })
            .catch(console.error)

        // Listen for account changes
        window.ethereum.on("accountsChanged", handleAccountsChanged)
        window.ethereum.on("chainChanged", () => window.location.reload())

        return () => {
            window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        }
        }
    }, [])

    async function handleAccountsChanged(accounts: any) {
        if (accounts.length === 0) {
        setIsConnected(false)
        setAddress(null)
        setSigner(null)
        setContract(null)
        return
        }

        try {
        if (!provider) return

        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        const network = await provider.getNetwork()

        setAddress(address)
        setSigner(signer)
        setIsConnected(true)
        setChainId(Number(network.chainId))

        const contract = new ethers.Contract(contractAddress, RefugeeFinanceABI, signer)
        setContract(contract)
        } catch (error) {
        console.error("Error setting up web3:", error)
        }
    }

    async function connect() {
        if (!provider) return

        try {
        const accounts = await provider.send("eth_requestAccounts", [])
        handleAccountsChanged(accounts)
        } catch (error) {
        console.error("Error connecting wallet:", error)
        }
    }

    function disconnect() {
        setIsConnected(false)
        setAddress(null)
        setSigner(null)
        setContract(null)
    }

    return (
        <Web3Context.Provider
        value={{
            provider,
            signer,
            contract,
            address,
            isConnected,
            connect,
            disconnect,
            chainId,
        }}
        >
        {children}
        </Web3Context.Provider>
    )
}