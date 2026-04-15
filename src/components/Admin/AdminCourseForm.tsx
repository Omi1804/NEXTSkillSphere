"use client";

import { Course } from "@/types/course.types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type CourseImageOption = {
  id: number;
  imageLink: string;
  course?: {
    id: string;
    title: string;
  } | null;
};

type AdminCourseFormProps = {
  mode: "create" | "edit";
  course?: Course;
  images: CourseImageOption[];
};

const AdminCourseForm = ({ mode, course, images }: AdminCourseFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(course?.title || "");
  const [description, setDescription] = useState(course?.description || "");
  const [price, setPrice] = useState(String(course?.price ?? ""));
  const [imageId, setImageId] = useState(course?.image_id ? String(course.image_id) : "");
  const [isPublished, setIsPublished] = useState(course?.isPublished ?? true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableImages = images.filter((image) => !image.course || image.id === course?.image_id);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = {
      title,
      description,
      price: Number(price),
      image_id: imageId ? Number(imageId) : null,
      isPublished,
    };

    try {
      const response = await fetch(
        mode === "create" ? "/api/v1/admin/courses" : `/api/v1/admin/courses/${course?.id}`,
        {
          method: mode === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to save course");
      }

      router.refresh();
      router.push("/admin/courses");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save course");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5">
          <div>
            <label htmlFor="title" className="text-sm font-bold text-slate-700">
              Course title
            </label>
            <input
              id="title"
              value={title}
              required
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#00B982] focus:bg-white focus:ring-4 focus:ring-[#00ECA3]/15"
            />
          </div>

          <div>
            <label htmlFor="description" className="text-sm font-bold text-slate-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              required
              rows={8}
              onChange={(event) => setDescription(event.target.value)}
              className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#00B982] focus:bg-white focus:ring-4 focus:ring-[#00ECA3]/15"
            />
          </div>

          <div>
            <label htmlFor="price" className="text-sm font-bold text-slate-700">
              Price
            </label>
            <input
              id="price"
              type="number"
              min="0"
              value={price}
              required
              onChange={(event) => setPrice(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#00B982] focus:bg-white focus:ring-4 focus:ring-[#00ECA3]/15"
            />
          </div>
        </div>
      </section>

      <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-950">Publishing</h3>

        <label className="mt-5 flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4">
          <span>
            <span className="block text-sm font-bold text-slate-900">Published</span>
            <span className="block text-xs text-slate-500">Visible in the public catalog</span>
          </span>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(event) => setIsPublished(event.target.checked)}
            className="h-5 w-5 accent-[#00B982]"
          />
        </label>

        <div className="mt-5">
          <label htmlFor="image" className="text-sm font-bold text-slate-700">
            Course image
          </label>
          <select
            id="image"
            value={imageId}
            onChange={(event) => setImageId(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#00B982] focus:bg-white focus:ring-4 focus:ring-[#00ECA3]/15"
          >
            <option value="">No image</option>
            {availableImages.map((image) => (
              <option key={image.id} value={image.id}>
                #{image.id} {image.course ? `(${image.course.title})` : ""}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Saving..." : mode === "create" ? "Create course" : "Save changes"}
          <span className="material-symbols-outlined text-base">save</span>
        </button>
      </aside>
    </form>
  );
};

export default AdminCourseForm;
