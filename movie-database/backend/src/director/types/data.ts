export type Director = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  name: string;
  birthDate: Date;
  dateOfDeath?: Date | null;
  description: string;
  picture?: string | null;
};

export type DirectorCreateData = {
  name: string;
  birthDate: Date;
  dateOfDeath?: Date | null;
  description: string;
  picture?: string | null;
};

export type DirectorUpdateData = {
  id: string;
  name: string;
  birthDate: Date;
  dateOfDeath?: Date | null;
  description: string;
  picture?: string | null;
};

export type DirectorSpecificByIdData = {
  id: string;
};
