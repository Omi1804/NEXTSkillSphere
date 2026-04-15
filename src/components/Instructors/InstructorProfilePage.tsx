import CourseCard from "@/components/CourseCard";
import { Course } from "@/types/course.types";

type InstructorProfilePageProps = {
  instructor: {
    id: string;
    name: string;
    email: string;
    createdAt: Date | string;
    courses: Course[];
    totalLessons: number;
  };
};

const InstructorProfilePage = ({ instructor }: InstructorProfilePageProps) => {
  const initials = instructor.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="bg-[#f6f8fb] px-4 py-12 md:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl">
          <div className="grid gap-8 p-6 md:grid-cols-[220px_1fr] md:p-10">
            <div className="flex h-40 w-40 items-center justify-center rounded-3xl bg-[#00ECA3] text-5xl font-black text-slate-950 md:h-52 md:w-52">
              {initials}
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#00ECA3]">
                Instructor
              </p>
              <h1 className="mt-4 text-4xl font-black md:text-6xl">{instructor.name}</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
                Course creator at Skill Sphere, focused on structured lessons, practical learning
                paths, and self-paced student progress.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-widest text-slate-400">Courses</p>
                  <p className="mt-2 text-2xl font-black">{instructor.courses.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-widest text-slate-400">Lessons</p>
                  <p className="mt-2 text-2xl font-black">{instructor.totalLessons}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-widest text-slate-400">Contact</p>
                  <a
                    href={`mailto:${instructor.email}`}
                    className="mt-2 block truncate text-sm font-bold text-[#00ECA3]"
                  >
                    {instructor.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="h-1 bg-[linear-gradient(90deg,#00ECA3,#6a7df1)]" />
        </div>

        <div className="mt-10">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#057455]">
            Courses by {instructor.name}
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">Published courses</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {instructor.courses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                image={course.imageLink}
                price={course.price}
                heading={course.title}
                description={course.description}
                instructor={course.instructor}
                instructorId={course.instructorId}
              />
            ))}
          </div>

          {instructor.courses.length === 0 && (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
              This instructor has no published courses yet.
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default InstructorProfilePage;
