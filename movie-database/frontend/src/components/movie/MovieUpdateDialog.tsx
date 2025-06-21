import React, { useState } from 'react';
import Modal from 'react-modal';
import { Movie } from '../../models/movieType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { movieFormSchema } from '../../schema/Movie';
import { yupResolver } from '@hookform/resolvers/yup';
import { CategoriesApi, DirectorsApi, MoviesApi } from '../../services';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Category, Director } from '../../models';
import defaultMoviePicture from '../../../public/movie-default-picture.jpg'
import { MovieForm } from '../../models/movie';

Modal.setAppElement('#root');

interface Props {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie;
}

export const MovieUpdateDialog: React.FC<Props> = ({ isOpen, onClose, movie }) => {

	const [picture, setPicture] = useState<string | undefined>('');
	const [releaseDate, setReleaseDate] = useState<Date>(new Date(movie.releaseDate));
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
		defaultValues: {
				title: movie.title,
                originalTitle: movie.originalTitle,
                description: movie.description,
                language: movie.language,
                cast: movie.cast,
                duration: movie.duration,
				picture: movie.picture ? movie.picture : defaultMoviePicture
		},
		resolver: yupResolver(movieFormSchema),
	});

	const updateMovieMutation = useMutation(
		(data: MovieForm) => MoviesApi.update(
            movie.id, data.description, data.title, data.originalTitle, 
            data.language, data.directorId, data.categoryId, data.duration, 
            data.cast, releaseDate, picture),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['movie', movie.id]);
				reset();
				onClose();
			}
		}
	);
		
	const updateMovie: SubmitHandler<MovieForm> = async (data) => {
		updateMovieMutation.mutate(data);
	};

	if (categories === undefined || directors === undefined) {
		throw new Error("Loading categories or directors")
	}

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Movie dialog"
		className="movie-dialog">
      <h2>Edit movie</h2>
      <form onSubmit={handleSubmit(updateMovie)}
			onKeyDown={(e) => { if (e.key === 'Enter') {handleSubmit(updateMovie)} }}>
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
					defaultValue={movie.director.id}
					>
						{directors.map((director) => (
							<option key={director.id} value={director.id}>{director.name}</option>
						))}
					</select>
					<span className='form__error'>{errors.directorId?.message || ' '}</span>
				</div>
                <div>
					<label className="form__label" htmlFor="category">Movie category name</label>
					<select className="form__input" id="categoryId"{...register("categoryId")}
					defaultValue={movie.category.id}
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
						{...register("picture")}
						defaultValue={picture}
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
