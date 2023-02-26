import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { SyntheticEvent, useState } from "react";
import styled from "styled-components";
import { IProduct } from "../../utils/api";
import { toRealCurrency } from "../../utils/functions";

interface IProductItem extends IProduct {
  handleEdit: (e: SyntheticEvent) => void;
  handleDelete: (e: SyntheticEvent) => void;
}

const StyledList = styled.li`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.neutral[300]};
  min-height: 50px;
  display: flex;
  align-items: center;
`;

const StyledHeader = styled(StyledList)`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const Paragraph = styled.p`
  width: 10%;
  margin: 0px 8px;
  text-align: center;
  width: 10%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const EditIcon = styled(EditOutlined)`
  cursor: pointer;
  color: ${({ theme }) => theme.color.brand[1000]};
  font-size: x-large;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  &:hover {
    font-size: xx-large;
  }
`;

const DeleteIcon = styled(DeleteOutlined)`
  cursor: pointer;
  color: ${({ theme }) => theme.color.error};
  font-size: x-large;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  &:hover {
    font-size: xx-large;
  }
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
        <Paragraph>{toRealCurrency(costPrice)}</Paragraph>
        <Paragraph>{toRealCurrency(salePrice)}</Paragraph>
        <Paragraph>
          <EditIcon onClick={handleEdit} />
        </Paragraph>
        <Paragraph>
          <DeleteIcon onClick={handleDelete} />
        </Paragraph>
      </StyledList>
    </>
  );
}

export default ProductItem;
