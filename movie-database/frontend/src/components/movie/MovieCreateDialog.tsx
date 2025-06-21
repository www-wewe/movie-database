import React, { useState } from 'react';
import Modal from 'react-modal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { movieFormSchema } from '../../schema/Movie';
import { yupResolver } from '@hookform/resolvers/yup';
import { CategoriesApi, DirectorsApi, MoviesApi } from '../../services';
import { Category, Director } from '../../models';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MovieForm } from '../../models/movie';

Modal.setAppElement('#root');

interface Props {
  isOpen: boolean;
  onClose: () => void;
  dialogTitle: string;
}

export const MovieCreateDialog: React.FC<Props> = ({ isOpen, onClose, dialogTitle }) => {
	const [picture, setPicture] = useState<string | undefined>('');
	const [releaseDate, setReleaseDate] = useState<Date>(new Date());
	const [categories, setCategories] = useState<Category[]>([]);
	const [directors, setDirectors] = useState<Director[]>([]);

	useQuery({
		queryKey: ['category'],
		queryFn: () => {
			return CategoriesApi.getAll();
		},
		onSuccess: (categories) => {
			setCategories(categories.data);
		}
	});
	
	useQuery({
		queryKey: ['director'],
		queryFn: () => {
			return DirectorsApi.getAll();
		},
		onSuccess: (directors) => {
			setDirectors(directors.data);
		}
	});

	const queryClient = useQueryClient();

	const { register, handleSubmit, reset, formState: { errors } } = useForm<MovieForm>({
		resolver: yupResolver(movieFormSchema),
	});

	const createMovieMutation = useMutation(
		(movie: MovieForm) => MoviesApi.create(
            movie.description, movie.title, movie.originalTitle, movie.language, 
            movie.directorId, movie.categoryId, movie.duration, movie.cast, 
            releaseDate ? releaseDate : new Date(), picture),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['movie']);
				reset();
				onClose();
			},
		}
	);

	const createMovie: SubmitHandler<MovieForm> = async (data) => {
		createMovieMutation.mutate(data);
	};

	if (categories === undefined || directors === undefined) {
		throw new Error("Loading categories or directors")
	}

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Movie dialog"
		className="movie-dialog">
      <h2>{dialogTitle}</h2>
      <form onSubmit={handleSubmit(createMovie)}
			onKeyDown={(e) => { if (e.key === 'Enter') {handleSubmit(createMovie)} }}>
				<div>
					<label className="form__label" htmlFor="title">Movie title</label>
					<input className="form__input" id="title" {...register("title")}/>
					<span className='form__error'>{errors.title?.message || ' '}</span>
				</div>
                <div>
					<label className="form__label" htmlFor="originalTitle">Movie original title</label>
					<input className="form__input" id="originalTitle" {...register("originalTitle")}/>
					<span className='form__error'>{errors.originalTitle?.message || ' '}</span>
				</div>
                <div>
					<label className="form__label" htmlFor="description">Movie description</label>
					<input className="form__input" id="description" {...register("description")}/>
					<span className='form__error'>{errors.description?.message || ' '}</span>
				</div>
                <div>
					<label className="form__label" htmlFor="language">Movie original language</label>
					<input className="form__input" id="language" {...register("language")}/>
					<span className='form__error'>{errors.language?.message || ' '}</span>
				</div>
                <div>
					<label className="form__label" htmlFor="director">Movie director</label>
					<select className="form__input" id="director" {...register("directorId")}
					>
						{directors.map((director) => (
							<option key={director.id} value={director.id}>{director.name}</option>
						))}
					</select>
					<span className='form__error'>{errors.directorId?.message || ' '}</span>
				</div>
                <div>
					<label className="form__label" htmlFor="category">Movie category name</label>
					<select className="form__input" id="category"{...register("categoryId")}
					>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>{category.name}</option>
						))}
					</select>
					<span className='form__error'>{errors.categoryId?.message || ' '}</span>
				</div>
                <div>
					<label className="form__label" htmlFor="cast">Movie cast</label>
					<input className="form__input" id="cast" {...register("cast")}/>
					<span className='form__error'>{errors.cast?.message || ' '}</span>
				</div>
                <div>
					<label className="form__label" htmlFor="duration">Movie duration time</label>
					<input className="form__input" id="duration" {...register("duration")}/>
					<span className='form__error'>{errors.duration?.message || ' '}</span>
				</div>
				<div>
					<label className="form__label" htmlFor="picture">Movie picture</label>
					<input className="form__input" type='file' accept='.jpg, .svg, .png' id="picture"
						onChange={(e) => {
							if (e.target.files && e.target.files[0]) {
								setPicture(URL.createObjectURL(e.target.files[0]));
							}
						}}
					/>
					<span className='form__error'>{errors.picture?.message || ' '}</span>
				</div>
                <div>
					<label className="form__label" htmlFor="releaseDate">Movie release date</label>
					<DatePicker
					dateFormat="dd/MM/yyyy"
                      id="releaseDate"
                      {...register("releaseDate")}
                      selected={releaseDate}
                      onChange={(date: Date) => setReleaseDate(date)}
                      className="form__input"
                      />
					<span className='form__error'>{errors.releaseDate?.message || ' '}</span>
				</div>
				<div className='flex-center-gap'>
					<button className='form__button' type="submit">Submit</button>
					<button className='form__button' type="button" onClick={onClose}>Cancel</button>
				</div>
			</form>
    </Modal>
  );
};
