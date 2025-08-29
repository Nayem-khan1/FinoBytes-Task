import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, UserCheck, UserX, Eye, TrendingUp, TrendingDown, Users, Store, Mail } from "lucide-react"

const dummyUsers = [
    {
        id: "1",
        name: "John Smith",
        email: "john@example.com",
        role: "member" as const,
        status: "active" as const,
        createdAt: "2024-01-15",
        storeId: null,
        storeName: null,
    },
    {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        role: "member" as const,
        status: "suspended" as const,
        createdAt: "2024-02-20",
        storeId: null,
        storeName: null,
    },
    {
        id: "3",
        name: "Mike Chen",
        email: "mike@electronics.com",
        role: "merchant" as const,
        status: "active" as const,
        createdAt: "2024-01-10",
        storeId: "ELEC001",
        storeName: "Mike's Electronics",
    },
    {
        id: "4",
        name: "Emma Wilson",
        email: "emma@example.com",
        role: "member" as const,
        status: "active" as const,
        createdAt: "2024-03-05",
        storeId: null,
        storeName: null,
    },
    {
        id: "5",
        name: "Alex Rodriguez",
        email: "alex@techstore.com",
        role: "merchant" as const,
        status: "pending" as const,
        createdAt: "2024-03-15",
        storeId: "TECH002",
        storeName: "Tech Store Plus",
    },
    {
        id: "6",
        name: "David Brown",
        email: "david@example.com",
        role: "member" as const,
        status: "active" as const,
        createdAt: "2024-02-28",
        storeId: null,
        storeName: null,
    },
    {
        id: "7",
        name: "Lisa Park",
        email: "lisa@fashionhub.com",
        role: "merchant" as const,
        status: "active" as const,
        createdAt: "2024-01-25",
        storeId: "FASH003",
        storeName: "Fashion Hub",
    },
    {
        id: "8",
        name: "Robert Garcia",
        email: "robert@example.com",
        role: "admin" as const,
        status: "active" as const,
        createdAt: "2024-01-01",
        storeId: null,
        storeName: null,
    },
]

const AdminDashboard = () => {
    const [users, setUsers] = useState(dummyUsers)
    const [searchTerm, setSearchTerm] = useState("")
    const [roleFilter, setRoleFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")
    const [isLoading, setIsLoading] = useState(false)
    const [selectedUser, setSelectedUser] = useState<(typeof dummyUsers)[0] | null>(null)
    const [showCreateMerchant, setShowCreateMerchant] = useState(false)
    const [showInviteAdmin, setShowInviteAdmin] = useState(false)
    const [newMerchant, setNewMerchant] = useState({
        storeName: "",
        storeId: "",
        ownerEmail: "",
        password: "",
    })
    const [inviteEmail, setInviteEmail] = useState("")

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.storeName && user.storeName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user.storeId && user.storeId.toLowerCase().includes(searchTerm.toLowerCase()))
        const matchesRole = roleFilter === "all" || user.role === roleFilter
        const matchesStatus = statusFilter === "all" || user.status === statusFilter

        return matchesSearch && matchesRole && matchesStatus
    })

    const stats = {
        totalUsers: users.length,
        totalMerchants: users.filter((u) => u.role === "merchant").length,
        activeUsers: users.filter((u) => u.status === "active").length,
        pendingUsers: users.filter((u) => u.status === "pending").length,
        // Mock trend data
        userGrowth: 12.5,
        merchantGrowth: 8.3,
        activeGrowth: 5.2,
        pendingGrowth: -15.7,
    }

    const handleStatusChange = async (userId: string, newStatus: "active" | "suspended") => {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
        setIsLoading(false)
    }

    const handleCreateMerchant = async () => {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const newUser = {
            id: (users.length + 1).toString(),
            name: newMerchant.storeName,
            email: newMerchant.ownerEmail,
            role: "merchant" as const,
            status: "pending" as const,
            createdAt: new Date().toISOString().split("T")[0],
            storeId: newMerchant.storeId,
            storeName: newMerchant.storeName,
        }

        setUsers([newUser, ...users])
        setNewMerchant({ storeName: "", storeId: "", ownerEmail: "", password: "" })
        setShowCreateMerchant(false)
        setIsLoading(false)
    }

    const handleInviteAdmin = async () => {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // In real app, this would send an invitation email
        console.log(`Invitation sent to ${inviteEmail}`)
        setInviteEmail("")
        setShowInviteAdmin(false)
        setIsLoading(false)
    }

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case "active":
                return "default"
            case "suspended":
                return "destructive"
            case "pending":
                return "secondary"
            default:
                return "secondary"
        }
    }

    const getRoleBadgeVariant = (role: string) => {
        switch (role) {
            case "admin":
                return "destructive"
            case "merchant":
                return "default"
            case "member":
                return "secondary"
            default:
                return "secondary"
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                                    <p className="text-3xl font-bold">{stats.totalUsers}</p>
                                </div>
                                <Users className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="flex items-center mt-4 text-sm">
                                {stats.userGrowth > 0 ? (
                                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                ) : (
                                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                                )}
                                <span className={stats.userGrowth > 0 ? "text-green-500" : "text-red-500"}>
                                    {Math.abs(stats.userGrowth)}%
                                </span>
                                <span className="text-muted-foreground ml-1">from last month</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Merchants</p>
                                    <p className="text-3xl font-bold">{stats.totalMerchants}</p>
                                </div>
                                <Store className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="flex items-center mt-4 text-sm">
                                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-green-500">{stats.merchantGrowth}%</span>
                                <span className="text-muted-foreground ml-1">from last month</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Active</p>
                                    <p className="text-3xl font-bold">{stats.activeUsers}</p>
                                </div>
                                <UserCheck className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="flex items-center mt-4 text-sm">
                                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-green-500">{stats.activeGrowth}%</span>
                                <span className="text-muted-foreground ml-1">from last month</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Pending</p>
                                    <p className="text-3xl font-bold">{stats.pendingUsers}</p>
                                </div>
                                <UserX className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="flex items-center mt-4 text-sm">
                                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                                <span className="text-red-500">{Math.abs(stats.pendingGrowth)}%</span>
                                <span className="text-muted-foreground ml-1">from last month</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Users & Merchants</CardTitle>
                        <CardDescription>Manage all users and merchants in the system</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search by name, email, or store..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select value={roleFilter} onValueChange={setRoleFilter}>
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Filter by role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Roles</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="merchant">Merchant</SelectItem>
                                    <SelectItem value="member">Member</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="suspended">Suspended</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Email/Store ID</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading ? (
                                        Array.from({ length: 5 }).map((_, i) => (
                                            <TableRow key={i}>
                                                <TableCell>
                                                    <Skeleton className="h-4 w-32" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton className="h-4 w-16" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton className="h-4 w-40" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton className="h-4 w-16" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton className="h-4 w-20" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton className="h-4 w-20" />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : filteredUsers.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8">
                                                <div className="text-muted-foreground">
                                                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                                    <p className="text-lg font-medium">No users found</p>
                                                    <p className="text-sm">Try adjusting your search or filter criteria</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell className="font-medium">{user.name}</TableCell>
                                                <TableCell>
                                                    <Badge variant={getRoleBadgeVariant(user.role)}>
                                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {user.role === "merchant" ? (
                                                        <div>
                                                            <div>{user.email}</div>
                                                            <div className="text-xs text-muted-foreground">{user.storeId}</div>
                                                        </div>
                                                    ) : (
                                                        user.email
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={getStatusBadgeVariant(user.status)}>
                                                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">{user.createdAt}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button variant="ghost" size="sm" onClick={() => setSelectedUser(user)}>
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        {user.status !== "pending" && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleStatusChange(user.id, user.status === "active" ? "suspended" : "active")
                                                                }
                                                                disabled={isLoading}
                                                            >
                                                                {user.status === "active" ? (
                                                                    <UserX className="h-4 w-4" />
                                                                ) : (
                                                                    <UserCheck className="h-4 w-4" />
                                                                )}
                                                            </Button>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Perform common administrative tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Dialog open={showCreateMerchant} onOpenChange={setShowCreateMerchant}>
                                <DialogTrigger asChild>
                                    <Button className="flex items-center gap-2">
                                        <Store className="h-4 w-4" />
                                        Create Merchant
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Create Merchant Account</DialogTitle>
                                        <DialogDescription>Add a new merchant to the platform</DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="storeName">Store Name</Label>
                                            <Input
                                                id="storeName"
                                                value={newMerchant.storeName}
                                                onChange={(e) => setNewMerchant({ ...newMerchant, storeName: e.target.value })}
                                                placeholder="Enter store name"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="storeId">Store ID</Label>
                                            <Input
                                                id="storeId"
                                                value={newMerchant.storeId}
                                                onChange={(e) => setNewMerchant({ ...newMerchant, storeId: e.target.value })}
                                                placeholder="STORE123"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="ownerEmail">Owner Email</Label>
                                            <Input
                                                id="ownerEmail"
                                                type="email"
                                                value={newMerchant.ownerEmail}
                                                onChange={(e) => setNewMerchant({ ...newMerchant, ownerEmail: e.target.value })}
                                                placeholder="owner@store.com"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                value={newMerchant.password}
                                                onChange={(e) => setNewMerchant({ ...newMerchant, password: e.target.value })}
                                                placeholder="Enter password"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setShowCreateMerchant(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleCreateMerchant} disabled={isLoading}>
                                            {isLoading ? "Creating..." : "Create Merchant"}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <Dialog open={showInviteAdmin} onOpenChange={setShowInviteAdmin}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                                        <Mail className="h-4 w-4" />
                                        Invite Admin
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Invite Admin</DialogTitle>
                                        <DialogDescription>Send an invitation to join as an administrator</DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="inviteEmail">Email Address</Label>
                                            <Input
                                                id="inviteEmail"
                                                type="email"
                                                value={inviteEmail}
                                                onChange={(e) => setInviteEmail(e.target.value)}
                                                placeholder="admin@example.com"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setShowInviteAdmin(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleInviteAdmin} disabled={isLoading}>
                                            {isLoading ? "Sending..." : "Send Invitation"}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>

                <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>User Details</DialogTitle>
                            <DialogDescription>View detailed information about this user</DialogDescription>
                        </DialogHeader>
                        {selectedUser && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium">Name</Label>
                                        <p className="text-sm text-muted-foreground">{selectedUser.name}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">Role</Label>
                                        <Badge variant={getRoleBadgeVariant(selectedUser.role)} className="mt-1">
                                            {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                                        </Badge>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">Email</Label>
                                        <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">Status</Label>
                                        <Badge variant={getStatusBadgeVariant(selectedUser.status)} className="mt-1">
                                            {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                                        </Badge>
                                    </div>
                                    {selectedUser.role === "merchant" && (
                                        <>
                                            <div>
                                                <Label className="text-sm font-medium">Store Name</Label>
                                                <p className="text-sm text-muted-foreground">{selectedUser.storeName}</p>
                                            </div>
                                            <div>
                                                <Label className="text-sm font-medium">Store ID</Label>
                                                <p className="text-sm text-muted-foreground">{selectedUser.storeId}</p>
                                            </div>
                                        </>
                                    )}
                                    <div>
                                        <Label className="text-sm font-medium">Created At</Label>
                                        <p className="text-sm text-muted-foreground">{selectedUser.createdAt}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setSelectedUser(null)}>
                                Close
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </DashboardLayout>
    )
}

export default AdminDashboard;