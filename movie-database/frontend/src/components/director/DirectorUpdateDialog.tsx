import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { yupResolver } from '@hookform/resolvers/yup';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Director } from "../../models";
import { DirectorsApi } from "../../services";
import { directorFormSchema } from "../../schema/Director";
import defaultDirectorPicture from "../../../public/director.jpg";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    dialogTitle: string;
    director: Director;
  }

export const DirectorUpdateDialog: React.FC<Props> = ({ isOpen, onClose, dialogTitle, director }) => {

  const [birthDate, setBirthDate] =  useState<Date>(director.birthDate);
  const [dateOfDeath, setDateOfDeath] = useState<Date | null>(director.dateOfDeath);
  const [picture, setPicture] = useState<string | null>(director.picture ? director.picture : defaultDirectorPicture);

  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Director>({
    defaultValues: {
      name: director.name,
      description: director.description,
      picture: picture,
      birthDate: birthDate,
      dateOfDeath: dateOfDeath,
    },
    resolver: yupResolver(directorFormSchema),
  });

  const updateDirectorMutation = useMutation(
    (input: Director) => {
      return DirectorsApi.update(director.id, input.name, birthDate, input.description,
        dateOfDeath ? dateOfDeath : undefined, picture ? picture : undefined)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['director',  director.id]);
        reset();
        onClose();
      },
    }
  );

  const updateDirector: SubmitHandler<Director> = async (data) => {
    updateDirectorMutation.mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Director Dialog"
    className="movie-dialog">
      <h2>{dialogTitle}</h2>
      <form onSubmit={handleSubmit(updateDirector)}
        onKeyDown={(e) => { if (e.key === 'Enter') {handleSubmit(updateDirector)} }}>
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
            {...register("picture")}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setPicture(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
          <span className='form__error'>{errors.picture?.message || ' '}</span>
        </div>
        <div>
          <label className="form__label" htmlFor="birthDate">Director birthDate</label>
					<DatePicker
            {...register("birthDate")}
            dateFormat="dd/MM/yyyy"
						selected={new Date(birthDate)}
						onChange={(date: Date) => setBirthDate(date)}
						className="form__input"
					/>
          <span className='form__error'>{errors.birthDate?.message || ' '}</span>
        </div>
        <div>
          <label className="form__label" htmlFor="dateOfDeath">Director dateOfDeath</label>
          <DatePicker
            {...register("dateOfDeath")}
            dateFormat="dd/MM/yyyy"
            selected={dateOfDeath ? new Date(dateOfDeath) : null} 
            onChange={(date) => setDateOfDeath(date)}
						className="form__input"
					/>
          <span className='form__error'>{errors.dateOfDeath?.message || ' '}</span>
        </div>
        <div className='flex-center-gap'>
          <button className="form__button" type="submit">Submit</button>
          <button className='form__button' type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  )
}

export default DirectorUpdateDialog;




// import { useEffect, useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { yupResolver } from '@hookform/resolvers/yup';
// import Modal from 'react-modal';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Director } from "../../models";
// import { DirectorsApi } from "../../services";
// import { directorFormSchema } from "../../schema/Director";

// interface Props {
//     isOpen: boolean;
//     onClose: () => void;
//       dialogTitle: string;
//       id: string
//   }

// export const DirectorUpdateDialog: React.FC<Props> = ({ isOpen, onClose, dialogTitle, id}) => {

//   const [name, ] = useState<string>('');
//   const [birthDate, setBirthDate] =  useState<Date | null>(new Date());
//   const [dateOfDeath, setDateOfDeath] = useState<Date | null>(null);
//   const [picture, setPicture] = useState<string | undefined>('');

//   const { register, handleSubmit, reset, formState: { errors } } = useForm<Director>({
//     defaultValues: {
//       name: director.name,
//       description: director.description,
//       picture: director.picture,
//       birthDate: director.birthDate,
//       dateOfDeath: director.dateOfDeath,
//     },
//     resolver: yupResolver(directorFormSchema),
// });

//   const queryClient = useQueryClient();

//   const updateDirectorMutation = useMutation(
//     (input: Director) => {
//       if (!dateOfDeath && !picture) {
//         return DirectorsApi.updateWithoutPictureDeath(input.id, input.name, !birthDate ? new Date() : birthDate, input.description)
//       } else if (!dateOfDeath && picture) {
//         return DirectorsApi.updateWithoutDeath(input.id, name, !birthDate ? new Date() : birthDate, input.description, picture)
//       } else if (!picture && dateOfDeath) {
//         return DirectorsApi.updateWithoutPicture(input.id, name, !birthDate ? new Date() : birthDate, input.description, dateOfDeath)
//       } else {
//         return DirectorsApi.update(input.id, name, !birthDate ? new Date() : birthDate, input.description, !dateOfDeath ? new Date() : dateOfDeath, picture)
//       }
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(['director']);
//         reset();
//         onClose();
//       },
//     }
//   );

//   const updateDirector: SubmitHandler<Director> = async (data) => {
//     updateDirectorMutation.mutate(data);
//   };

//   return (
//     <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Director Dialog" className="movie-dialog">
//       <h2>{dialogTitle}</h2>
//       <form onSubmit={handleSubmit(updateDirector)}
//         onKeyDown={(e) => { if (e.key === 'Enter') {handleSubmit(updateDirector)} }}>
//         <div>
//           <label className="form__label" htmlFor="name">Director name</label>
//           <input className="form__input" id="name" {...register("name")} />
//           <span className='form__error'>{errors.name?.message || ' '}</span>
//         </div>
//         <div>
//           <label className="form__label" htmlFor="description">Director description</label>
//           <input className="form__input" id="description" {...register("description")} />
//           <span className='form__error'>{errors.description?.message || ' '}</span>
//         </div>
//         <div>
//           <label className="form__label" htmlFor="picture">Movie picture</label>
//           <input className="form__input" type='file' accept='.jpg, .svg, .png' id="picture"
//             onChange={(e) => {
//               if (e.target.files && e.target.files[0]) {
//                 setPicture(URL.createObjectURL(e.target.files[0]));
//               }
//             }}
//           />
//           <span className='form__error'>{errors.picture?.message || ' '}</span>
//         </div>
//         <div>
//           <label className="form__label" htmlFor="birthDate">Director birthDate</label>
// 					<DatePicker 
//             id="birthDate"
//             {...register("birthDate")}
// 						selected={birthDate}
// 						onChange={(date: Date) => setBirthDate(date)}
// 						className="form__input"
// 					/>
//           <span className='form__error'>{errors.birthDate?.message || ' '}</span>
//         </div>
//         <div>
//           <label className="form__label" htmlFor="dateOfDeath">Director dateOfDeath</label>
//           <DatePicker 
// 						id="dateOfDeath"
// 						{...register("dateOfDeath")}
// 						selected={dateOfDeath}
// 						onChange={(date: Date) => setDateOfDeath(date)}
// 						className="form__input"
// 					/>
//           <span className='form__error'>{errors.dateOfDeath?.message || ' '}</span>
//         </div>
//         <div className='flex-center-gap'>
//           <button className="form__button" type="submit" onSubmit={handleSubmit(updateDirector)}>Submit</button>
//           <button className='form__button' type="button" onClick={onClose}>Cancel</button>
//         </div>
//       </form>
//     </Modal>
//   )
// }

// export default DirectorUpdateDialog;
