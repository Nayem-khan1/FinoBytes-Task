
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Store, User } from "lucide-react"
import { Link } from "react-router"

const Landing = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                        Welcome to Your Dashboard
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                        Access your personalized dashboard based on your role. Choose your login type to get started.
                    </p>
                </div>

                {/* Role Selection Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {/* Admin Card */}
                    <Card className="hover:shadow-lg transition-shadow duration-300 border-border">
                        <CardHeader className="text-center pb-4">
                            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                                <Shield className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="text-xl font-semibold">Admin Portal</CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Manage users, merchants, and system settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <Link to="/login/admin" className="block">
                                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                                    Login as Admin
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Merchant Card */}
                    <Card className="hover:shadow-lg transition-shadow duration-300 border-border">
                        <CardHeader className="text-center pb-4">
                            <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                                <Store className="h-8 w-8 text-accent" />
                            </div>
                            <CardTitle className="text-xl font-semibold">Merchant Portal</CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Manage your store, approve purchases, and track customers
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <Link to="/login/merchant" className="block">
                                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                    Login as Merchant
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Member Card */}
                    <Card className="hover:shadow-lg transition-shadow duration-300 border-border">
                        <CardHeader className="text-center pb-4">
                            <div className="mx-auto mb-4 p-3 bg-secondary/10 rounded-full w-fit">
                                <User className="h-8 w-8 text-secondary" />
                            </div>
                            <CardTitle className="text-xl font-semibold">Member Portal</CardTitle>
                            <CardDescription className="text-muted-foreground">
                                View your points, rewards, and activity history
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <Link to="/login/member" className="block">
                                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                                    Login as Member
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Registration Section */}
                <div className="mt-16 text-center">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">New to the platform?</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/register/admin">
                            <Button variant="outline" className="text-primary border-primary hover:bg-primary/10 bg-transparent">
                                Register as Admin
                            </Button>
                        </Link>
                        <Link to="/register/merchant">
                            <Button variant="outline" className="text-accent border-accent hover:bg-accent/10 bg-transparent">
                                Register as Merchant
                            </Button>
                        </Link>
                        <Link to="/register/member">
                            <Button
                                variant="outline"
                                className="text-secondary border-secondary hover:bg-secondary/10 bg-transparent"
                            >
                                Register as Member
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Feature Highlights */}
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-center text-foreground mb-12">Platform Capabilities</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <Card className="text-center">
                            <CardHeader>
                                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                                <CardTitle className="text-lg">Admin Control</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Complete user and merchant management with advanced controls and analytics
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <Store className="h-12 w-12 text-accent mx-auto mb-4" />
                                <CardTitle className="text-lg">Merchant Tools</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Purchase approvals, customer lookup, and contribution rate management
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <User className="h-12 w-12 text-secondary mx-auto mb-4" />
                                <CardTitle className="text-lg">Member Benefits</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Points tracking, rewards redemption, and activity history</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Additional Info Section */}
                <div className="mt-16 text-center">
                    <p className="text-muted-foreground">Need help? Contact our support team for assistance with your account.</p>
                </div>

                {/* Footer */}
                <footer className="mt-20 pt-8 border-t border-border text-center">
                    <p className="text-sm text-muted-foreground">
                        Role-based Dashboard Demo v1.0 |
                        <Link to="#" className="hover:text-foreground ml-1">
                            Privacy Policy
                        </Link>{" "}
                        |
                        <Link to="#" className="hover:text-foreground ml-1">
                            Terms of Service
                        </Link>
                    </p>
                </footer>
            </div>
        </div>
    )
}

export default Landing