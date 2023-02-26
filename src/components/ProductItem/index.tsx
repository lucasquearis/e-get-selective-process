import styled from "styled-components";
import { IProduct } from "../../utils/api";
import { toRealCurrency } from "../../utils/functions";
import { EditIcon } from "../Icon/Edit";
import { MinusIcon } from "../Icon/Minus";
import { StyledHeader, StyledList } from "../ProductsList";

interface IProductItem extends IProduct {
  handleEdit: (product: IProduct) => void;
  handleDelete: (product: IProduct) => void;
}

const Paragraph = styled.p`
  width: 10%;
  margin: 0px 8px;
  text-align: center;
  width: 10%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export function ProductHeader() {
  return (
    <StyledHeader>
      <Paragraph>Id</Paragraph>
      <Paragraph>Image</Paragraph>
      <Paragraph>Product Name</Paragraph>
      <Paragraph>Purchase Date</Paragraph>
      <Paragraph>Due date</Paragraph>
      <Paragraph>Comments</Paragraph>
      <Paragraph>Cost price</Paragraph>
      <Paragraph>Sale Price</Paragraph>
      <Paragraph>Edit</Paragraph>
      <Paragraph>Remove</Paragraph>
    </StyledHeader>
  );
}

function ProductItem({
  id,
  productName,
  base64Image,
  comments,
  costPrice,
  dueDate,
  purchaseDate,
  salePrice,
  handleEdit,
  handleDelete,
}: IProductItem) {
  return (
    <>
      <StyledList style={{ padding: "30px 0" }}>
        <Paragraph>{id}</Paragraph>
        <Paragraph>
          {<img width={40} height={40} src={base64Image}></img>}
        </Paragraph>
        <Paragraph>{productName}</Paragraph>
        <Paragraph>{purchaseDate}</Paragraph>
        <Paragraph>{dueDate}</Paragraph>
        <Paragraph>{comments}</Paragraph>
        <Paragraph>{toRealCurrency(Number(costPrice))}</Paragraph>
        <Paragraph>{toRealCurrency(Number(salePrice))}</Paragraph>
        <Paragraph>
          <EditIcon
            onClick={() =>
              handleEdit({
                id,
                productName,
                base64Image,
                comments,
                costPrice,
                dueDate,
                purchaseDate,
                salePrice,
              })
            }
          />
        </Paragraph>
        <Paragraph>
          <MinusIcon
            onClick={() =>
              handleDelete({
                id,
                productName,
                base64Image,
                comments,
                costPrice,
                dueDate,
                purchaseDate,
                salePrice,
              })
            }
          />
        </Paragraph>
      </StyledList>
    </>
  );
}

export default ProductItem;
