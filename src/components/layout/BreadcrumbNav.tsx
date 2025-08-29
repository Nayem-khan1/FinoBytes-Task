
import { ChevronRight, Home } from "lucide-react"
import { Link } from "react-router"

export function BreadcrumbNav() {
    const pathname = usePathname()

    // Don't show breadcrumbs on home page
    if (pathname === "/") return null

    const pathSegments = pathname.split("/").filter(Boolean)

    const breadcrumbs = [{ label: "Home", href: "/", icon: Home }]

    // Build breadcrumb trail
    let currentPath = ""
    pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`

        let label = segment.charAt(0).toUpperCase() + segment.slice(1)

        // Custom labels for specific routes
        if (segment === "dashboard") {
            label = "Dashboard"
        } else if (segment === "login") {
            label = "Login"
        } else if (segment === "admin") {
            label = "Admin"
        } else if (segment === "merchant") {
            label = "Merchant"
        } else if (segment === "member") {
            label = "Member"
        }

        breadcrumbs.push({
            label,
            href: currentPath,
        })
    })

    return (
        <nav className="bg-muted/30 border-b px-4 py-2">
            <div className="container mx-auto">
                <ol className="flex items-center gap-2 text-sm">
                    {breadcrumbs.map((breadcrumb, index) => {
                        const isLast = index === breadcrumbs.length - 1
                        const Icon = breadcrumb.icon

                        return (
                            <li key={breadcrumb.href} className="flex items-center gap-2">
                                {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                                {isLast ? (
                                    <span className="flex items-center gap-1 text-foreground font-medium">
                                        {Icon && <Icon className="h-4 w-4" />}
                                        {breadcrumb.label}
                                    </span>
                                ) : (
                                    <Link
                                        to={breadcrumb.href}
                                        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {Icon && <Icon className="h-4 w-4" />}
                                        {breadcrumb.label}
                                    </Link>
                                )}
                            </li>
                        )
                    })}
                </ol>
            </div>
        </nav>
    )
}
