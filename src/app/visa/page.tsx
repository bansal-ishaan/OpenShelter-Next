"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWeb3 } from "../hooks/use-web3"
import { NFTCard } from "@/components/nft-card"
import { Loader2, Upload, Shield } from "lucide-react"

export default function VisaPage() {
    const router = useRouter()
    const { isConnected, connect } = useWeb3()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        country: "",
        documentType: "",
    })
    const [file, setFile] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [adminCredentials, setAdminCredentials] = useState({ id: "", password: "" })
    const [showAdminLogin, setShowAdminLogin] = useState(false)
    const [showVerification, setShowVerification] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, documentType: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isConnected) {
        await connect()
        return
        }

        setIsSubmitting(true)
        // Simulate API call
        setTimeout(() => {
        setIsSubmitting(false)
        // Show success message or redirect
        router.push("/visa/success")
        }, 2000)
    }

    const handleAdminLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setShowAdminLogin(false)
        setShowVerification(true)
    }

    const handleAdminInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setAdminCredentials((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="container py-10">
        <div className="mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="mb-6 text-center text-3xl font-bold">Digital Visa Application</h1>
            <p className="mb-10 text-center text-muted-foreground">
                Complete the form below to apply for your digital identity and access to financial services.
            </p>
            </motion.div>

            <div className="grid gap-10 md:grid-cols-2">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <NFTCard />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {showAdminLogin ? (
                <Card>
                    <CardHeader>
                    <CardTitle>Admin Login</CardTitle>
                    <CardDescription>Enter your credentials to access admin features</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleAdminLogin}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                        <Label htmlFor="admin-id">Admin ID</Label>
                        <Input
                            id="admin-id"
                            name="id"
                            value={adminCredentials.id}
                            onChange={handleAdminInputChange}
                            required
                        />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="admin-password">Password</Label>
                        <Input
                            id="admin-password"
                            name="password"
                            type="password"
                            value={adminCredentials.password}
                            onChange={handleAdminInputChange}
                            required
                        />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={() => setShowAdminLogin(false)}>
                        Cancel
                        </Button>
                        <Button type="submit">Login</Button>
                    </CardFooter>
                    </form>
                </Card>
                ) : showVerification ? (
                <Card>
                    <CardHeader>
                    <CardTitle>Document Verification</CardTitle>
                    <CardDescription>Verify user documents to issue digital identity</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-medium">John Doe</h3>
                            <p className="text-sm text-muted-foreground">Passport from Germany</p>
                        </div>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                            Reject
                        </Button>
                        <Button size="sm">Approve</Button>
                        </div>
                    </div>
                    <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-medium">Jane Smith</h3>
                            <p className="text-sm text-muted-foreground">ID Card from France</p>
                        </div>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                            Reject
                        </Button>
                        <Button size="sm">Approve</Button>
                        </div>
                    </div>
                    </CardContent>
                    <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => setShowVerification(false)}>
                        Back
                    </Button>
                    </CardFooter>
                </Card>
                ) : (
                <Card>
                    <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Fill in your details to apply for a digital visa</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="country">Country of Origin</Label>
                        <Input
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                        />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="documentType">Document Type</Label>
                        <Select onValueChange={handleSelectChange} value={formData.documentType}>
                            <SelectTrigger>
                            <SelectValue placeholder="Select document type" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="passport">Passport</SelectItem>
                            <SelectItem value="driving-license">Driving License</SelectItem>
                            <SelectItem value="id-proof">ID Proof</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="document">Upload Document</Label>
                        <div className="flex items-center justify-center w-full">
                            <label
                            htmlFor="document"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                            >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground">PDF, JPG or PNG (MAX. 10MB)</p>
                            </div>
                            <Input
                                id="document"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                accept=".pdf,.jpg,.jpeg,.png"
                            />
                            </label>
                        </div>
                        {file && <p className="text-sm text-muted-foreground">Selected file: {file.name}</p>}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        {!isConnected && (
                        <Button type="button" onClick={connect} className="w-full">
                            Connect Wallet
                        </Button>
                        )}
                        <Button type="submit" className="w-full" disabled={isSubmitting || !isConnected}>
                        {isSubmitting ? (
                            <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                            </>
                        ) : (
                            "Submit"
                        )}
                        </Button>
                        <Button type="button" variant="outline" className="w-full" onClick={() => setShowAdminLogin(true)}>
                        Admin
                        </Button>
                    </CardFooter>
                    </form>
                </Card>
                )}
            </motion.div>
            </div>
        </div>
        </div>
    )
}