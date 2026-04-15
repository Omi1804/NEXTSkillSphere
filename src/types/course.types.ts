export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  image_id?: number | null;
  imageLink?: string | null;
  isPublished: boolean;
  createdBy: string;
  instructorId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  instructor?: string;
}

export interface CourseCreateInput {
  title: string;
  description: string;
  price: number;
  image_id?: number | null;
  isPublished?: boolean;
}

export interface CourseUpdateInput {
  title?: string;
  description?: string;
  price?: number;
  image_id?: number | null;
  isPublished?: boolean;
}
