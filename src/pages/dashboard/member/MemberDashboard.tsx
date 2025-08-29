"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Gift, TrendingUp } from "lucide-react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

const MemberDashboard = () => {
    const { points } = useSelector((state: RootState) => state.data);
    const { role } = useSelector((state: RootState) => state.auth);

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
                                    {role?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-2xl font-bold">Welcome back, {role || "Member"}!</h2>
                                </div>
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
                                    <p className="text-sm font-medium text-muted-foreground">Total Points</p>
                                    <p className="text-3xl font-bold">{points.total.toLocaleString()}</p>
                                </div>
                                <TrendingUp className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Pending Points</p>
                                    <p className="text-3xl font-bold">{points.pending.toLocaleString()}</p>
                                </div>
                                <Gift className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Available Points</p>
                                    <p className="text-3xl font-bold text-primary">{points.available.toLocaleString()}</p>
                                </div>
                                <Star className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default MemberDashboard
