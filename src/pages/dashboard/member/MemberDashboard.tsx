"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star, Gift, TrendingUp, TrendingDown, Calendar, Award, User, Mail, Phone, History } from "lucide-react"

const memberData = {
    totalEarned: 2450,
    totalRedeemed: 850,
    currentBalance: 1600,
    membershipLevel: "Gold" as const,
    nextLevelPoints: 400,
    nextLevel: "Platinum" as const,
    joinDate: "2024-01-15",
    memberId: "MEM001",
    phone: "+1 (555) 123-4567",
    // Mock trend data
    earnedGrowth: 12.5,
    redeemedGrowth: -8.3,
    balanceGrowth: 15.7,
}

const recentActivities = [
    {
        id: "ACT001",
        date: "2024-03-20",
        label: "Purchase at Tech Store Plus",
        deltaPoints: 125,
        balanceAfter: 1600,
        type: "earned" as const,
    },
    {
        id: "ACT002",
        date: "2024-03-18",
        label: "Redeemed 10% Discount Coupon",
        deltaPoints: -50,
        balanceAfter: 1475,
        type: "redeemed" as const,
    },
    {
        id: "ACT003",
        date: "2024-03-15",
        label: "Referral bonus from friend",
        deltaPoints: 200,
        balanceAfter: 1525,
        type: "earned" as const,
    },
    {
        id: "ACT004",
        date: "2024-03-12",
        label: "Purchase at Fashion Hub",
        deltaPoints: 75,
        balanceAfter: 1325,
        type: "earned" as const,
    },
    {
        id: "ACT005",
        date: "2024-03-10",
        label: "Redeemed Free Shipping",
        deltaPoints: -25,
        balanceAfter: 1250,
        type: "redeemed" as const,
    },
    {
        id: "ACT006",
        date: "2024-03-05",
        label: "Birthday bonus points",
        deltaPoints: 100,
        balanceAfter: 1275,
        type: "earned" as const,
    },
]

const availableRewards = [
    {
        id: "REW001",
        title: "10% Discount Coupon",
        requiredPoints: 200,
        category: "Discount",
        description: "Get 10% off your next purchase",
        available: true,
    },
    {
        id: "REW002",
        title: "Free Shipping Voucher",
        requiredPoints: 100,
        category: "Shipping",
        description: "Free shipping on any order",
        available: true,
    },
    {
        id: "REW003",
        title: "$25 Gift Card",
        requiredPoints: 500,
        category: "Gift Card",
        description: "Redeemable at any partner store",
        available: true,
    },
    {
        id: "REW004",
        title: "Premium Support Access",
        requiredPoints: 300,
        category: "Service",
        description: "Priority customer support for 3 months",
        available: true,
    },
    {
        id: "REW005",
        title: "$50 Gift Card",
        requiredPoints: 1000,
        category: "Gift Card",
        description: "Redeemable at any partner store",
        available: true,
    },
    {
        id: "REW006",
        title: "VIP Member Access",
        requiredPoints: 1500,
        category: "Premium",
        description: "Exclusive access to VIP events and sales",
        available: true,
    },
]

const membershipTiers = {
    Bronze: { min: 0, max: 999, color: "text-amber-600", bgColor: "bg-amber-50" },
    Silver: { min: 1000, max: 2499, color: "text-gray-500", bgColor: "bg-gray-50" },
    Gold: { min: 2500, max: 4999, color: "text-yellow-500", bgColor: "bg-yellow-50" },
    Platinum: { min: 5000, max: Number.POSITIVE_INFINITY, color: "text-purple-500", bgColor: "bg-purple-50" },
}

const MemberDashboard = () => {
    const [isRedeeming, setIsRedeeming] = useState<string | null>(null)
    const [currentBalance, setCurrentBalance] = useState(memberData.currentBalance)

    const user = authHelpers.getUser()

    const handleRedeemReward = async (rewardId: string, cost: number) => {
        if (currentBalance < cost) {
            return
        }

        setIsRedeeming(rewardId)
        // Simulate redemption process
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setCurrentBalance(currentBalance - cost)
        setIsRedeeming(null)
    }

    const getMembershipProgress = () => {
        const currentTier = membershipTiers[memberData.membershipLevel]
        const nextTierMin = membershipTiers[memberData.nextLevel].min
        const progress = ((memberData.totalEarned - currentTier.min) / (nextTierMin - currentTier.min)) * 100
        return Math.min(progress, 100)
    }

    const pointsToNextLevel = membershipTiers[memberData.nextLevel].min - memberData.totalEarned

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Member Header */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback className="text-lg">
                                    {user?.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-2xl font-bold">Welcome back, {user?.name || "Member"}!</h2>
                                    <Badge
                                        variant="secondary"
                                        className={`${membershipTiers[memberData.membershipLevel].color} ${membershipTiers[memberData.membershipLevel].bgColor} border-0`}
                                    >
                                        <Award className="h-3 w-3 mr-1" />
                                        {memberData.membershipLevel} Member
                                    </Badge>
                                </div>
                                <p className="text-muted-foreground">Member since {memberData.joinDate}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Points Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Earned Points</p>
                                    <p className="text-3xl font-bold">{memberData.totalEarned.toLocaleString()}</p>
                                </div>
                                <TrendingUp className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="flex items-center mt-4 text-sm">
                                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-green-500">{memberData.earnedGrowth}%</span>
                                <span className="text-muted-foreground ml-1">this month</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Redeemed Points</p>
                                    <p className="text-3xl font-bold">{memberData.totalRedeemed.toLocaleString()}</p>
                                </div>
                                <Gift className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="flex items-center mt-4 text-sm">
                                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                                <span className="text-red-500">{Math.abs(memberData.redeemedGrowth)}%</span>
                                <span className="text-muted-foreground ml-1">this month</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
                                    <p className="text-3xl font-bold text-primary">{currentBalance.toLocaleString()}</p>
                                </div>
                                <Star className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="flex items-center mt-4 text-sm">
                                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-green-500">{memberData.balanceGrowth}%</span>
                                <span className="text-muted-foreground ml-1">this month</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Membership Progress */}
                <Card>
                    <CardHeader>
                        <CardTitle>Membership Progress</CardTitle>
                        <CardDescription>Your journey to the next tier</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant="secondary"
                                        className={`${membershipTiers[memberData.membershipLevel].color} ${membershipTiers[memberData.membershipLevel].bgColor} border-0`}
                                    >
                                        {memberData.membershipLevel}
                                    </Badge>
                                    <span className="text-muted-foreground">→</span>
                                    <Badge variant="outline" className={`${membershipTiers[memberData.nextLevel].color} border-current`}>
                                        {memberData.nextLevel}
                                    </Badge>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {pointsToNextLevel > 0
                                        ? `${pointsToNextLevel} points to ${memberData.nextLevel}`
                                        : "Max tier reached!"}
                                </span>
                            </div>
                            <Progress value={getMembershipProgress()} className="h-3" />
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>{membershipTiers[memberData.membershipLevel].min} pts</span>
                                <span>{membershipTiers[memberData.nextLevel].min} pts</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Your latest points transactions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Activity</TableHead>
                                            <TableHead className="text-right">Points</TableHead>
                                            <TableHead className="text-right">Balance After</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentActivities.map((activity) => (
                                            <TableRow key={activity.id}>
                                                <TableCell className="text-muted-foreground">{activity.date}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        {activity.type === "earned" ? (
                                                            <TrendingUp className="h-4 w-4 text-green-500" />
                                                        ) : (
                                                            <Gift className="h-4 w-4 text-blue-500" />
                                                        )}
                                                        <span className="text-sm">{activity.label}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <span
                                                        className={`font-medium ${activity.deltaPoints > 0 ? "text-green-600" : "text-red-600"}`}
                                                    >
                                                        {activity.deltaPoints > 0 ? "+" : ""}
                                                        {activity.deltaPoints}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right text-muted-foreground">
                                                    {activity.balanceAfter.toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Profile Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Your account details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Member ID</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{memberData.memberId}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Join Date</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{memberData.joinDate}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Email</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Phone</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{memberData.phone}</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <div className="flex items-center gap-2 mb-2">
                                    <History className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Quick Stats</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Total Transactions:</span>
                                        <span className="ml-2 font-medium">{recentActivities.length}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Avg. Points/Month:</span>
                                        <span className="ml-2 font-medium">245</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Available Rewards */}
                <Card>
                    <CardHeader>
                        <CardTitle>Available Rewards</CardTitle>
                        <CardDescription>Redeem your points for exciting rewards</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {availableRewards.map((reward) => (
                                <Card key={reward.id} className="relative">
                                    <CardContent className="p-4">
                                        <div className="space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-sm">{reward.title}</h4>
                                                    <p className="text-xs text-muted-foreground mt-1">{reward.description}</p>
                                                </div>
                                                <Badge variant="outline" className="text-xs">
                                                    {reward.category}
                                                </Badge>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 text-yellow-500" />
                                                    <span className="text-sm font-medium">{reward.requiredPoints} points</span>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant={currentBalance >= reward.requiredPoints ? "default" : "secondary"}
                                                    disabled={currentBalance < reward.requiredPoints || isRedeeming === reward.id}
                                                    onClick={() => handleRedeemReward(reward.id, reward.requiredPoints)}
                                                >
                                                    {isRedeeming === reward.id ? "Redeeming..." : "Redeem"}
                                                </Button>
                                            </div>

                                            {currentBalance < reward.requiredPoints && (
                                                <p className="text-xs text-muted-foreground">
                                                    Need {reward.requiredPoints - currentBalance} more points
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}

export default MemberDashboard
