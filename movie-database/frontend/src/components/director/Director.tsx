import { type Director } from '../../models'
import directorImage from '../../../public/director.jpg'
import Authorized from '../Authorized'

export interface DirectorProps {
  source: Director
}

export default function Director ({ source }: DirectorProps) {

  return (
    <Authorized roles={["ADMIN", "USER"]}>
      <img className="images__image" alt="Director" src={source.picture === null ? directorImage : source.picture} />
      <div className="images__image-label">
        {source.name}
      </div>
    </Authorized>
  )
}
