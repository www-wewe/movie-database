import { type FC } from 'react'
import { type Review as ReviewType } from '../models/reviewType'
import ReviewAvatar from './ReviewAvatar'
import Rating from './Rating'
import dayjs from 'dayjs'
import { MoviesApi } from '../services'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuth from '../hooks/useAuth'

interface ReviewProps {
  review: ReviewType
}

const Review: FC<ReviewProps> = ({ review }) => {

  const { auth } = useAuth();

  const queryClient = useQueryClient()

  const deleteReviewMutation = useMutation({
    mutationFn: () => {
      return MoviesApi.deleteReview(review.movieId, review.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['movie', review.movieId])
    }
  })

  function deleteReview() {
    deleteReviewMutation.mutate()
  }

  return (
    <div className="review">
      <ReviewAvatar picture={review.user.avatar} />

      <div className="review__content">
        <div className="review__header">
          <span className="review__author">{review.user.userName}</span>
          <span className="review__timestamp">{dayjs(review.createdAt).format("DD/MM/YYYY")}</span>
          <span className='review__rating'> rating: {review.rating}/5</span>
          { auth?.data.id === review.user.id &&
            <button className='review__delete' type='button' onClick={deleteReview}>X</button>
          }
        </div>
        <div className="review__text">
          <p>{review.content}</p>
        </div>
      </div>
      <Rating rating={0} />
    </div>
  )
}

export default Review
