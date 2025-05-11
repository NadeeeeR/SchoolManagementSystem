/*'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // To get the teacher ID from the route

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sidebar } from "@/components/Teacher/Sidebar";
import { Header } from "@/components/Teacher/Header";
import { FilterButton } from "@/components/Teacher/FilterButton";
import { StudentTable } from "@/components/Teacher/StudentTable";
import { HomeWork } from "@/components/Teacher/home-work";
import { TeacherExam } from "@/components/Teacher/teacher-exam";
import { StudentGrade } from "@/components/Teacher/student-grade";
import LoadingPage from "./loadingPage";
import { jwtDecode } from "jwt-decode";

// Interfaces for data types
interface Student {
  id: number;
  deptId: number;
  courseId: number;
  firstName: string;
  lastName: string;
  departmentName: string;
  courseName: string;
}

interface Homework {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  courseId: number;
  teacherId: number;
  courseName: string;
}

interface Exam {
  id: number;
  name: string;
  courseId: number;
  status: string;
  courseName: string;
  maxMark: number;
  date: string;
  time: string;
  teacherId: number;
}


interface Grade {
  courseId: number;
  courseName: string;
  studentId:number;
  studentName: string;
  grade: number;
}
interface Course {
  id: number;
  name: string;
  deptId: number;
}

// API fetch functions
const fetchStudents = async (teacherId: number): Promise<Student[]> => {
  const response = await fetch(`http://localhost:5143/api/TeacherDashboard/${teacherId}/students`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }
  });
  return response.json();
};

const fetchHomeworks = async (teacherId: number): Promise<Homework[]> => {
  const response = await fetch(`http://localhost:5143/api/TeacherDashboard/${teacherId}/homeworks`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }
  });
  return response.json();
};

const fetchExams = async (teacherId: number): Promise<Exam[]> => {
  const response = await fetch(`http://localhost:5143/api/TeacherDashboard/${teacherId}/exams`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }
  });
  return await response.json();
};

const fetchGrades = async (teacherId: number): Promise<Grade[]> => {
  const response = await fetch(`http://localhost:5143/api/TeacherDashboard/${teacherId}/grades`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }
  });
  return await response.json();
};

const fetchCourses = async (teacherId: number): Promise<Course[]> => {
  const response = await fetch(`http://localhost:5143/api/TeacherDashboard/${teacherId}/courses`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }
  });
  return await response.json();
};



// Main component
export function TeacherDashboard({ id }: { id:number }) {

  const token = localStorage.getItem('authToken') ?? '';
  const decode = jwtDecode(token);
  const userRole = (decode as any)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  console.log(userRole);

  if (userRole !== "Teacher" || token === null || token === undefined) {
    alert('Unauthorized: You are not a teacher.');
  }
  const [activeTab, setActiveTab] = useState("students");
  const [students, setStudents] = useState<Student[]>([]);
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const teacherId = Number(id);
      
      // Fetch data when the component mounts
      Promise.all([
        fetchStudents(teacherId),
        fetchHomeworks(teacherId),
        fetchExams(teacherId),
        fetchGrades(teacherId),
        fetchCourses(teacherId)
      ]).then(([studentsData, homeworksData, examsData, gradesData, coursesData]) => {
        setStudents(studentsData);
        setHomeworks(homeworksData);
        setExams(examsData);
        setGrades(gradesData);
        setCourses(coursesData);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return <LoadingPage />;
  }
  

  // Function to render the active component based on the current state
  const renderActiveComponent = () => {
    switch (activeTab) {
      case "HomeWork":
        return <HomeWork homeworks={homeworks} teacherId={id} courses={courses} />;
      case "exams":
        return <TeacherExam exams={exams} courses={courses} teacherId={id}/>;
      case "student-grades":
        return <StudentGrade grades={grades} courses={courses} teacherId={id}/>;
      case "students":
      default:
        return <StudentTable students={students} />;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header setActiveTab={setActiveTab} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="HomeWork">HomeWorks</TabsTrigger>
                <TabsTrigger value="exams">Exams</TabsTrigger>
                <TabsTrigger value="student-grades">Student Grades</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <FilterButton />
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <ImportIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                </Button>
                <Button size="sm" className="h-8 gap-1">
                  <PlusIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add</span>
                </Button>
              </div>
            </div>
            {renderActiveComponent()}
          </Tabs>
        </main>
      </div>
    </div>
  )
}

// Placeholder components for icons
function ImportIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );
}
*/
'use client'
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sidebar } from "@/components/Teacher/Sidebar";
import { Header } from "@/components/Teacher/Header";
import { StudentTable } from "@/components/Teacher/StudentTable";
import { HomeWork } from "@/components/Teacher/home-work";
import { TeacherExam } from "@/components/Teacher/teacher-exam";
import { StudentGrade } from "@/components/Teacher/student-grade";
import LoadingPage from "./loadingPage";
import { jwtDecode } from "jwt-decode";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Download, Plus } from "lucide-react";

interface Student {
  id: number;
  deptId: number;
  courseId: number;
  firstName: string;
  lastName: string;
  departmentName: string;
  courseName: string;
}

interface Homework {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  courseId: number;
  teacherId: number;
  courseName: string;
}

interface Exam {
  id: number;
  name: string;
  courseId: number;
  status: string;
  courseName: string;
  maxMark: number;
  date: string;
  time: string;
  teacherId: number;
}

interface Grade {
  courseId: number;
  courseName: string;
  studentId: number;
  studentName: string;
  grade: number;
}

interface Course {
  id: number;
  name: string;
  deptId: number;
}

interface DecodedToken {
  [key: string]: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

const fetchStudents = async (teacherId: number): Promise<Student[]> => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No authentication token found');

  const response = await fetch(`http://localhost:5143/api/TeacherDashboard/${teacherId}/students`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch students: ${response.statusText}`);
  }
  
  return await response.json();
};

const fetchHomeworks = async (teacherId: number): Promise<Homework[]> => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No authentication token found');

  const response = await fetch(`http://localhost:5143/api/TeacherDashboard/${teacherId}/homeworks`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch homeworks: ${response.statusText}`);
  }
  
  return await response.json();
};

const fetchExams = async (teacherId: number): Promise<Exam[]> => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No authentication token found');

  const response = await fetch(`http://localhost:5143/api/TeacherDashboard/${teacherId}/exams`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch exams: ${response.statusText}`);
  }
  
  return await response.json();
};

const fetchGrades = async (teacherId: number): Promise<Grade[]> => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No authentication token found');

  const response = await fetch(`http://localhost:5143/api/TeacherDashboard/${teacherId}/grades`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch grades: ${response.statusText}`);
  }
  
  return await response.json();
};

const fetchCourses = async (teacherId: number): Promise<Course[]> => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No authentication token found');

  const response = await fetch(`http://localhost:5143/api/TeacherDashboard/${teacherId}/courses`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch courses: ${response.statusText}`);
  }
  
  return await response.json();
};

export function TeacherDashboard({ id }: { id: number }) {
  const [activeTab, setActiveTab] = useState("students");
  const [students, setStudents] = useState<Student[]>([]);
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError("Authentication required");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const decodedToken = jwtDecode(token) as DecodedToken;
        const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        
        if (userRole !== "Teacher") {
          throw new Error("Unauthorized access");
        }

        const teacherId = Number(id);
        const [studentsData, homeworksData, examsData, gradesData, coursesData] = await Promise.all([
          fetchStudents(teacherId),
          fetchHomeworks(teacherId),
          fetchExams(teacherId),
          fetchGrades(teacherId),
          fetchCourses(teacherId)
        ]);
        
        setStudents(studentsData);
        setHomeworks(homeworksData);
        setExams(examsData);
        setGrades(gradesData);
        setCourses(coursesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl font-bold text-destructive">
                {error.includes("Unauthorized") ? "Access Denied" : "Error"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-600">{error}</p>
              <Button
                onClick={() => error.includes("Authentication") ? 
                  window.location.href = "/login" : window.location.reload()}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {error.includes("Authentication") ? "Go to Login" : "Try Again"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "HomeWork":
        return <HomeWork homeworks={homeworks} teacherId={id} courses={courses} />;
      case "exams":
        return <TeacherExam exams={exams} courses={courses} teacherId={id} />;
      case "student-grades":
        return <StudentGrade grades={grades} courses={courses} teacherId={id} />;
      case "students":
      default:
        return <StudentTable students={students} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header setActiveTab={setActiveTab} />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your classes and student progress</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between">
              <TabsList className="bg-gray-100 rounded-lg p-1 h-auto">
                <TabsTrigger value="students" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 rounded-md">
                  Students
                </TabsTrigger>
                <TabsTrigger value="HomeWork" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 rounded-md">
                  HomeWorks
                </TabsTrigger>
                <TabsTrigger value="exams" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 rounded-md">
                  Exams
                </TabsTrigger>
                <TabsTrigger value="student-grades" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 rounded-md">
                  Grades
                </TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                </Button>
                <Button size="sm" className="gap-1">
                  <Plus className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add New</span>
                </Button>
              </div>
            </div>
            <TabsContent value={activeTab} className="mt-6">
              {renderActiveComponent()}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}