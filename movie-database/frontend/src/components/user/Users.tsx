import { useRecoilValue, useSetRecoilState } from "recoil";
import { usersAtom } from "../../state/atoms";
import { filteredUsersSelector } from "../../state/selectors";
import { useQuery } from "@tanstack/react-query";
import { UsersApi } from "../../services";
import User from "./User";
import { Link } from "react-router-dom";
import Authorized from "../Authorized";

export default function Users() {
    const setUsers = useSetRecoilState(usersAtom);

    useQuery({
      queryKey: ['user'],
      queryFn: () => {
          return UsersApi.getAll();
      },
      onSuccess: (users) => {
        setUsers(users.data);
      }
    });
  
    const usersToShow = useRecoilValue(
      filteredUsersSelector
    );

    return (
      <Authorized roles={["ADMIN"]}>
        {usersToShow.length === 0 ? (
          <div style={{color: "orange", marginBottom: "0.5rem"}}>
            No Users To Show
          </div>
          ) : (
          <div>
            <p style={{color: "#757575", marginBottom: "0.5rem"}}>
              {usersToShow.length > 1
                ? 'Showing Users: ' + usersToShow.length
                : 'Showing One User' }
            </p>
              <div className="images">
                {usersToShow.map((user) => (
                  <div className="images__image-area" key={user.id}>
                    <Link to={`${user.id}`}>
                      <User source={user} />
                    </Link>
                  </div>
                ))}
              </div>
          </div>
        )}
    </Authorized>    
    );
}
