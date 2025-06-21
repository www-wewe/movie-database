import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { movieFilterDataAtom } from "../../state/atoms";
import { MovieFilterData, defaultMovieFilterData } from "../../models/movie";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../../models";
import { CategoriesApi } from "../../services";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Authorized from "../Authorized";

export default function MovieFilter() {
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [filtering, setFiltering] = useState<boolean>(false);

  const [globalFilterData, setGlobalFilterData] =
    useRecoilState(movieFilterDataAtom);

  const [localFilterData, setLocalFilterData] =
    useState<MovieFilterData>({
      ...globalFilterData,
  });


  useEffect(() => {
    if (filtering) {
      setFiltering(false);
    } else {
      setLocalFilterData({ ...globalFilterData });
    }
  }, [globalFilterData]);

  useEffect(() => {
    if (filtering) {
      setGlobalFilterData({ ...localFilterData });
    }
  }, [filtering]);

  const handleFilterMovies = () => {
    setFiltering(true);
  };

  const handleClearFilter = () => {
    setGlobalFilterData({ ...defaultMovieFilterData });
  };

  useQuery({
    queryKey: ['category'],
    queryFn: () => {
      return CategoriesApi.getAll();
    },
    onSuccess: (categories) => {
      setCategories(categories.data);
    }
  });

  return (
    <div className='filter-container'>
      <div className="filter-inner-container">
        <div className="flex-center-gap">
          <div>
            {/* MIN DATE */}
            <div className="padding-bottom">
              <label className="filter__label" htmlFor="filter-min-date">MovieMinDate</label>
              <DatePicker
                id="releaseDate"
                selected={localFilterData.minDate === null ? null : localFilterData.minDate}
                onChange={(date: Date) => {
                  setLocalFilterData((prev) => ({
                    ...prev,
                    minDate: date,
                   }));
                }}
                className="form__input"
              />
            </div>

          {/* MAX DATE */}
          <div className="padding-bottom">
            <label className="filter__label" htmlFor="filter-max-date">MovieMaxDate</label>
            <DatePicker
              id="filter-max-date"
              selected={localFilterData.maxDate === null ? null : localFilterData.maxDate}
              onChange={(date: Date) => {
                setLocalFilterData((prev) => ({
                  ...prev,
                  maxDate: date,
                }));
              }}
              className="form__input"
            />
          </div>
        </div>
              
        <div>
        {/* TITLE */}
           <div className="padding-bottom">
              <label htmlFor="filter-title" className="filter__label">Title</label>
              <input
                className="form__input"
                type="text"
                id="filter-title"
                value={localFilterData.title || ''}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setLocalFilterData((prev) => ({
                    ...prev,
                    title: event.target.value,
                  }));
                }}
              />
            </div>

            {/* DIRECTOR */}
            <div className="padding-bottom">
              <label htmlFor="filter-director" className="filter__label">
                Director
              </label>
              <input
                type="text"
                id="filter-director"
                value={localFilterData.director || ''}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setLocalFilterData((prev) => ({
                    ...prev,
                    director: event.target.value,
                  }));
                }}
                className="form__input"
              />
            </div>
          </div>

          <div>
            {/* CATEGORY */}
            <div className="padding-bottom">
              <label className="filter__label" htmlFor="filter-category-select">MovieCategory</label>
              <select className="form__input"
                id="filter-category-select" 
                value={localFilterData.category === null ? '' : localFilterData.category} 
                onChange={(event) =>
                  setLocalFilterData((prev) => ({
                    ...prev,
                    category: event.target.value.length > 0 ? event.target.value : null,
                  }))
                }
              >
              <option value=""></option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
              </select>
            </div>
            {/* ONLY FAVOURITES */}
            <Authorized roles={["USER"]}>
              <div className="filter-form__checkbox">
                <input
                  type="checkbox"
                  id="filter-only-favourites"
                  checked={localFilterData.onlyFavourites}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setLocalFilterData((prev) => ({
                      ...prev,
                      onlyFavourites: event.target.checked,
                    }))
                  }
                />
                <label htmlFor="filter-only-favourites" className="filter__label">FavouritesOnly</label>
              </div>
            </Authorized>

           {/* ONLY WATCH LATER */}
           <Authorized roles={["USER"]}>
            <div className="filter-form__checkbox">
                <input
                  type="checkbox"
                  id="filter-only-watchLater"
                  checked={localFilterData.onlyWatchLater}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setLocalFilterData((prev) => ({
                      ...prev,
                      onlyWatchLater: event.target.checked,
                    }))
                  }
                />
                <label htmlFor="filter-only-watchLater" className="filter__label">WatchLaterOnly</label>
              </div>
           </Authorized>

          </div>
        </div>

        <div>
          <div className="flex-center-gap">
            <button className="form__button" type="submit" onClick={handleFilterMovies} disabled={filtering}>
              <div className="filter__button-label">Filter</div>
            </button>
            <button className="form__button --button-font" type="submit" onClick={handleClearFilter} disabled={filtering}>
              <div className="filter__button-label">Reset filter</div>
            </button>
          </div>
        </div>        
      </div>
    </div>
  );
}