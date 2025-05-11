/*"use client"
import { Header } from "@/components/Admin/Header"
import { StudentList } from "@/components/Admin/StudentList"
import { TeacherList } from "@/components/Admin/TeacherList"
import { CourseList } from "@/components/Admin/CourseList"
import { DepartmentList } from "@/components/Admin/DepartmentList"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function AdminDashboard() {
  const [role, setRole] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token) as any;
      setRole(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
    }
  }, []);

  if (role !== "Admin") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl font-bold text-destructive">Access Denied</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-600">You don't have administrator privileges to access this page.</p>
              <Button 
                onClick={() => window.location.href = "/"}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage all system entities from this centralized panel</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-white">
              Students
            </TabsTrigger>
            <TabsTrigger value="teachers" className="data-[state=active]:bg-white">
              Teachers
            </TabsTrigger>
            <TabsTrigger value="management" className="data-[state=active]:bg-white">
              Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <DashboardCard 
                title="Total Students" 
                value="3" 
                icon={<UsersIcon className="h-6 w-6" />}
                trend="up"
              />
              <DashboardCard 
                title="Active Teachers" 
                value="3" 
                icon={<ChalkboardTeacherIcon className="h-6 w-6" />}
                trend="stable"
              />
              <DashboardCard 
                title="Courses Offered" 
                value="2" 
                icon={<BookOpenIcon className="h-6 w-6" />}
                trend="up"
              />
              <DashboardCard 
                title="Departments" 
                value="3" 
                icon={<BuildingIcon className="h-6 w-6" />}
                trend="stable"
              />
            </div>
          </TabsContent>

          <TabsContent value="students">
            <StudentList />
          </TabsContent>

          <TabsContent value="teachers">
            <TeacherList />
          </TabsContent>

          <TabsContent value="management">
            <div className="grid grid-cols-1 gap-6">
              <CourseList />
              <DepartmentList />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function DashboardCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: 'up' | 'down' | 'stable' }) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className="p-2 rounded-lg bg-gray-100">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend === 'up' && (
          <p className="text-xs text-green-500 mt-1">↑ 12% from last month</p>
        )}
        {trend === 'down' && (
          <p className="text-xs text-red-500 mt-1">↓ 5% from last month</p>
        )}
        {trend === 'stable' && (
          <p className="text-xs text-gray-500 mt-1">↔ No change</p>
        )}
      </CardContent>
    </Card>
  )
}

// Icons
function UsersIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> }
function ChalkboardTeacherIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> }
function BookOpenIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> }
function BuildingIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0H3m14 0h2m-2 0h2"/></svg> }
*/
/*
"use client"
import { Header } from "@/components/Admin/Header"
import { StudentList } from "@/components/Admin/StudentList"
import { TeacherList } from "@/components/Admin/TeacherList"
import { CourseList } from "@/components/Admin/CourseList"
import { DepartmentList } from "@/components/Admin/DepartmentList"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Users, BookOpen, GraduationCap, Building, ArrowUp, ArrowDown } from "lucide-react"

export default function AdminDashboard() {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    courses: 0,
    departments: 0
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token) as any;
      setRole(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
      
      // Simulate data loading
      setTimeout(() => {
        setStats({
          students: 3,
          teachers: 3,
          courses: 2,
          departments: 3
        });
        setLoading(false);
      }, 800);
    }
  }, []);

  if (role !== "Admin") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl font-bold text-destructive">Access Denied</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-600">You don't have administrator privileges to access this page.</p>
              <Button 
                onClick={() => window.location.href = "/"}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage all system entities from this centralized panel</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-lg p-1 h-auto">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 rounded-md"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="students" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 rounded-md"
            >
              Students
            </TabsTrigger>
            <TabsTrigger 
              value="teachers" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 rounded-md"
            >
              Teachers
            </TabsTrigger>
            <TabsTrigger 
              value="management" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 rounded-md"
            >
              Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              {loading ? (
                [1, 2, 3, 4].map((item) => (
                  <Card key={item} className="border-0 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded mt-2 animate-pulse"></div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <>
                  <StatCard 
                    title="Total Students" 
                    value={stats.students} 
                    icon={<Users className="h-5 w-5" />}
                    trend="up"
                    change="12%"
                  />
                  <StatCard 
                    title="Active Teachers" 
                    value={stats.teachers} 
                    icon={<GraduationCap className="h-5 w-5" />}
                    trend="stable"
                    change="0%"
                  />
                  <StatCard 
                    title="Courses Offered" 
                    value={stats.courses} 
                    icon={<BookOpen className="h-5 w-5" />}
                    trend="up"
                    change="8%"
                  />
                  <StatCard 
                    title="Departments" 
                    value={stats.departments} 
                    icon={<Building className="h-5 w-5" />}
                    trend="stable"
                    change="0%"
                  />
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="students">
            <StudentList />
          </TabsContent>

          <TabsContent value="teachers">
            <TeacherList />
          </TabsContent>

          <TabsContent value="management">
            <div className="grid grid-cols-1 gap-6">
              <CourseList />
              <DepartmentList />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function StatCard({ title, value, icon, trend, change }: { 
  title: string, 
  value: number, 
  icon: React.ReactNode, 
  trend: 'up' | 'down' | 'stable',
  change: string
}) {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <div className="flex items-center mt-2">
          {trend === 'up' && <ArrowUp className="h-4 w-4 text-green-500" />}
          {trend === 'down' && <ArrowDown className="h-4 w-4 text-red-500" />}
          <span className={`text-sm ml-1 ${
            trend === 'up' ? 'text-green-500' : 
            trend === 'down' ? 'text-red-500' : 'text-gray-500'
          }`}>
            {change} {trend === 'up' ? 'increase' : trend === 'down' ? 'decrease' : 'no change'}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}*/
/*
"use client"
import { Header } from "@/components/Admin/Header"
import { StatisticCard } from "@/components/Admin/StatisticCard"
import { StudentList } from "@/components/Admin/StudentList"
import { TeacherList } from "@/components/Admin/TeacherList"
import { CourseList } from "@/components/Admin/CourseList"
import { DepartmentList } from "@/components/Admin/DepartmentList"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

export default function AdminDashboard() {
  const [role, setRole] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token) as any;
      setRole(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
    }
  }, []);
  if (role !== "Admin") {
    return (
      <div>
        <Header />
        <div className="flex justify-center items-center h-screen">
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You do not have permission to access this page.</p>
              <Button onClick={() => window.location.href = "/"}>Go to Home</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  else{
    return (
      <div>
        <Header />
  
          <StatisticCard />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <StudentList />
          <TeacherList />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CourseList />
          <DepartmentList />
        </div>
      </div>
    )
  }
  
}*/
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

import { Header } from "@/components/Admin/Header"
import { StatisticCard } from "@/components/Admin/StatisticCard"
import { StudentList } from "@/components/Admin/StudentList"
import { TeacherList } from "@/components/Admin/TeacherList"
import { CourseList } from "@/components/Admin/CourseList"
import { DepartmentList } from "@/components/Admin/DepartmentList"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function AdminDashboard() {
  const [role, setRole] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (token) {
      const decodedToken = jwtDecode(token) as any
      const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      setRole(userRole)
    }
  }, [])

  if (role !== "Admin") {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4">
          <Card className="w-full max-w-md shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg border border-gray-200 bg-white">
            <CardHeader className="bg-gray-100 rounded-t-lg p-4">
              <CardTitle className="text-xl font-semibold text-destructive">Access Denied</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <p className="text-gray-600">You do not have permission to view this page.</p>
              <Button
                onClick={() => window.location.href = "/"}
                className="w-full bg-primary hover:bg-primary/90 transition duration-200"
              >
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage users, courses, and departments</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 gap-2 bg-white border rounded-lg shadow-sm mb-6">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-2 font-medium rounded-md transition"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-2 font-medium rounded-md transition"
            >
              Users
            </TabsTrigger>
            <TabsTrigger
              value="academics"
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-2 font-medium rounded-md transition"
            >
              Academics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <StatisticCard /> {/* This should only show student, course, and department stats now */}
          </TabsContent>

          <TabsContent value="users" className="mt-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <StudentList />
              <TeacherList />
            </div>
          </TabsContent>

          <TabsContent value="academics" className="mt-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <CourseList />
              <DepartmentList />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

