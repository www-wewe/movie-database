import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userFilterDataAtom } from "../../state/atoms";
import { UserFilterData, defaultUserFilterData } from "../../models/user";

export default function UsersFilter() {
    const [filtering, setFiltering] = React.useState<boolean>(false);

    const [globalFilterData, setGlobalFilterData] =
      useRecoilState(userFilterDataAtom);

    const [localFilterData, setLocalFilterData] =
    React.useState<UserFilterData>({
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

    const handleFilterUsers = () => {
        setFiltering(true);
    };

    const handleClearFilter = () => {
        setGlobalFilterData({ ...defaultUserFilterData });
    };

    return (
      <div className='filter-container'>
        <div className="filter-inner-container">
          <div className="flex-center-gap">
            <div>
              {/* USER NAME */}
              <div className="padding-bottom">
                <label htmlFor="filter-userName" className="filter__label">UserName</label>
                <input
                  className="form__input"
                  type="text"
                  id="filter-userName"
                  value={localFilterData.userName || ''}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setLocalFilterData((prev) => ({
                      ...prev,
                      userName: event.target.value,
                    }));
                  }}
                />
              </div>
              {/* EMAIL */}
              <div className="padding-bottom">
                <label htmlFor="filter-email" className="filter__label">Email</label>
                <input
                  type="text"
                  id="filter-email"
                  value={localFilterData.email || ''}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setLocalFilterData((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }));
                  }}
                  className="form__input"
                />
              </div>
            </div>
          </div>
          <div className="flex-center-gap">
            <button className="form__button" type="submit" onClick={handleFilterUsers} disabled={filtering}>
              <div className="filter__button-label">Filter</div>
            </button>
            <button className="form__button" type="submit" onClick={handleClearFilter} disabled={filtering}>	
              <div className="filter__button-label">Reset filter</div>
            </button>
          </div>
				</div>
      </div>
    );
  }