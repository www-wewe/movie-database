import { type FC } from 'react'
import defaultPicture from '../../public/profile-icon.jpg'

interface AvatarProps {
  picture: string | null
}

const ReviewAvatar: FC<AvatarProps> = ({ picture }) => {
    return (
      <img className="review__avatar" src={picture ? picture : defaultPicture} alt="Avatar" />
    )
}

export default ReviewAvatar
