export interface UserFilterData {
	userName: string,
	email: string,
}
  
export const defaultUserFilterData: UserFilterData = {
	userName: '',
	email: '',
}

export interface UsersPreferences {
	favourites: Set<string>;
	watchList: Set<string>;
}