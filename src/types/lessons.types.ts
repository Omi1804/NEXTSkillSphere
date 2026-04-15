export interface LessonRecord {
  id: string;
  title: string;
  videoUrl: string;
  position: number;
  courseId: string;
  createdAt: Date;
}

export interface LessonCreateInput {
  title: string;
  videoUrl: string;
  position: number;
  courseId: string;
}

export interface LessonUpdateInput {
  title?: string;
  videoUrl?: string;
  position?: number;
}
