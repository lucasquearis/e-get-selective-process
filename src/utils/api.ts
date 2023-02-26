import axios from "axios";
const URL = process.env.BD_URL_LOCAL;

export interface IUser {
  fullName: string;
  userName: string;
  password: string;
  isAnAdministrator: boolean;
  id?: string;
}

export interface IProduct {
  productName: string;
  costPrice: number;
  salePrice: number;
  purchaseDate: string;
  dueDate: string;
  comments: string;
  base64Image: string | undefined;
  id?: number;
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

export const addProduct = async ({
  productName,
  costPrice,
  salePrice,
  purchaseDate,
  dueDate,
  comments,
  base64Image,
}: IProduct) => {
  try {
    return axios.post<IProduct>(`${URL}products`, {
      productName,
      costPrice,
      salePrice,
      purchaseDate,
      dueDate,
      comments,
      base64Image,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllProducts = async () => {
  try {
    return axios.get<IProduct[]>(`${URL}products`);
  } catch (error) {
    console.error(error);
  }
};
