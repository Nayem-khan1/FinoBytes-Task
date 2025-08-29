import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../features/auth/authSlice';
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
import { Link, useNavigate } from 'react-router-dom';

const merchantLoginSchema = z.object({
    storeName: z.string().min(3),
    storeId: z.string().min(3),
    password: z.string().min(6),
});

const MerchantLogin: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ storeName: '', storeId: '', password: '' });
    const [errors, setErrors] = useState<Partial<typeof formData>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const result = merchantLoginSchema.safeParse(formData);
        if (result.success) {
            dispatch(loginSuccess({ role: 'merchant', token: 'merchant-token' }));
            navigate('/dashboard/merchant');
        } else {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors({
                storeName: fieldErrors.storeName?.[0],
                storeId: fieldErrors.storeId?.[0],
                password: fieldErrors.password?.[0],
            });
        }

        setIsLoading(false);
    };

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
                            {errors.storeName && <p className="text-red-500">{errors.storeName}</p>}
                            {errors.storeId && <p className="text-red-500">{errors.storeId}</p>}
                            {errors.password && <p className="text-red-500">{errors.password}</p>}
                            <div className="space-y-2">
                                <Label htmlFor="storeName" className="text-sm font-medium text-foreground">
                                    Store Name
                                </Label>
                                <Input
                                    id="storeName"
                                    name="storeName"
                                    type="text"
                                    placeholder="Your Store Name"
                                    value={formData.storeName}
                                    onChange={handleChange}
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
                                    name="storeId"
                                    type="text"
                                    placeholder="STORE123"
                                    value={formData.storeId}
                                    onChange={handleChange}
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
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-input border-border"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground cursor-pointer"
                                disabled={isLoading}
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </form>

                        <div className="mt-4 text-center">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account?{" "}
                                <Link to="/register/merchant" className="text-accent hover:underline">
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