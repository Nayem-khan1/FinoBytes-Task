import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Menu,
    Home,
    Users,
    Settings,
    LogOut,
    Search,
    Bell,
    Award,
    Zap,
    UserCheck,
    Percent,
    Gift,
    History,
    ShieldCheck,
} from "lucide-react"

interface NavigationItem {
    name: string
    href: string
    icon: React.ComponentType<{ className?: string }>
    current?: boolean
}

interface DashboardLayoutProps {
    children: React.ReactNode
}

const navigationConfig = {
    admin: [
        { name: "Overview", href: "/dashboard/admin", icon: Home },
        { name: "Users & Merchants", href: "/dashboard/admin/users", icon: Users },
        { name: "Quick Actions", href: "/dashboard/admin/actions", icon: Zap },
        { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ],
    merchant: [
        { name: "Overview", href: "/dashboard/merchant", icon: Home },
        { name: "Approvals", href: "/dashboard/merchant/approvals", icon: UserCheck },
        { name: "Customers", href: "/dashboard/merchant/customers", icon: Search },
        { name: "Contribution", href: "/dashboard/merchant/contribution", icon: Percent },
        { name: "Notifications", href: "/dashboard/merchant/notifications", icon: Bell },
        { name: "Settings", href: "/dashboard/merchant/settings", icon: Settings },
    ],
    member: [
        { name: "Overview", href: "/dashboard/member", icon: Home },
        { name: "Points", href: "/dashboard/member/points", icon: Award },
        { name: "Rewards", href: "/dashboard/member/rewards", icon: Gift },
        { name: "Activity", href: "/dashboard/member/activity", icon: History },
        { name: "Settings", href: "/dashboard/member/settings", icon: Settings },
    ],
}

const roleLabels = {
    admin: "Admin Portal",
    merchant: "Merchant Portal",
    member: "Member Portal",
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [notificationCount, setNotificationCount] = useState(3) // Mock notification count
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const currentUser = authHelpers.getUser()
        if (!currentUser) {
            router.push("/")
            return
        }
        setUser(currentUser)
    }, [router])

    if (!user) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }

    const navigation = navigationConfig[user.role as UserRole].map((item) => ({
        ...item,
        current: pathname === item.href,
    }))

    const handleLogout = () => {
        authHelpers.logout()
        router.push("/")
    }

    const getBreadcrumbs = () => {
        const pathSegments = pathname.split("/").filter(Boolean)
        const breadcrumbs = []

        if (pathSegments.length > 2) {
            breadcrumbs.push({
                name: roleLabels[user.role as UserRole],
                href: `/dashboard/${user.role}`,
            })

            const currentNav = navigation.find((nav) => nav.href === pathname)
            if (currentNav) {
                breadcrumbs.push({
                    name: currentNav.name,
                    href: pathname,
                })
            }
        }

        return breadcrumbs
    }

    const SidebarContent = () => (
        <div className="flex h-full flex-col bg-sidebar border-r border-sidebar-border">
            {/* Logo/Brand */}
            <div className="flex h-16 shrink-0 items-center px-6 border-b border-sidebar-border">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-sidebar-primary" />
                    <h1 className="text-lg font-semibold text-sidebar-foreground">{roleLabels[user.role as UserRole]}</h1>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col px-4 py-4">
                <ul className="flex flex-1 flex-col gap-y-2">
                    {navigation.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={`group flex gap-x-3 rounded-md p-3 text-sm font-medium transition-colors ${item.current
                                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <item.icon className="h-5 w-5 shrink-0" />
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* User info at bottom */}
            <div className="border-t border-sidebar-border p-4">
                <div className="flex items-center gap-x-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                            {user.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        <Badge variant="secondary" className="text-xs mt-1">
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    )

    const breadcrumbs = getBreadcrumbs()

    return (
        <div className="flex h-screen bg-background">
            {/* Desktop Sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <SidebarContent />
            </div>

            {/* Mobile Sidebar */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetContent side="left" className="p-0 w-72">
                    <SidebarContent />
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <div className="lg:pl-72 flex flex-1 flex-col">
                {/* Top Navigation */}
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-card px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    {/* Mobile menu button */}
                    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="sm" className="lg:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Open sidebar</span>
                            </Button>
                        </SheetTrigger>
                    </Sheet>

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <div className="flex flex-1 items-center">
                            {breadcrumbs.length > 0 && (
                                <nav className="flex" aria-label="Breadcrumb">
                                    <ol className="flex items-center space-x-2">
                                        {breadcrumbs.map((crumb, index) => (
                                            <li key={crumb.href} className="flex items-center">
                                                {index > 0 && <span className="text-muted-foreground mx-2">/</span>}
                                                <Link
                                                    href={crumb.href}
                                                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                                                >
                                                    {crumb.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ol>
                                </nav>
                            )}
                        </div>

                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            {/* Search */}
                            <div className="relative hidden sm:block">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="pl-10 w-64"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Notifications */}
                            <Button variant="ghost" size="sm" className="relative">
                                <Bell className="h-5 w-5" />
                                {notificationCount > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                                        {notificationCount}
                                    </Badge>
                                )}
                                <span className="sr-only">Notifications</span>
                            </Button>

                            {/* User menu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                            <AvatarFallback>
                                                {user.name
                                                    .split(" ")
                                                    .map((n: string) => n[0])
                                                    .join("")
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href={`/dashboard/${user.role}/settings`}>
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </div>
    )
}
