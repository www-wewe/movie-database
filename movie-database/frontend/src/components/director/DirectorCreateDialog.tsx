import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { yupResolver } from '@hookform/resolvers/yup';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Director } from "../../models";
import { DirectorsApi } from "../../services";
import { directorFormSchema } from "../../schema/Director";
import defaultDirectorImage from '../../../public/director.jpg'

interface Props {
    isOpen: boolean;
    onClose: () => void;
      dialogTitle: string;
  }

export const DirectorCreateDialog: React.FC<Props> = ({ isOpen, onClose, dialogTitle }) => {

  const [name, ] = useState<string>('');
  const [description, ] = useState<string>('');
  const [birthDate, setBirthDate] =  useState<Date | null>(new Date());
  const [dateOfDeath, setDateOfDeath] = useState<Date | null>(new Date());
  const [image, setImage] = useState<string | undefined>('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Director>({
      defaultValues: {
          name: name,
          description: description,
          birthDate: birthDate ? birthDate : undefined,
          dateOfDeath: dateOfDeath,
          picture: !image ? defaultDirectorImage : image,
      },
      resolver: yupResolver(directorFormSchema),
  });

  const queryClient = useQueryClient();

  const createDirectorMutation = useMutation(
    (director: Director) => DirectorsApi.create(director.name, !director.birthDate ? new Date() : director.birthDate, 
        director.description, !director.dateOfDeath ? undefined : director.dateOfDeath, image),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['director']);
        reset();
        onClose();
      },
    }
  );
    
  const createDirector: SubmitHandler<Director> = async (data) => {
    createDirectorMutation.mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Director Dialog" className="director-dialog">
      <h2>{dialogTitle}</h2>
      <form onSubmit={handleSubmit(createDirector)}
        onKeyDown={(e) => { if (e.key === 'Enter') {handleSubmit(createDirector)} }}>
        <div>
          <label className="form__label" htmlFor="name">Director name</label>
          <input className="form__input" id="name" {...register("name")} />
          <span className='form__error'>{errors.name?.message || ' '}</span>
        </div>
        <div>
          <label className="form__label" htmlFor="description">Director description</label>
          <input className="form__input" id="description" {...register("description")} />
          <span className='form__error'>{errors.description?.message || ' '}</span>
        </div>
        <div>
          <label className="form__label" htmlFor="picture">Director picture</label>
          <input className="form__input" type='file' accept='.jpg, .svg, .png' id="picture"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
          <span className='form__error'>{errors.picture?.message || ' '}</span>
        </div>
        <div>
          <label className="form__label" htmlFor="birthDate">Director birthDate</label>
					<DatePicker
            dateFormat="dd/MM/yyyy"
            // id="birthDate"
            // {...register("birthDate")}
						selected={birthDate}
						onChange={(date: Date) => setBirthDate(date)}
						className="form__input"
					/>
          <span className='form__error'>{errors.birthDate?.message || ' '}</span>
        </div>
        <div>
          <label className="form__label" htmlFor="dateOfDeath">Director dateOfDeath</label>
          <DatePicker 
            dateFormat="dd/MM/yyyy"
            // value={dateOfDeath}
						// id="dateOfDeath"
						// {...register("dateOfDeath")}
						selected={dateOfDeath}
						onChange={(date: Date) =>  setDateOfDeath(date)}
						className="form__input"
					/>
          <span className='form__error'>{errors.dateOfDeath?.message || ' '}</span>
        </div>
        <div className='flex-center-gap'>
          <button className="form__button" type="submit">Create</button>
          <button className='form__button' type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  )
}

export default DirectorCreateDialog;
