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
    console.error("Error: ", error);
  };
};

export const checkRequiredFields = ({
  productName,
  costPrice,
  salePrice,
  purchaseDate,
  dueDate,
}: IRequiredFields) => {
  if (!productName) return "O nome do produto é obrigatório!";
  if (!costPrice) return "Preço de custo é obrigatório!";
  if (!salePrice) return "Sale price is required!";
  if (!purchaseDate) return "O preço de venda é obrigatório!";
  if (!dueDate) return "A data de vencimento é obrigatória!";
  if (
    !moment(purchaseDate, "DD/MM/YYYY").isValid() ||
    purchaseDate.replace(/[^\d]/g, "").length !== 8
  )
    return "Formato inválido da data de compra!";
  if (
    !moment(dueDate, "DD/MM/YYYY").isValid() ||
    dueDate.replace(/[^\d]/g, "").length !== 8
  )
    return "Data de vencimento formato inválido!";

  if (
    moment(dueDate, "DD/MM/YYYY").isBefore(moment(purchaseDate, "DD/MM/YYYY"))
  )
    return "A data da compra deve ser anterior à data de vencimento!";
};

export const toRealCurrency = (value: number) => {
  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};
