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
  costPrice: string;
  salePrice: string;
  purchaseDate: string;
  dueDate: string;
  comments: string;
  base64Image?: string | undefined;
  id?: number;
}

interface IGetUserByUserName {
  userName: string;
}

interface ISold extends IProduct {
  soldDate: string;
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

export const getAllProductsLoss = async () => {
  try {
    return axios.get<IProduct[]>(`${URL}loss`);
  } catch (error) {
    console.error(error);
  }
};

export const getAllProductsSold = async () => {
  try {
    return axios.get<IProduct[]>(`${URL}sold`);
  } catch (error) {
    console.error(error);
  }
};

export const getAllProductsExpired = async () => {
  try {
    return axios.get<IProduct[]>(`${URL}expired`);
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (id: number) => {
  try {
    return axios.delete(`${URL}products/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const editProduct = async ({
  base64Image,
  comments,
  dueDate,
  purchaseDate,
  salePrice,
  costPrice,
  productName,
  id,
}: IProduct) => {
  try {
    return axios.put(`${URL}products/${id}`, {
      base64Image,
      comments,
      dueDate,
      purchaseDate,
      salePrice,
      costPrice,
      productName,
    });
  } catch (error) {
    console.error(error);
  }
};

export const addToLoss = (product: IProduct) => {
  try {
    const {
      productName,
      comments,
      costPrice,
      dueDate,
      purchaseDate,
      salePrice,
    } = product;
    return axios.post(`${URL}loss`, {
      productName,
      comments,
      costPrice,
      dueDate,
      purchaseDate,
      salePrice,
    });
  } catch (error) {
    console.error(error);
  }
};

export const addToSold = (product: ISold) => {
  try {
    const {
      productName,
      comments,
      costPrice,
      dueDate,
      purchaseDate,
      salePrice,
      soldDate,
    } = product;
    return axios.post(`${URL}sold`, {
      productName,
      comments,
      costPrice,
      dueDate,
      purchaseDate,
      salePrice,
      soldDate,
    });
  } catch (error) {
    console.error(error);
  }
};

export const addToExpired = (product: IProduct) => {
  try {
    const {
      productName,
      comments,
      costPrice,
      dueDate,
      purchaseDate,
      salePrice,
    } = product;
    return axios.post(`${URL}expired`, {
      productName,
      comments,
      costPrice,
      dueDate,
      purchaseDate,
      salePrice,
    });
  } catch (error) {
    console.error(error);
  }
};
