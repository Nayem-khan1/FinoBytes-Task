import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft } from "lucide-react"
import { Link } from "react-router"

function NotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md text-center shadow-lg">
                <CardHeader>
                    <CardTitle className="text-6xl font-bold text-muted-foreground">404</CardTitle>
                    <CardDescription className="text-xl">Page Not Found</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Button asChild variant="default">
                            <Link to="/" className="flex items-center gap-2">
                                <Home className="h-4 w-4" />
                                Go Home
                            </Link>
                        </Button>
                        <Button asChild variant="outline" onClick={() => window.history.back()}>
                            <span className="flex items-center gap-2 cursor-pointer">
                                <ArrowLeft className="h-4 w-4" />
                                Go Back
                            </span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default NotFound