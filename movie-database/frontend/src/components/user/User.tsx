import { type User } from '../../models'
import Authorized from '../Authorized'
import userDefaultPicture from './../../../public/profile-icon.jpg'

export interface UserProps {
  source: User
}

export default function User ({ source }: UserProps) {
  return (
    <Authorized roles={["ADMIN", "USER"]}>
      <img className="images__image" alt="user avatar" src={source.avatar === null ? userDefaultPicture : source.avatar} />
      <div className="images__image-label">
        {source.userName} {source.email}
      </div>
    </Authorized>
  )
}
