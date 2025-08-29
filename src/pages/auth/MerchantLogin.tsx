import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { z } from 'zod';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router';

const merchantLoginSchema = z.object({
    storeDetails: z.string().min(3),
    password: z.string().min(6),
});

const MerchantLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ storeDetails: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const result = merchantLoginSchema.safeParse(formData);
    //     if (result.success) {
    //         dispatch(login({ role: 'merchant', token: 'merchant-token' }));
    //         navigate('/dashboard/merchant');
    //     } else {
    //         setErrors(result.error.formErrors.fieldErrors);
    //     }
    // };  

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            // Simulate login process
            await new Promise((resolve) => setTimeout(resolve, 1000))

            authHelpers.login("merchant", {
                name: storeName,
                email: `${storeId}@merchant.com`,
                storeName,
                storeId,
            })

            router.push("/dashboard/merchant")
        } catch (err) {
            setError("Invalid credentials. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="w-full max-w-md">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                <Card className="shadow-lg border-border">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-semibold text-foreground">Merchant Login</CardTitle>
                        <CardDescription className="text-muted-foreground">Access your merchant dashboard</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="storeName" className="text-sm font-medium text-foreground">
                                    Store Name
                                </Label>
                                <Input
                                    id="storeName"
                                    type="text"
                                    placeholder="Your Store Name"
                                    value={storeName}
                                    onChange={(e) => setStoreName(e.target.value)}
                                    required
                                    className="w-full bg-input border-border"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="storeId" className="text-sm font-medium text-foreground">
                                    Store ID
                                </Label>
                                <Input
                                    id="storeId"
                                    type="text"
                                    placeholder="STORE123"
                                    value={storeId}
                                    onChange={(e) => setStoreId(e.target.value)}
                                    required
                                    className="w-full bg-input border-border"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-input border-border"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                                disabled={isLoading}
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </form>

                        <div className="mt-4 text-center">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account?{" "}
                                <Link href="/register/merchant" className="text-accent hover:underline">
                                    Register Merchant
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default MerchantLogin;