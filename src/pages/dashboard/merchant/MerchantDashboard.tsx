"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Check, X, Eye, Bell, TrendingUp, TrendingDown, ShoppingCart, Users, Percent } from "lucide-react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"

const dummyPurchases = [
    {
        id: "REQ001",
        customer: "John Smith",
        amount: 129.99,
        points: 130,
        date: "2024-03-20",
        status: "pending" as const,
        memberId: "MEM001",
    },
    {
        id: "REQ002",
        customer: "Sarah Johnson",
        amount: 24.99,
        points: 25,
        date: "2024-03-20",
        status: "pending" as const,
        memberId: "MEM002",
    },
    {
        id: "REQ003",
        customer: "Mike Wilson",
        amount: 79.99,
        points: 80,
        date: "2024-03-19",
        status: "approved" as const,
        memberId: "MEM003",
    },
    {
        id: "REQ004",
        customer: "Emma Davis",
        amount: 12.99,
        points: 13,
        date: "2024-03-19",
        status: "pending" as const,
        memberId: "MEM004",
    },
    {
        id: "REQ005",
        customer: "David Brown",
        amount: 45.99,
        points: 46,
        date: "2024-03-18",
        status: "rejected" as const,
        memberId: "MEM005",
    },
]

const dummyCustomers = [
    {
        id: "CUST001",
        name: "John Smith",
        memberId: "MEM001",
        pointsBalance: 1250,
        lastPurchaseDate: "2024-03-20",
        email: "john@example.com",
        phone: "+1 (555) 123-4567",
        totalPurchases: 15,
        totalSpent: 1299.85,
        joinDate: "2024-01-15",
        tier: "Gold",
    },
    {
        id: "CUST002",
        name: "Sarah Johnson",
        memberId: "MEM002",
        pointsBalance: 850,
        lastPurchaseDate: "2024-03-19",
        email: "sarah@example.com",
        phone: "+1 (555) 234-5678",
        totalPurchases: 8,
        totalSpent: 649.92,
        joinDate: "2024-02-01",
        tier: "Silver",
    },
    {
        id: "CUST003",
        name: "Mike Wilson",
        memberId: "MEM003",
        pointsBalance: 2100,
        lastPurchaseDate: "2024-03-18",
        email: "mike@example.com",
        phone: "+1 (555) 345-6789",
        totalPurchases: 22,
        totalSpent: 2199.78,
        joinDate: "2024-01-10",
        tier: "Platinum",
    },
]

const dummyNotifications = [
    {
        id: "NOT001",
        title: "New Purchase Request",
        type: "Approval Request" as const,
        message: "John Smith submitted a purchase request for $129.99",
        createdAt: "5 minutes ago",
        read: false,
    },
    {
        id: "NOT002",
        title: "Purchase Approved",
        type: "Info" as const,
        message: "Purchase request REQ003 has been approved",
        createdAt: "1 hour ago",
        read: false,
    },
    {
        id: "NOT003",
        title: "Monthly Report Ready",
        type: "Info" as const,
        message: "Your monthly sales report is now available",
        createdAt: "2 hours ago",
        read: true,
    },
    {
        id: "NOT004",
        title: "New Customer Registration",
        type: "Info" as const,
        message: "Emma Davis joined your loyalty program",
        createdAt: "3 hours ago",
        read: true,
    },
]

const contributionHistory = [
    { date: "2024-03-01", oldRate: 2.0, newRate: 2.5 },
    { date: "2024-02-15", oldRate: 1.8, newRate: 2.0 },
    { date: "2024-01-01", oldRate: 1.5, newRate: 1.8 },
]

const MerchantDashboard = () => {
    const [purchases, setPurchases] = useState(dummyPurchases)
    const [customers] = useState(dummyCustomers)
    const [notifications, setNotifications] = useState(dummyNotifications)
    const [selectedPurchases, setSelectedPurchases] = useState<string[]>([])
    const [customerSearch, setCustomerSearch] = useState("")
    const [customerResults, setCustomerResults] = useState<typeof dummyCustomers>([])
    const [selectedCustomer, setSelectedCustomer] = useState<(typeof dummyCustomers)[0] | null>(null)
    const [contributionRate, setContributionRate] = useState(2.5)
    const [statusFilter, setStatusFilter] = useState("all")
    const [dateFilter, setDateFilter] = useState("all")
    const [isLoading, setIsLoading] = useState(false)

    const stats = {
        pendingApprovals: purchases.filter((p) => p.status === "pending").length,
        approvedToday: purchases.filter((p) => p.status === "approved" && p.date === "2024-03-20").length,
        contributionRate: contributionRate,
        unreadNotifications: notifications.filter((n) => !n.read).length,
        // Mock trend data
        approvalsGrowth: 15.3,
        approvedGrowth: 8.7,
        rateChange: 0.5,
        notificationsGrowth: -12.4,
    }

    const filteredPurchases = purchases.filter((purchase) => {
        const matchesStatus = statusFilter === "all" || purchase.status === statusFilter
        const matchesDate = dateFilter === "all" || purchase.date === dateFilter
        return matchesStatus && matchesDate
    })

    const handlePurchaseAction = async (purchaseId: string, action: "approve" | "reject") => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setPurchases(
            purchases.map((purchase) =>
                purchase.id === purchaseId ? { ...purchase, status: action === "approve" ? "approved" : "rejected" } : purchase,
            ),
        )
        setIsLoading(false)
    }

    const handleBulkAction = async (action: "approve" | "reject") => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setPurchases(
            purchases.map((purchase) =>
                selectedPurchases.includes(purchase.id)
                    ? { ...purchase, status: action === "approve" ? "approved" : "rejected" }
                    : purchase,
            ),
        )
        setSelectedPurchases([])
        setIsLoading(false)
    }

    const handleCustomerSearch = () => {
        if (customerSearch.trim()) {
            const results = customers.filter(
                (customer) =>
                    customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
                    customer.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
                    customer.memberId.toLowerCase().includes(customerSearch.toLowerCase()),
            )
            setCustomerResults(results)
        } else {
            setCustomerResults([])
        }
    }

    const handleSaveContributionRate = async () => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(false)
    }

    const markNotificationAsRead = (notificationId: string) => {
        setNotifications(
            notifications.map((notification) =>
                notification.id === notificationId ? { ...notification, read: true } : notification,
            ),
        )
    }

    const markAllNotificationsAsRead = () => {
        setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
    }

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case "approved":
                return "default"
            case "pending":
                return "secondary"
            case "rejected":
                return "destructive"
            default:
                return "secondary"
        }
    }

    const getTierBadgeVariant = (tier: string) => {
        switch (tier) {
            case "Platinum":
                return "default"
            case "Gold":
                return "secondary"
            case "Silver":
                return "outline"
            default:
                return "outline"
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                                    <p className="text-3xl font-bold">{stats.pendingApprovals}</p>
                                </div>
                                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="flex items-center mt-4 text-sm">
                                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-green-500">{stats.approvalsGrowth}%</span>
                                <span className="text-muted-foreground ml-1">from yesterday</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Approved Today</p>
                                    <p className="text-3xl font-bold">{stats.approvedToday}</p>
                                </div>
                                <Check className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="flex items-center mt-4 text-sm">
                                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-green-500">{stats.approvedGrowth}%</span>
                                <span className="text-muted-foreground ml-1">from yesterday</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Contribution Rate</p>
                                    <p className="text-3xl font-bold">{stats.contributionRate}%</p>
                                </div>
                                <Percent className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="flex items-center mt-4 text-sm">
                                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-green-500">+{stats.rateChange}%</span>
                                <span className="text-muted-foreground ml-1">this month</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Notifications</p>
                                    <p className="text-3xl font-bold">{stats.unreadNotifications}</p>
                                </div>
                                <Bell className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="flex items-center mt-4 text-sm">
                                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                                <span className="text-red-500">{Math.abs(stats.notificationsGrowth)}%</span>
                                <span className="text-muted-foreground ml-1">from yesterday</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Approve Purchases */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Approve Purchases</CardTitle>
                            <CardDescription>Review and approve customer purchase requests</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-full sm:w-40">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={dateFilter} onValueChange={setDateFilter}>
                                    <SelectTrigger className="w-full sm:w-40">
                                        <SelectValue placeholder="Filter by date" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Dates</SelectItem>
                                        <SelectItem value="2024-03-20">Today</SelectItem>
                                        <SelectItem value="2024-03-19">Yesterday</SelectItem>
                                    </SelectContent>
                                </Select>
                                {selectedPurchases.length > 0 && (
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => handleBulkAction("approve")}
                                            disabled={isLoading}
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            Bulk Approve ({selectedPurchases.length})
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleBulkAction("reject")}
                                            disabled={isLoading}
                                        >
                                            Bulk Reject ({selectedPurchases.length})
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-12">
                                                <Checkbox
                                                    checked={selectedPurchases.length === filteredPurchases.length}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setSelectedPurchases(filteredPurchases.map((p) => p.id))
                                                        } else {
                                                            setSelectedPurchases([])
                                                        }
                                                    }}
                                                />
                                            </TableHead>
                                            <TableHead>Request ID</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Points</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {isLoading ? (
                                            Array.from({ length: 3 }).map((_, i) => (
                                                <TableRow key={i}>
                                                    <TableCell>
                                                        <Skeleton className="h-4 w-4" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Skeleton className="h-4 w-20" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Skeleton className="h-4 w-24" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Skeleton className="h-4 w-16" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Skeleton className="h-4 w-12" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Skeleton className="h-4 w-20" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Skeleton className="h-4 w-16" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Skeleton className="h-4 w-20" />
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : filteredPurchases.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={8} className="text-center py-8">
                                                    <div className="text-muted-foreground">
                                                        <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                                        <p className="text-lg font-medium">No purchase requests</p>
                                                        <p className="text-sm">Purchase requests will appear here when submitted</p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredPurchases.map((purchase) => (
                                                <TableRow key={purchase.id}>
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={selectedPurchases.includes(purchase.id)}
                                                            onCheckedChange={(checked) => {
                                                                if (checked) {
                                                                    setSelectedPurchases([...selectedPurchases, purchase.id])
                                                                } else {
                                                                    setSelectedPurchases(selectedPurchases.filter((id) => id !== purchase.id))
                                                                }
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="font-medium">{purchase.id}</TableCell>
                                                    <TableCell>{purchase.customer}</TableCell>
                                                    <TableCell>${purchase.amount}</TableCell>
                                                    <TableCell>{purchase.points}</TableCell>
                                                    <TableCell className="text-muted-foreground">{purchase.date}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={getStatusBadgeVariant(purchase.status)}>
                                                            {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {purchase.status === "pending" ? (
                                                            <div className="flex items-center justify-end gap-2">
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => handlePurchaseAction(purchase.id, "approve")}
                                                                    disabled={isLoading}
                                                                    className="text-green-600 hover:text-green-700"
                                                                >
                                                                    <Check className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => handlePurchaseAction(purchase.id, "reject")}
                                                                    disabled={isLoading}
                                                                    className="text-red-600 hover:text-red-700"
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <Button variant="ghost" size="sm">
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Lookup Customer */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Lookup Customer</CardTitle>
                            <CardDescription>Search and view customer information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search by name, email, or member ID..."
                                        value={customerSearch}
                                        onChange={(e) => setCustomerSearch(e.target.value)}
                                        className="pl-10"
                                        onKeyDown={(e) => e.key === "Enter" && handleCustomerSearch()}
                                    />
                                </div>
                                <Button onClick={handleCustomerSearch}>Search</Button>
                            </div>

                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {customerResults.length === 0 && customerSearch ? (
                                    <p className="text-center text-muted-foreground py-4">No customers found</p>
                                ) : (
                                    customerResults.map((customer) => (
                                        <div key={customer.id} className="border rounded-lg p-4 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium">{customer.name}</h4>
                                                <Badge variant={getTierBadgeVariant(customer.tier)}>{customer.tier}</Badge>
                                            </div>
                                            <div className="text-sm text-muted-foreground space-y-1">
                                                <p>Member ID: {customer.memberId}</p>
                                                <p>Points Balance: {customer.pointsBalance}</p>
                                                <p>Last Purchase: {customer.lastPurchaseDate}</p>
                                            </div>
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full bg-transparent"
                                                        onClick={() => setSelectedCustomer(customer)}
                                                    >
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        View Profile
                                                    </Button>
                                                </SheetTrigger>
                                                <SheetContent>
                                                    <SheetHeader>
                                                        <SheetTitle>Customer Profile</SheetTitle>
                                                        <SheetDescription>Detailed customer information and history</SheetDescription>
                                                    </SheetHeader>
                                                    {selectedCustomer && (
                                                        <div className="mt-6 space-y-6">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                                                                    <Users className="h-8 w-8 text-muted-foreground" />
                                                                </div>
                                                                <div>
                                                                    <h3 className="text-lg font-semibold">{selectedCustomer.name}</h3>
                                                                    <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                                                                    <Badge variant={getTierBadgeVariant(selectedCustomer.tier)} className="mt-1">
                                                                        {selectedCustomer.tier} Member
                                                                    </Badge>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <Label className="text-sm font-medium">Member ID</Label>
                                                                    <p className="text-sm text-muted-foreground">{selectedCustomer.memberId}</p>
                                                                </div>
                                                                <div>
                                                                    <Label className="text-sm font-medium">Phone</Label>
                                                                    <p className="text-sm text-muted-foreground">{selectedCustomer.phone}</p>
                                                                </div>
                                                                <div>
                                                                    <Label className="text-sm font-medium">Points Balance</Label>
                                                                    <p className="text-sm font-semibold text-primary">{selectedCustomer.pointsBalance}</p>
                                                                </div>
                                                                <div>
                                                                    <Label className="text-sm font-medium">Total Purchases</Label>
                                                                    <p className="text-sm text-muted-foreground">{selectedCustomer.totalPurchases}</p>
                                                                </div>
                                                                <div>
                                                                    <Label className="text-sm font-medium">Total Spent</Label>
                                                                    <p className="text-sm text-muted-foreground">${selectedCustomer.totalSpent}</p>
                                                                </div>
                                                                <div>
                                                                    <Label className="text-sm font-medium">Join Date</Label>
                                                                    <p className="text-sm text-muted-foreground">{selectedCustomer.joinDate}</p>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <Label className="text-sm font-medium mb-2 block">Recent Purchases</Label>
                                                                <div className="space-y-2">
                                                                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                                                                        <span className="text-sm">Wireless Headphones</span>
                                                                        <span className="text-sm font-medium">$129.99</span>
                                                                    </div>
                                                                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                                                                        <span className="text-sm">Bluetooth Speaker</span>
                                                                        <span className="text-sm font-medium">$79.99</span>
                                                                    </div>
                                                                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                                                                        <span className="text-sm">Phone Case</span>
                                                                        <span className="text-sm font-medium">$24.99</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </SheetContent>
                                            </Sheet>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Set Contribution Rate */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Set Contribution Rate</CardTitle>
                            <CardDescription>Configure your store's contribution percentage</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="contributionRate">Contribution Rate (%)</Label>
                                <Input
                                    id="contributionRate"
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    value={contributionRate}
                                    onChange={(e) => setContributionRate(Number.parseFloat(e.target.value) || 0)}
                                    placeholder="Enter percentage"
                                />
                                <p className="text-sm text-muted-foreground">Current rate: {contributionRate}% of each transaction</p>
                            </div>
                            <Button onClick={handleSaveContributionRate} disabled={isLoading} className="w-full">
                                {isLoading ? "Saving..." : "Save Rate"}
                            </Button>

                            <div className="mt-4">
                                <Label className="text-sm font-medium mb-2 block">Change History</Label>
                                <div className="space-y-2">
                                    {contributionHistory.map((change, index) => (
                                        <div key={index} className="flex justify-between items-center text-sm p-2 bg-muted rounded">
                                            <span className="text-muted-foreground">{change.date}</span>
                                            <span>
                                                {change.oldRate}% → {change.newRate}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Notifications</CardTitle>
                                <CardDescription>Recent activity and approval requests</CardDescription>
                            </div>
                            {notifications.filter((n) => !n.read).length > 0 && (
                                <Button variant="outline" size="sm" onClick={markAllNotificationsAsRead}>
                                    Mark all as read
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {notifications.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p className="text-lg font-medium">No notifications</p>
                                    <p className="text-sm">You're all caught up!</p>
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${!notification.read ? "bg-accent/10 border-accent" : "hover:bg-muted/50"
                                            }`}
                                        onClick={() => markNotificationAsRead(notification.id)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <p
                                                        className={`text-sm font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                                                    >
                                                        {notification.title}
                                                    </p>
                                                    <Badge variant="outline" className="text-xs">
                                                        {notification.type}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{notification.message}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{notification.createdAt}</p>
                                            </div>
                                            {!notification.read && <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}

export default MerchantDashboard