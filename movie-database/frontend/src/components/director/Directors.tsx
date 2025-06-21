import { Link } from "react-router-dom";
import Director from "./Director";
import { useQuery } from "@tanstack/react-query";
import { DirectorsApi } from "../../services";
import Authorized from "../Authorized";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { directorsAtom } from "../../state/atoms";
import { filteredDirectorsSelector } from "../../state/selectors";


export default function Directors() {

  const setDirectors = useSetRecoilState(directorsAtom);
  const directorsToShow = useRecoilValue(
    filteredDirectorsSelector
  );

  useQuery({
    queryKey: ['director'],
    queryFn: () => {
        return DirectorsApi.getAll();
    },
    onSuccess: (directors) => {
      setDirectors(directors.data);
    }
  });

  return (
    <Authorized roles={['ADMIN', "USER"]}>
      {directorsToShow.length === 0 ? (
        <div style={{color: "orange", marginBottom: "0.5rem"}}>
          No Directors To Show
        </div>
      ) : (
        <div>
          <p style={{color: "#757575", marginBottom: "0.5rem"}}>
            {directorsToShow.length > 1
              ? 'Showing ' + directorsToShow.length + ' Directors'
              : 'Showing One Director' }
          </p>
          <div className="images">
            {directorsToShow.map((director) => (
              <div className="images__image-area" key={director.id}>
                <Link to={`${director.id}`}>
                  <Director source={director} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </Authorized>
  );
}
