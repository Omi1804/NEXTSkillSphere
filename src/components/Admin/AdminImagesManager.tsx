"use client";

import { Course } from "@/types/course.types";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

type CourseImageRecord = {
  id: number;
  imageLink: string;
  course?: {
    id: string;
    title: string;
  } | null;
};

type AdminImagesManagerProps = {
  images: CourseImageRecord[];
  courses: Course[];
};

const getImageSource = (imageLink: string) => {
  if (imageLink.startsWith("http") || imageLink.startsWith("/")) return imageLink;
  return `/${imageLink}.jpg`;
};

const AdminImagesManager = ({ images, courses }: AdminImagesManagerProps) => {
  const router = useRouter();
  const [linksText, setLinksText] = useState("");
  const [assignCourseByImage, setAssignCourseByImage] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const unassignedImages = useMemo(() => images.filter((image) => !image.course), [images]);
  const coursesWithoutImages = courses.filter((course) => !course.image_id);

  const addImages = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    const imageLinks = linksText
      .split("\n")
      .map((link) => link.trim())
      .filter(Boolean);

    try {
      const response = await fetch("/api/v1/admin/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageLinks }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to add images");
      }

      setLinksText("");
      setMessage(data?.message || "Images added");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to add images");
    } finally {
      setIsSubmitting(false);
    }
  };

  const assignImage = async (imageId: number, courseId?: string | null) => {
    if (!courseId) return;

    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch(`/api/v1/admin/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_id: imageId }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to assign image");
      }

      setMessage("Image assigned successfully");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to assign image");
    } finally {
      setIsSubmitting(false);
    }
  };

  const unassignImage = async (courseId: string) => {
    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch(`/api/v1/admin/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_id: null }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to unassign image");
      }

      setMessage("Image unassigned successfully");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to unassign image");
    } finally {
      setIsSubmitting(false);
    }
  };

  const autoAssign = async () => {
    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/v1/admin/courses/bulk/images", {
        method: "PATCH",
      });
      const text = await response.text();
      let data: any = {};

      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (!response.ok) {
        throw new Error(data?.message || "Unable to auto assign images");
      }

      setMessage(data?.message || "Images assigned");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to auto assign images");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-950">Image library</h3>
            <p className="mt-1 text-sm text-slate-500">
              {unassignedImages.length} unassigned images, {coursesWithoutImages.length} courses
              without images.
            </p>
          </div>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={autoAssign}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-70"
          >
            <span className="material-symbols-outlined text-base">auto_fix_high</span>
            Auto assign
          </button>
        </div>

        {(message || error) && (
          <div
            className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
              error
                ? "border-red-200 bg-red-50 text-red-600"
                : "border-green-200 bg-green-50 text-green-700"
            }`}
          >
            {error || message}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {images.map((image) => (
            <div key={image.id} className="overflow-hidden rounded-2xl border border-slate-200">
              <img
                src={getImageSource(image.imageLink)}
                alt={`Course image ${image.id}`}
                className="h-44 w-full object-cover"
              />
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-950">Image #{image.id}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-slate-500">{image.imageLink}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      image.course
                        ? "bg-[#00ECA3]/15 text-[#057455]"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {image.course ? "Assigned" : "Free"}
                  </span>
                </div>

                {image.course ? (
                  <div className="mt-4">
                    <p className="text-sm text-slate-600">{image.course.title}</p>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => unassignImage(image.course!.id)}
                      className="mt-3 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-70"
                    >
                      Unassign
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 flex gap-2">
                    <select
                      value={assignCourseByImage[image.id] || ""}
                      onChange={(event) =>
                        setAssignCourseByImage((prev) => ({
                          ...prev,
                          [image.id]: event.target.value,
                        }))
                      }
                      className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
                    >
                      <option value="">Choose course</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      disabled={isSubmitting || !assignCourseByImage[image.id]}
                      onClick={() => assignImage(image.id, assignCourseByImage[image.id])}
                      className="rounded-lg bg-slate-950 px-3 py-2 text-sm font-bold text-white disabled:opacity-60"
                    >
                      Assign
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-950">Add image URLs</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Paste one image URL per line. They will become available for course assignment.
        </p>
        <form className="mt-5" onSubmit={addImages}>
          <textarea
            value={linksText}
            required
            rows={8}
            onChange={(event) => setLinksText(event.target.value)}
            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#00B982] focus:bg-white focus:ring-4 focus:ring-[#00ECA3]/15"
            placeholder="https://example.com/course-image.jpg"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-70"
          >
            Add images
            <span className="material-symbols-outlined text-base">add_photo_alternate</span>
          </button>
        </form>
      </aside>
    </div>
  );
};

export default AdminImagesManager;
