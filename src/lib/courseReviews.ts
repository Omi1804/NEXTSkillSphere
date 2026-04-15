export type CourseReview = {
  name: string;
  role: string;
  rating: number;
  body: string;
};

const reviewPool: CourseReview[] = [
  {
    name: "Aarav Mehta",
    role: "Frontend Developer",
    rating: 5,
    body: "The lessons felt practical and easy to follow. I liked how each topic moved from concept to implementation without wasting time.",
  },
  {
    name: "Nisha Rao",
    role: "Career Switcher",
    rating: 5,
    body: "This course helped me build confidence quickly. The roadmap made it clear what to study next and how to keep momentum.",
  },
  {
    name: "Kabir Singh",
    role: "Student",
    rating: 4,
    body: "Strong structure, crisp examples, and enough practice ideas to keep learning after the video ends.",
  },
  {
    name: "Ira Kapoor",
    role: "Product Designer",
    rating: 5,
    body: "The teaching style is clear and friendly. It gave me enough technical context to work better with engineering teams.",
  },
  {
    name: "Rohan Nair",
    role: "Backend Engineer",
    rating: 4,
    body: "Good pacing and useful explanations. I would recommend it to anyone who wants a focused learning path.",
  },
];

export const getCourseReviews = (courseId: string) => {
  const offset = courseId.split("").reduce((total, char) => total + char.charCodeAt(0), 0);

  return Array.from({ length: 4 }, (_, index) => reviewPool[(offset + index) % reviewPool.length]);
};

export const getAverageRating = (reviews: CourseReview[]) => {
  if (reviews.length === 0) return 0;

  return Number(
    (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(1),
  );
};
