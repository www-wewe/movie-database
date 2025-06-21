import { type Movie } from '../../models'
import defaultMoviePicture from '../../../public/movie-default-picture.jpg';
import Authorized from '../Authorized';

export interface MovieProps {
  source: Movie
}

export default function Movie ({ source }: MovieProps) {
  return (
    <Authorized roles={["ADMIN", "USER"]}>
      <img className="images__image"
        src={!source.picture ? defaultMoviePicture : source.picture} />
      <div className="images__image-label">
          {source.title} - {source.originalTitle}
      </div>
    </Authorized>
  )
}
