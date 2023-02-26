import styled from "styled-components";
import { ModalContent } from "../../pages/Home/Stock";
import { IProduct } from "../../utils/api";
import { toRealCurrency } from "../../utils/functions";
import { EditIcon } from "../Icon/Edit";
import { StyledLabel } from "../Label";

const FlexWithGap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

function EditProductContent({
  base64Image,
  productName,
  costPrice,
  salePrice,
  purchaseDate,
  dueDate,
  comments,
}: IProduct) {
  return (
    <ModalContent>
      <StyledLabel>
        Product image:
        <FlexWithGap>
          <img width={100} height={100} src={base64Image} /> <EditIcon />
        </FlexWithGap>
      </StyledLabel>
      <StyledLabel>
        Product name:
        <FlexWithGap>
          <p style={{ color: "black" }}>{productName}</p>
          <EditIcon />
        </FlexWithGap>
      </StyledLabel>
      <div style={{ display: "flex" }}>
        <StyledLabel style={{ width: "50%" }}>
          Cost price:
          <FlexWithGap>
            <p style={{ color: "black" }}>{toRealCurrency(costPrice)}</p>
            <EditIcon />
          </FlexWithGap>
        </StyledLabel>
        <StyledLabel style={{ width: "50%" }}>
          Sale price:
          <FlexWithGap>
            <p style={{ color: "black" }}>{toRealCurrency(salePrice)}</p>
            <EditIcon />
          </FlexWithGap>
        </StyledLabel>
      </div>
      <div style={{ display: "flex" }}>
        <StyledLabel style={{ width: "50%" }}>
          Purchase date:
          <FlexWithGap>
            <p style={{ color: "black" }}>{purchaseDate}</p>
            <EditIcon />
          </FlexWithGap>
        </StyledLabel>
        <StyledLabel style={{ width: "50%" }}>
          Due date:
          <FlexWithGap>
            <p style={{ color: "black" }}>{dueDate}</p>
            <EditIcon />
          </FlexWithGap>
        </StyledLabel>
      </div>
      <StyledLabel>
        Comments:
        <FlexWithGap>
          <p style={{ color: "black" }}>{comments}</p>
          <EditIcon />
        </FlexWithGap>
      </StyledLabel>
    </ModalContent>
  );
}

export default EditProductContent;
