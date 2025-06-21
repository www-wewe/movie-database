import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { directorFilterDataAtom } from "../../state/atoms";
import { DirectorFilterData, defaultDirectorFilterData } from "../../models/director";

export default function DirectorsFilter() {
	const [filtering, setFiltering] = useState<boolean>(false);

	const [globalFilterData, setGlobalFilterData] =
		useRecoilState(directorFilterDataAtom);

	const [localFilterData, setLocalFilterData] =
	useState<DirectorFilterData>({
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

	const handleFilterDirectors = () => {
			setFiltering(true);
	};

	const handleClearFilter = () => {
			setGlobalFilterData({ ...defaultDirectorFilterData });
	};

	return (
		<div className='filter-container'>
			<div className="filter-inner-container">
				<div className="flex-center-gap">
					<div>
						{/* DIRECTOR NAME */}
						<div className="padding-bottom">
							<label htmlFor="filter-name" className="filter__label">Director name</label>
							<input
								className="form__input"
								type="text"
								id="filter-name"
								value={localFilterData.name || ''}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									setLocalFilterData((prev) => ({
										...prev,
										name: event.target.value,
									}));
								}}
							/>
						</div>
					</div>
				</div>
				<div className="flex-center-gap">
                    <button className="form__button" type="submit" onClick={handleFilterDirectors} disabled={filtering}>
					    <div className="filter__button-label">Filter</div>
					</button>
					<button className="form__button --button-font" type="submit" onClick={handleClearFilter} disabled={filtering}>
						<div className="filter__button-label">Reset filter</div>
					</button>
				</div>
			</div>
		</div>
	);
}