import React, { useState } from 'react';
import Modal from 'react-modal';
import { User } from '../../models/userType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UsersApi } from '../../services';
import { UserFormUpdateSchema } from '../../schema/User';
import userDefaultAvatar from '../../../public/profile-icon.jpg'

Modal.setAppElement('#root');

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User
}

export const UserUpdateDialog: React.FC<Props> = ({ isOpen, onClose, user}) => {
	
	const [avatar, setAvatar] = useState<string | undefined>(user.avatar ? user.avatar : userDefaultAvatar);

	const { register, handleSubmit, reset, formState: { errors } } = useForm<User>({
		defaultValues: {
				userName: user.userName,
                avatar: avatar,
		},
		resolver: yupResolver(UserFormUpdateSchema),
	});

	const queryClient = useQueryClient();

	const updateUserMutation = useMutation(
		(input: User) => {
			return UsersApi.updateProfile(input.userName, avatar)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['user']);
				reset();
				onClose();
			},
		}
	);
		
	const updateUser: SubmitHandler<User> = async (data) => {
		updateUserMutation.mutate(data);
	};

	return (
      <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="User dialog" className="user-dialog">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit(updateUser)}
		onKeyDown={(e) => { if (e.key === 'Enter') {handleSubmit(updateUser)} }}>
			<div>
				<label className="form__label" htmlFor="name">User name</label>
				<input className="form__input" id="userName" {...register("userName")}/>
				<span className='form__error'>{errors.userName?.message || ' '}</span>
			</div>
			<div>
				<label className="form__label" htmlFor="avatar">User profile picture</label>
				<input className="form__input" type='file' accept='.jpg, .svg, .png' id="avatar"
					onChange={(e) => {
						if (e.target.files && e.target.files[0]) {
							setAvatar(URL.createObjectURL(e.target.files[0]));
						}
					}}
				/>
				<span className='form__error'>{errors.avatar?.message || ' '}</span>
			</div>
			<div className='flex-center-gap'>
				<button className='form__button' type="submit">Submit</button>
				<button className='form__button' type="button" onClick={onClose}>Cancel</button>
			</div>
		</form>
    </Modal>
  );
};