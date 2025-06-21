import { UserReviewData } from '../../user/types/data';

export type Review = {
  id: string;
  createdAt: Date;
  deletedAt?: Date | null;
  content: string;
  movieId: string;
  user: UserReviewData;
  rating: number;
};

export type ReviewCreateData = {
  content: string;
  movieId: string;
  userId: string;
  rating: number;
};

export type ReviewSpecificByIdData = {
  movieId: string;
  reviewId: string;
  userId: string;
};
