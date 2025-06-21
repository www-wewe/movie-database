import React, { useState } from 'react';
import Modal from 'react-modal';
import { Category } from '../../models/categoryType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { categoryFormSchema } from '../../schema/Category';
import { yupResolver } from '@hookform/resolvers/yup';
import { CategoriesApi } from '../../services';
import defaultPicture from '../../../public/category.jpg'

Modal.setAppElement('#root');

interface Props {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
}

export const CategoryUpdateDialog: React.FC<Props> = ({ isOpen, onClose, category }) => {
	
	const [picture, setPicture] = useState<string | undefined>('');

	const { register, handleSubmit, reset, formState: { errors } } = useForm<Category>({
		defaultValues: {
				name: category.name,
				picture: category.picture ? category.picture : defaultPicture,
		},
		resolver: yupResolver(categoryFormSchema),
	});

	const queryClient = useQueryClient();

	const updateCategoryMutation = useMutation(
		(input: Category) => CategoriesApi.update(category.id, input.name, picture),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['category']);
				reset();
				onClose();
			},
		}
	);
		
	const updateCategory: SubmitHandler<Category> = async (data) => {
		updateCategoryMutation.mutate(data);
	};

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Category dialog" className="category-dialog">
      <h2>Edit category</h2>
      <form onSubmit={handleSubmit(updateCategory)}
			onKeyDown={(e) => { if (e.key === 'Enter') {handleSubmit(updateCategory)} }}>
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
