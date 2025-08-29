import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Users, Store, Star, LogOut, Menu, X, Shield, ShoppingBag, Award } from "lucide-react"
import { Link } from "react-router"

interface NavigationProps {
    userRole?: "admin" | "merchant" | "member"
    className?: string
}

export function Navigation({ userRole, className }: NavigationProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    const handleLogout = () => {
        localStorage.removeItem("userRole")
        localStorage.removeItem("userEmail")
        localStorage.removeItem("userPhone")
        localStorage.removeItem("storeName")
        localStorage.removeItem("storeId")
        router.push("/")
    }

    const getNavigationItems = () => {
        const baseItems = [{ href: "/", label: "Home", icon: Home, roles: ["admin", "merchant", "member"] }]

        const roleSpecificItems = {
            admin: [
                { href: "/dashboard/admin", label: "Admin Dashboard", icon: Shield },
                { href: "/login/merchant", label: "Merchant Login", icon: Store },
                { href: "/login/member", label: "Member Login", icon: Star },
            ],
            merchant: [
                { href: "/dashboard/merchant", label: "Merchant Dashboard", icon: ShoppingBag },
                { href: "/login/admin", label: "Admin Login", icon: Shield },
                { href: "/login/member", label: "Member Login", icon: Star },
            ],
            member: [
                { href: "/dashboard/member", label: "Member Dashboard", icon: Award },
                { href: "/login/admin", label: "Admin Login", icon: Shield },
                { href: "/login/merchant", label: "Merchant Login", icon: Store },
            ],
        }

        return [
            ...baseItems,
            ...(userRole
                ? roleSpecificItems[userRole]
                : [
                    { href: "/login/admin", label: "Admin Login", icon: Shield },
                    { href: "/login/merchant", label: "Merchant Login", icon: Store },
                    { href: "/login/member", label: "Member Login", icon: Star },
                ]),
        ]
    }

    const navigationItems = getNavigationItems()

    const getRoleBadgeVariant = (role: string) => {
        switch (role) {
            case "admin":
                return "destructive"
            case "merchant":
                return "default"
            case "member":
                return "secondary"
            default:
                return "outline"
        }
    }

    return (
        <nav className={`bg-card border-b ${className}`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary-foreground" />
                        </div>
                        RoleAuth
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4">
                        {navigationItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href

                            return (
                                <Button key={item.href} asChild variant={isActive ? "default" : "ghost"} size="sm">
                                    <Link href={item.href} className="flex items-center gap-2">
                                        <Icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                </Button>
                            )
                        })}

                        {userRole && (
                            <>
                                <Badge variant={getRoleBadgeVariant(userRole)} className="ml-2">
                                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                                </Badge>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-transparent"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <Card className="md:hidden mt-2 mb-4 p-4">
                        <div className="flex flex-col gap-2">
                            {navigationItems.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href

                                return (
                                    <Button
                                        key={item.href}
                                        asChild
                                        variant={isActive ? "default" : "ghost"}
                                        size="sm"
                                        className="justify-start"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Link href={item.href} className="flex items-center gap-2">
                                            <Icon className="h-4 w-4" />
                                            {item.label}
                                        </Link>
                                    </Button>
                                )
                            })}

                            {userRole && (
                                <div className="flex items-center justify-between pt-2 border-t">
                                    <Badge variant={getRoleBadgeVariant(userRole)}>
                                        {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                                    </Badge>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 bg-transparent"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Card>
                )}
            </div>
        </nav>
    )
}
