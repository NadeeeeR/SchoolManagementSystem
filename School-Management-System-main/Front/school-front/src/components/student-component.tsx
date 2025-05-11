/*import { useEffect, useState } from 'react';

import  fetchStudentData  from '../app/api/students';
import Header from './Student/StudentDashboardHeader';
import { CoursesCard } from '@/components/Student/CoursesCard';
import { ProgressCard } from '@/components/Student/ProgressCard';
import { AttendanceCard } from '@/components/Student/AttendanceCard';
import { HomeworkCard } from '@/components/Student/HomeworkCard';
import { ExamsCard } from '@/components/Student/ExamsCard';
import LoadingPage from './loadingPage';
import { UploadHomeworkCard } from '@/components/Student/UploadHomeworkCard';
import {jwtDecode} from 'jwt-decode';


interface CourseTeachers {
  teacherName: string;
  courseName: string;
  courseId: number;
}

interface CourseGrades {
  totalGrade: number;
  courseName: string;
  studentMark: number;
}
interface homeworks{
  homeworkId: number;
  title: string;
  description: string;
  dueDate: string;
  courseName: string;
  status: string;
}
interface courseExams{
  name: string;
  status: string;
  maxMark: number;
  date: string;
  courseName: string;
}

interface StudentData {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  enrollDate: string;
  address: string;
  imgUrl: string;
  deptId: number;
  currentYear: string;
  departmentName: string;
  totalGrade: number;
  numberOfCourses: number;
  courseGrades: CourseGrades[];
  completedHomeworkCount: number;
  pendingHomeworkCount: number;
  courseNames: string[];
  courseTeachers: CourseTeachers[];
  courseExams: courseExams[];
  classAttendance: number;
  classMissed: number;
  homeworks: homeworks[];
}

export function StudentComponent({id}: {id: number}) {
  const token = localStorage.getItem('authToken') ?? '';
  const decodedToken = jwtDecode(token);
  const userRole = (decodedToken as { [key: string]: string })["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  const [studentData, setStudentData] = useState<StudentData | null>(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const data = await fetchStudentData(Number(id));
          setStudentData(data);
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      };
      fetchData();
    }
  }, [id]);


      if (!studentData) {
        
          return <LoadingPage/>;
      }
      if (userRole !== "Student" || token === null || token === undefined) {
        alert('Unauthorized: You are not a Student.');
        return null;
      }
      else{
        return (
          <div className="flex flex-col min-h-screen bg-muted/40">
            <Header/>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <CoursesCard courseTeachers={studentData.courseTeachers}  />
                <ProgressCard CourseGrades={studentData.courseGrades} totalGrade={studentData.totalGrade}/>
                <AttendanceCard classAttendance={studentData.classAttendance} classMissed={studentData.classMissed}/>
                <HomeworkCard HomeWorks={studentData.homeworks}/>
                <ExamsCard courseExams={studentData.courseExams}/>
                <UploadHomeworkCard HomeWorks={studentData.homeworks} studentId={studentData.id} />
              </div>
            </main>
          </div>
        );
      }
}
*/
"use client"
import { useEffect, useState } from 'react';
import fetchStudentData from '../app/api/students';
import Header from './Student/StudentDashboardHeader';
import { CoursesCard } from '@/components/Student/CoursesCard';
import { ProgressCard } from '@/components/Student/ProgressCard';
import { AttendanceCard } from '@/components/Student/AttendanceCard';
import { HomeworkCard } from '@/components/Student/HomeworkCard';
import { ExamsCard } from '@/components/Student/ExamsCard';
import LoadingPage from './loadingPage';
import { UploadHomeworkCard } from '@/components/Student/UploadHomeworkCard';
import { jwtDecode } from 'jwt-decode';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BookOpen, BarChart, CalendarCheck } from "lucide-react";

interface CourseTeachers {
  teacherName: string;
  courseName: string;
  courseId: number;
}

interface CourseGrades {
  totalGrade: number;
  courseName: string;
  studentMark: number;
}

interface homeworks {
  homeworkId: number;
  title: string;
  description: string;
  dueDate: string;
  courseName: string;
  status: string;
}

interface courseExams {
  name: string;
  status: string;
  maxMark: number;
  date: string;
  courseName: string;
}

interface StudentData {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  enrollDate: string;
  address: string;
  imgUrl: string;
  deptId: number;
  currentYear: string;
  departmentName: string;
  totalGrade: number;
  numberOfCourses: number;
  courseGrades: CourseGrades[];
  completedHomeworkCount: number;
  pendingHomeworkCount: number;
  courseNames: string[];
  courseTeachers: CourseTeachers[];
  courseExams: courseExams[];
  classAttendance: number;
  classMissed: number;
  homeworks: homeworks[];
}

export function StudentComponent({ id }: { id: number }) {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const data = await fetchStudentData(Number(id));
        setStudentData(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <LoadingPage />;
  }

  const token = localStorage.getItem('authToken');
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl font-bold text-destructive">Access Denied</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-600">Please login to access this page.</p>
              <Button
                onClick={() => window.location.href = "/login"}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = (decodedToken as { [key: string]: string })["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (userRole !== "Student") {
      return (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
            <Card className="w-full max-w-md shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="text-2xl font-bold text-destructive">Access Denied</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-gray-600">You don't have student privileges to access this page.</p>
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
      );
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl font-bold text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-600">There was an error verifying your credentials.</p>
              <Button
                onClick={() => window.location.href = "/login"}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Please Login Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl font-bold">No Data Found</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-600">Unable to load student information.</p>
              <Button
                onClick={() => window.location.reload()}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-2">View your academic progress and activities</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-lg p-1 h-auto">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 rounded-md"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 rounded-md"
            >
              Courses
            </TabsTrigger>
            <TabsTrigger
              value="assignments"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 rounded-md"
            >
              Assignments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <StatCard
                title="Current Courses"
                value={studentData.numberOfCourses}
                icon={<BookOpen className="h-5 w-5" />}
                description="Courses enrolled this semester"
              />
              <StatCard
                title="Overall Grade"
                value={`${studentData.totalGrade}%`}
                icon={<BarChart className="h-5 w-5" />}
                description="Your cumulative grade average"
              />
              <StatCard
                title="Attendance Rate"
                value={`${studentData.classAttendance}%`}
                icon={<CalendarCheck className="h-5 w-5" />}
                description="Your class attendance percentage"
              />
            </div>
          </TabsContent>

          <TabsContent value="courses" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              <CoursesCard courseTeachers={studentData.courseTeachers} />
              <ProgressCard CourseGrades={studentData.courseGrades} totalGrade={studentData.totalGrade} />
              <AttendanceCard classAttendance={studentData.classAttendance} classMissed={studentData.classMissed} />
              <ExamsCard courseExams={studentData.courseExams} />
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              <HomeworkCard HomeWorks={studentData.homeworks} />
              <UploadHomeworkCard HomeWorks={studentData.homeworks} studentId={studentData.id} />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, description }: {
  title: string,
  value: string | number,
  icon: React.ReactNode,
  description: string
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
        <p className="text-sm text-gray-500 mt-2">{description}</p>
      </CardContent>
    </Card>
  );
}