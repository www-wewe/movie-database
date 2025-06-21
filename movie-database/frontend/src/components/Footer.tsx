import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type FC, useState } from 'react'
import { MoviesApi } from '../services'
import { Movie, User } from '../models'

interface ReviewProps {
  movie: Movie,
  user: User
}

const Footer: FC<ReviewProps> = ({ movie, user }) => {
  const [reviewContent, setReviewContent] = useState('')
  const [rating, setRating] = useState(0)

  const queryClient = useQueryClient()

  const { mutate: addReview } = useMutation({
    mutationFn: () => {
      return MoviesApi.addReview(movie.id, reviewContent, user.id, rating)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['movie', movie.id])
      setReviewContent('')
      setRating(0)
    }
  })

  return (
    <div className="main-view__footer">
      <div className="review-editor">
        <label htmlFor="rating" className='review-editor__label'>Rating (0-5):</label>
        <input
          type="number"
          id="rating"
          min="0"
          max="5"
          step="1"
          value={rating === undefined ? '' : rating}
          onChange={(e) => { setRating(Number(e.target.value)) }}
        />
        <textarea className="review-editor__input" id='content'
          rows={3}
          value={reviewContent}
          onChange={(e) => { setReviewContent(e.target.value) }}
          onKeyDown={(e) => { if (e.key === 'Enter') { addReview() } }}
          placeholder="Write your review here..."
        ></textarea>
        <div className="review-editor__actions">
          <button className="review-editor__action" onClick={() => { addReview() }}>
            <img src="/assets/icons/send.svg" alt="Send icon" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Footer
