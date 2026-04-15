"use client";

import { useCourseCollections } from "@/hooks/useCourseCollections";
import { Course } from "@/types/course.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type CourseCollectionPageProps = {
  courses: Course[];
  mode: "cart" | "wishlist";
  isLoggedIn: boolean;
};

const getImageSource = (image?: string | null) => {
  if (!image) return "/home-2-intro.jpg";
  if (image.startsWith("http") || image.startsWith("/")) return image;
  return `/${image}.jpg`;
};

const CourseCollectionPage = ({ courses, mode, isLoggedIn }: CourseCollectionPageProps) => {
  const router = useRouter();
  const {
    cartIds,
    wishlistIds,
    addToCart,
    removeFromCart,
    removeFromWishlist,
    clearCart,
    isInCart,
  } = useCourseCollections();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const activeIds = mode === "cart" ? cartIds : wishlistIds;

  const collectionCourses = useMemo(
    () => courses.filter((course) => activeIds.includes(course.id)),
    [activeIds, courses],
  );
  const total = collectionCourses.reduce((sum, course) => sum + course.price, 0);
  const isCart = mode === "cart";

  const removeCourse = (courseId: string) => {
    if (isCart) {
      removeFromCart(courseId);
      return;
    }

    removeFromWishlist(courseId);
  };

  const checkoutCart = async () => {
    if (!isLoggedIn) {
      router.push("/login?next=/cart");
      return;
    }

    if (collectionCourses.length === 0) return;

    setIsCheckingOut(true);
    setError(null);

    try {
      for (const course of collectionCourses) {
        const response = await fetch(`/api/v1/user/courses/purchase/${course.id}`, {
          method: "POST",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || `Unable to enroll in ${course.title}`);
        }
      }

      clearCart();
      router.refresh();
      router.replace("/payment/success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to complete cart checkout");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <main className="bg-[#f6f8fb] px-4 py-12 md:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#057455]">
              {isCart ? "Cart" : "Wishlist"}
            </p>
            <h1 className="mt-3 text-4xl font-black text-slate-950">
              {isCart ? "Your Course Cart" : "Your Course Wishlist"}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              {isCart
                ? "Review selected courses and enroll together when you are ready."
                : "Save courses you like and move them into your cart later."}
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Browse courses
            <span className="material-symbols-outlined text-base">explore</span>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {collectionCourses.map((course) => (
              <article
                key={course.id}
                className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[180px_1fr_auto]"
              >
                <Link href={`/courses/${course.id}`} className="overflow-hidden rounded-xl">
                  <img
                    src={getImageSource(course.imageLink)}
                    alt={course.title}
                    className="h-36 w-full object-cover md:h-full"
                  />
                </Link>
                <div className="min-w-0">
                  <Link href={`/courses/${course.id}`}>
                    <h2 className="text-xl font-black text-slate-950 transition hover:text-[#057455]">
                      {course.title}
                    </h2>
                  </Link>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                    {course.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-base text-[#057455]">
                        person
                      </span>
                      {course.instructorId ? (
                        <Link href={`/instructors/${course.instructorId}`} className="hover:underline">
                          {course.instructor}
                        </Link>
                      ) : (
                        course.instructor
                      )}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-base text-[#057455]">
                        schedule
                      </span>
                      Self-paced
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-between gap-3 md:items-end">
                  <p className="text-2xl font-black text-slate-950">₹{course.price}</p>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {!isCart && (
                      <button
                        type="button"
                        onClick={() => addToCart(course.id)}
                        className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
                      >
                        {isInCart(course.id) ? "In cart" : "Add to cart"}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeCourse(course.id)}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {collectionCourses.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <span className="material-symbols-outlined text-5xl text-[#057455]">
                  {isCart ? "shopping_cart" : "favorite"}
                </span>
                <h2 className="mt-4 text-2xl font-black text-slate-950">
                  {isCart ? "Your cart is empty" : "Your wishlist is empty"}
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
                  Pick a course from the catalog and it will show up here.
                </p>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">
              {isCart ? "Cart Summary" : "Wishlist Summary"}
            </h2>
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Courses</span>
                <span className="font-bold text-slate-950">{collectionCourses.length}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="font-bold text-slate-950">Total</span>
                <span className="text-2xl font-black text-slate-950">₹{total}</span>
              </div>
            </div>

            {error && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {isCart ? (
              <button
                type="button"
                disabled={collectionCourses.length === 0 || isCheckingOut}
                onClick={checkoutCart}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00ECA3] px-5 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCheckingOut ? "Enrolling..." : "Checkout cart"}
                <span className="material-symbols-outlined text-base">shopping_cart_checkout</span>
              </button>
            ) : (
              <Link
                href="/cart"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5"
              >
                Go to cart
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
};

export default CourseCollectionPage;
