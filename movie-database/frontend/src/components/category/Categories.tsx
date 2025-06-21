import { useQuery } from "@tanstack/react-query";
import { CategoriesApi } from "../../services";
import Category from "./Category";
import Authorized from "../Authorized";

export default function Categories() {

  const {data} = useQuery({
    queryKey: ['category'],
    queryFn: () => {
      return CategoriesApi.getAll();
    },
  });

  if (!data || !data.data) return null;

  const categories = data.data;

  return (
    <Authorized roles={["ADMIN", "USER"]}>
      {categories.length === 0 ? (
        <div style={{color: "orange", marginBottom: "0.5rem"}}>
          No Categories To Show
        </div>
      ) : (
        <div>
          <p style={{color: "#757575", marginBottom: "0.5rem"}}>
            {categories.length > 1
              ? 'Showing ' + categories.length + ' Categories'
              : 'Showing One Category' }
          </p>
          <div className="images">
            {categories.map((category) => (
              <div className="images__image-area" key={category.id}>
                <div>
                  <Category source={category} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Authorized>
  );
}
