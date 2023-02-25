import axios from "axios";
const URL = process.env.BD_URL_LOCAL;

export interface IUser {
  fullName: string;
  userName: string;
  password: string;
  isAnAdministrator: boolean;
  id?: string;
}

interface IGetUserByUserName {
  userName: string;
}

export const createUser = async ({
  fullName,
  userName,
  password,
  isAnAdministrator,
}: IUser) => {
  try {
    return axios.post(`${URL}users`, {
      fullName,
      userName,
      password,
      isAnAdministrator,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUserByUserName = async ({ userName }: IGetUserByUserName) => {
  try {
    return axios.get<IUser[]>(`${URL}users?userName=${userName}`);
  } catch (error) {
    console.error(error);
  }
};
