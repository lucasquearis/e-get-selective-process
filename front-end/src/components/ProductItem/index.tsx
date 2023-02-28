import { memo } from "react";
import styled from "styled-components";
import { IProduct } from "../../utils/api";
import { toRealCurrency } from "../../utils/functions";
import { EditIcon } from "../Icon/Edit";
import { MinusIcon } from "../Icon/Minus";
import { StyledHeader, StyledList } from "../ProductsList";

interface IProductItem {
  product: IProduct;
  handleEdit: (product: IProduct) => void;
  handleDelete: (product: IProduct) => void;
}

const Paragraph = styled.p`
  width: 10%;
  margin: 0px 8px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 115px;
`;

export function ProductHeader() {
  return (
    <StyledHeader>
      <Paragraph>Id</Paragraph>
      <Paragraph>Imagem</Paragraph>
      <Paragraph>Nome</Paragraph>
      <Paragraph>Data compra</Paragraph>
      <Paragraph>Data vencimento</Paragraph>
      <Paragraph>Especificação</Paragraph>
      <Paragraph>Preço de custo</Paragraph>
      <Paragraph>Preço de venda</Paragraph>
      <Paragraph>Editar</Paragraph>
      <Paragraph>Remover</Paragraph>
    </StyledHeader>
  );
}

const ProductItem = memo(function ProductItem({
  product,
  handleEdit,
  handleDelete,
}: IProductItem) {
  return (
    <>
      <StyledList style={{ padding: "30px 0" }}>
        <Paragraph>{product.id}</Paragraph>
        <Paragraph>
          {<img width={40} height={40} src={product.base64Image}></img>}
        </Paragraph>
        <Paragraph>{product.productName}</Paragraph>
        <Paragraph>{product.purchaseDate}</Paragraph>
        <Paragraph>{product.dueDate}</Paragraph>
        <Paragraph>{product.comments}</Paragraph>
        <Paragraph>{toRealCurrency(Number(product.costPrice))}</Paragraph>
        <Paragraph>{toRealCurrency(Number(product.salePrice))}</Paragraph>
        <Paragraph>
          <EditIcon onClick={() => handleEdit(product)} />
        </Paragraph>
        <Paragraph>
          <MinusIcon onClick={() => handleDelete(product)} />
        </Paragraph>
      </StyledList>
    </>
  );
});
export default ProductItem;
