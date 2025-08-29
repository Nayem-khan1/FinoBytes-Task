import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const memberLoginSchema = z.object({
    emailOrPhone: z.string().min(3),
    password: z.string().min(6),
});

const MemberLogin: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ emailOrPhone?: string, password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("password");
    const [error, setError] = useState("");
    const [phoneEmail, setPhoneEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otpCode, setOtpCode] = useState("");

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const result = memberLoginSchema.safeParse({ emailOrPhone: phoneEmail, password });
        if (result.success) {
            dispatch(loginSuccess({ role: 'member', token: 'member-token' }));
            navigate('/dashboard/member');
        } else {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors({
                emailOrPhone: fieldErrors.emailOrPhone?.[0],
                password: fieldErrors.password?.[0],
            });
        }

        setIsLoading(false);
    };

    const handleSendOtp = async () => {
        setIsLoading(true);
        setError("");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setShowOtpInput(true);
        setIsLoading(false);
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch(loginSuccess({ role: 'member', token: 'member-token' }));
        navigate('/dashboard/member');
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
                        <CardTitle className="text-2xl font-semibold text-foreground">Member Login</CardTitle>
                        <CardDescription className="text-muted-foreground">Access your member account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="password">Password</TabsTrigger>
                                <TabsTrigger value="otp">OTP</TabsTrigger>
                            </TabsList>

                            <TabsContent value="password" className="space-y-4 mt-4">
                                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                    {errors.emailOrPhone && <p className="text-red-500">{errors.emailOrPhone}</p>}
                                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                                    <div className="space-y-2">
                                        <Label htmlFor="phoneEmail" className="text-sm font-medium text-foreground">
                                            Phone or Email
                                        </Label>
                                        <Input
                                            id="phoneEmail"
                                            type="text"
                                            placeholder="phone@example.com or +1234567890"
                                            value={phoneEmail}
                                            onChange={(e) => setPhoneEmail(e.target.value)}
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
                                        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Logging in..." : "Login"}
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="otp" className="space-y-4 mt-4">
                                {error && (
                                    <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
                                        {error}
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <Label htmlFor="phoneEmailOtp" className="text-sm font-medium text-foreground">
                                        Phone or Email
                                    </Label>
                                    <Input
                                        id="phoneEmailOtp"
                                        type="text"
                                        placeholder="phone@example.com or +1234567890"
                                        value={phoneEmail}
                                        onChange={(e) => setPhoneEmail(e.target.value)}
                                        required
                                        className="w-full bg-input border-border"
                                    />
                                </div>

                                {!showOtpInput ? (
                                    <Button
                                        onClick={handleSendOtp}
                                        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Sending OTP..." : "Send OTP"}
                                    </Button>
                                ) : (
                                    <form onSubmit={handleOtpSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="otpCode" className="text-sm font-medium text-foreground">
                                                Enter OTP Code
                                            </Label>
                                            <Input
                                                id="otpCode"
                                                type="text"
                                                placeholder="123456"
                                                value={otpCode}
                                                onChange={(e) => setOtpCode(e.target.value)}
                                                required
                                                maxLength={6}
                                                className="w-full bg-input border-border text-center text-lg tracking-widest"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Verifying..." : "Verify OTP"}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setShowOtpInput(false)}
                                            className="w-full bg-transparent"
                                        >
                                            Back to Send OTP
                                        </Button>
                                    </form>
                                )}
                            </TabsContent>
                        </Tabs>

                        <div className="mt-4 text-center">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account?{" "}
                                <Link to="/register/member" className="text-secondary hover:underline">
                                    Create Member Account
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default MemberLogin;