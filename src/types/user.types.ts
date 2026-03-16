export type AdminLessonCreateInput = {
  title: string;
  videoUrl: string;
  position?: number;
};

export type AdminLessonUpdateInput = {
  title?: string;
  videoUrl?: string;
  position?: number;
};

export type UnsplashImage = {
  urls?: {
    regular?: string;
    full?: string;
    raw?: string;
  };
};

export interface UserInput {
  name: string;
  email: string;
  password: string;
  username?: string;
}
