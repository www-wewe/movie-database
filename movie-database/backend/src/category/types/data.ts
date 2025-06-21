export type Category = {
  id: string;
  createdAt: Date;
  deletedAt?: Date | null;
  name: string;
  picture?: string | null;
};

export type CategoryCreateData = {
  name: string;
  picture?: string | null;
};

export type CategoryUpdateData = {
  id: string;
} & (
  | {
      name: string;
      picture: string;
    }
  | { name: string }
  | { picture: string }
);

export type CategorySpecificByIdData = {
  id: string;
};
