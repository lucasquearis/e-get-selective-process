import moment from "moment";
import { Dispatch } from "react";
import { IRequiredFields } from "../pages/Home/RegisterProducts";

export const getBase64 = (
  file: File,
  callback: Dispatch<React.SetStateAction<string | undefined>>
) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    if (typeof reader.result === "string") {
      callback(reader.result);
    }
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
};

export const checkRequiredFields = ({
  productName,
  costPrice,
  salePrice,
  purchaseDate,
  dueDate,
}: IRequiredFields) => {
  if (!productName) return "Product name is required!";
  if (!costPrice) return "Cost price is required!";
  if (!salePrice) return "Sale price is required!";
  if (!purchaseDate) return "Purchase Date is required!";
  if (!dueDate) return "Due date is required!";
  if (
    !moment(purchaseDate, "DD/MM/YYYY").isValid() ||
    purchaseDate.replace(/[^\d]/g, "").length !== 8
  )
    return "Purchase date invalid format!";
  if (
    !moment(dueDate, "DD/MM/YYYY").isValid() ||
    dueDate.replace(/[^\d]/g, "").length !== 8
  )
    return "Due date invalid format!";
};

export const toRealCurrency = (value: number) => {
  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};
