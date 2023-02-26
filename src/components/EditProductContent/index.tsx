import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { ModalContent } from "../../pages/Home/Stock";
import { editProduct, IProduct } from "../../utils/api";
import { checkRequiredFields } from "../../utils/functions";
import { EditIcon } from "../Icon/Edit";
import { StyledInput } from "../Input";
import { StyledInputMask } from "../InputMask";
import { StyledLabel } from "../Label";
import UploadFile from "../UploadFile";
import { StyledTextArea } from "../TextArea";
import { ModalFooter } from "../Modal";
import { StyledButton } from "../Button";
import { ErrorText } from "../Text/Error";
import { DeleteIcon } from "../Icon/Delete";
import { StyledCurrencyInput } from "../CurrencyInput";

const FlexWithGap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

interface IEditProductModal extends IProduct {
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
  fetchApi: () => Promise<void>;
}

function EditProductContent({
  base64Image: img,
  productName: name,
  costPrice: cost,
  salePrice: price,
  purchaseDate: purchase,
  dueDate: due,
  comments: comment,
  id,
  setOpenModal,
  fetchApi,
}: IEditProductModal) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [fileUploadedValue, setFileUploadedValue] = useState<
    File | undefined
  >();
  const [base64Image, setBase64Image] = useState({
    value: img,
    isEditing: false,
  });
  const [productName, setProductName] = useState({
    value: name,
    isEditing: false,
  });
  const [costPrice, setCostPrice] = useState({
    value: cost,
    isEditing: false,
  });
  const [salePrice, setSalePrice] = useState({
    value: price,
    isEditing: false,
  });
  const [purchaseDate, setPurchaseDate] = useState({
    value: purchase,
    isEditing: false,
  });
  const [dueDate, setDueDate] = useState({
    value: due,
    isEditing: false,
  });
  const [comments, setComments] = useState({
    value: comment,
    isEditing: false,
  });

  const handleIsEditing = (prevState: any) => ({
    ...prevState,
    isEditing: !prevState.isEditing,
  });

  const handleValue = (prevState: any, value: any) => ({
    ...prevState,
    value,
  });

  const confirmUpdate = async () => {
    const error = checkRequiredFields({
      costPrice: costPrice.value,
      dueDate: dueDate.value,
      productName: productName.value,
      purchaseDate: purchaseDate.value,
      salePrice: salePrice.value,
    });

    if (error) {
      return setErrorMessage(error);
    } else {
      setIsFetching(true);
      await editProduct({
        base64Image: base64Image.value,
        comments: comments.value,
        costPrice: costPrice.value.replace(",", "."),
        dueDate: dueDate.value,
        productName: productName.value,
        purchaseDate: purchaseDate.value,
        salePrice: salePrice.value.replace(",", "."),
        id,
      });
      setIsFetching(false);
      setOpenModal(false);
      fetchApi();
    }
  };

  useEffect(() => {
    if (!errorMessage) return;
    const timer = setTimeout(() => {
      setErrorMessage("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  return (
    <>
      <ModalContent>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        <StyledLabel>
          Product image:
          <FlexWithGap>
            {base64Image.isEditing ? (
              <>
                <UploadFile
                  fileUploadedValue={fileUploadedValue}
                  setFileUploadedValue={setFileUploadedValue}
                  handleFile={(e) =>
                    // @ts-ignore
                    setBase64Image((prevState) => handleValue(prevState, e))
                  }
                />
                <DeleteIcon
                  onClick={() =>
                    setBase64Image({
                      isEditing: false,
                      value: undefined,
                    })
                  }
                />
              </>
            ) : (
              <img width={100} height={100} src={base64Image.value} />
            )}
            <EditIcon onClick={() => setBase64Image(handleIsEditing)} />
          </FlexWithGap>
        </StyledLabel>
        <StyledLabel>
          Product name:
          <FlexWithGap>
            {productName.isEditing ? (
              <StyledInput
                value={productName.value}
                onChange={(e) =>
                  setProductName((prevState) =>
                    handleValue(prevState, e.target.value)
                  )
                }
              />
            ) : (
              <p style={{ color: "black" }}>{productName.value}</p>
            )}
            <EditIcon onClick={() => setProductName(handleIsEditing)} />
          </FlexWithGap>
        </StyledLabel>
        <div style={{ display: "flex" }}>
          <StyledLabel style={{ width: "50%" }}>
            Cost price:
            <FlexWithGap>
              {costPrice.isEditing ? (
                <StyledCurrencyInput
                  prefix="R$"
                  style={{ width: "100%" }}
                  value={costPrice.value}
                  onValueChange={(value) => {
                    console.log(value, typeof value);
                    setCostPrice((prevState) => handleValue(prevState, value));
                  }}
                />
              ) : (
                <p style={{ color: "black" }}>{costPrice.value}</p>
              )}
              <EditIcon onClick={() => setCostPrice(handleIsEditing)} />
            </FlexWithGap>
          </StyledLabel>
          <StyledLabel style={{ width: "50%" }}>
            Sale price:
            <FlexWithGap>
              {salePrice.isEditing ? (
                <StyledCurrencyInput
                  prefix="R$"
                  style={{ width: "100%" }}
                  value={salePrice.value}
                  onValueChange={(value) =>
                    setSalePrice((prevState) => handleValue(prevState, value))
                  }
                />
              ) : (
                <p style={{ color: "black" }}>{salePrice.value}</p>
              )}
              <EditIcon onClick={() => setSalePrice(handleIsEditing)} />
            </FlexWithGap>
          </StyledLabel>
        </div>
        <div style={{ display: "flex" }}>
          <StyledLabel style={{ width: "50%" }}>
            Purchase date:
            <FlexWithGap>
              {purchaseDate.isEditing ? (
                <StyledInputMask
                  mask="99/99/9999"
                  style={{ width: "100%" }}
                  value={purchaseDate.value}
                  onChange={(e) =>
                    setPurchaseDate((prevState) =>
                      handleValue(prevState, e.target.value)
                    )
                  }
                />
              ) : (
                <p style={{ color: "black" }}>{purchaseDate.value}</p>
              )}
              <EditIcon onClick={() => setPurchaseDate(handleIsEditing)} />
            </FlexWithGap>
          </StyledLabel>
          <StyledLabel style={{ width: "50%" }}>
            Due date:
            <FlexWithGap>
              {dueDate.isEditing ? (
                <StyledInputMask
                  mask="99/99/9999"
                  style={{ width: "100%" }}
                  value={dueDate.value}
                  onChange={(e) =>
                    setDueDate((prevState) =>
                      handleValue(prevState, e.target.value)
                    )
                  }
                />
              ) : (
                <p style={{ color: "black" }}>{dueDate.value}</p>
              )}
              <EditIcon onClick={() => setDueDate(handleIsEditing)} />
            </FlexWithGap>
          </StyledLabel>
        </div>
        <StyledLabel>
          Comments:
          <FlexWithGap>
            {comments.isEditing ? (
              <StyledTextArea
                value={comments.value}
                onChange={(e) =>
                  setComments((prevState) =>
                    handleValue(prevState, e.target.value)
                  )
                }
              />
            ) : (
              <p style={{ color: "black" }}>{comments.value}</p>
            )}
            <EditIcon onClick={() => setComments(handleIsEditing)} />
          </FlexWithGap>
        </StyledLabel>
      </ModalContent>
      <ModalFooter>
        <StyledButton disabled={isFetching} onClick={confirmUpdate}>
          Confirm
        </StyledButton>
      </ModalFooter>
    </>
  );
}

export default EditProductContent;
