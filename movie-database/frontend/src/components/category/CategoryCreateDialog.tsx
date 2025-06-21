import React, { useState } from 'react';
import Modal from 'react-modal';
import { Category } from '../../models/categoryType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { categoryFormSchema } from '../../schema/Category';
import { yupResolver } from '@hookform/resolvers/yup';
import { CategoriesApi } from '../../services';

Modal.setAppElement('#root');

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CategoryCreateDialog: React.FC<Props> = ({ isOpen, onClose}) => {
	
	const [picture, setPicture] = useState<string | undefined>('');
	const [name, ] = useState('');

	const { register, handleSubmit, reset, formState: { errors } } = useForm<Category>({
		defaultValues: {
				name: name,
				picture: picture,
		},
		resolver: yupResolver(categoryFormSchema),
	});

	const queryClient = useQueryClient();

	const createCategoryMutation = useMutation(
		(category: Category) => CategoriesApi.create(category.name, picture),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['category']);
				reset();
				onClose();
			},
		}
	);
		
	const createCategory: SubmitHandler<Category> = async (data) => {
		createCategoryMutation.mutate(data);
	};

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Category dialog" className="category-dialog">
      <h2>Create category</h2>
      <form onSubmit={handleSubmit(createCategory)}
			onKeyDown={(e) => { if (e.key === 'Enter') {handleSubmit(createCategory)} }}>
				<div>
					<label className="form__label" htmlFor="name">Category name</label>
					<input className="form__input" id="name" {...register("name")}/>
					<span className='form__error'>{errors.name?.message || ' '}</span>
				</div>
				<div>
					<label className="form__label" htmlFor="picture">Category picture</label>
					<input className="form__input" type='file' accept='.jpg, .svg, .png' id="picture"
						onChange={(e) => {
							if (e.target.files && e.target.files[0]) {
								setPicture(URL.createObjectURL(e.target.files[0]));
							}
						}}
					/>
					<span className='form__error'>{errors.picture?.message || ' '}</span>
				</div>
				<div className='flex-center-gap'>
					<button className='form__button' type="submit">Submit</button>
					<button className='form__button' type="button" onClick={onClose}>Cancel</button>
				</div>
			</form>
    </Modal>
  );
};
