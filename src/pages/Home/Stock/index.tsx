import { useEffect, useState } from "react";
import styled from "styled-components";
import { DefaultContent } from "../../../components/DefaultContent";
import EditProductContent from "../../../components/EditProductContent";
import { StyledInput } from "../../../components/Input";
import { StyledInputMask } from "../../../components/InputMask";
import { StyledLabel } from "../../../components/Label";
import Loading from "../../../components/Loading";
import Modal from "../../../components/Modal";
import ProductItem, { ProductHeader } from "../../../components/ProductItem";
import { Heading } from "../../../components/Text/Heading";
import { deleteProduct, getAllProducts, IProduct } from "../../../utils/api";
import { toRealCurrency } from "../../../utils/functions";

const HeaderStock = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 16px;
  background-color: ${({ theme }) => theme.color.white};
  padding: 24px;
  border-radius: 4px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin: 24px auto;
  width: 90%;
`;

const ProductsList = styled.ul`
  width: 98%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.white};
  margin: 0 auto 24px auto;
  border-radius: 4px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.color.brand[100]};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.brand[1000]};
    border-radius: 10px;
  }
`;

export const ModalContent = styled.div`
  color: ${({ theme }) => theme.color.error};
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  word-break: break-all;
`;

function Stock() {
  const [products, setProducts] = useState<IProduct[] | never[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setopenEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<IProduct | undefined>();

  const fetchApi = async () => {
    setIsFetching(true);
    const response = await getAllProducts();
    if (response?.data) {
      setProducts(response.data);
      setIsFetching(false);
    }
  };

  const confirmDelete = async () => {
    console.log("deletou", currentProduct?.productName);
    if (currentProduct?.id) {
      const response = await deleteProduct(currentProduct?.id);
      if (response?.status === 200) {
        setOpenDeleteModal(false);
        fetchApi();
      }
    }
  };

  const handleDelete = (product: IProduct) => {
    setCurrentProduct(product);
    setOpenDeleteModal(true);
  };

  const handleEdit = (product: IProduct) => {
    setCurrentProduct(product);
    setopenEditModal(true);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <DefaultContent
        style={{ justifyContent: "center", flexDirection: "column" }}
      >
        <HeaderStock>
          <Heading>Filter Products by:</Heading>
          <StyledLabel>
            Name:
            <StyledInput />
          </StyledLabel>
          <StyledLabel>
            Product id:
            <StyledInput style={{ maxWidth: 70 }} type="number" />
          </StyledLabel>
          <StyledLabel>
            Date:
            <StyledInputMask style={{ maxWidth: 70 }} mask="99/99/9999" />
          </StyledLabel>
          <StyledLabel>
            Cost price:
            <StyledInput style={{ maxWidth: 70 }} type="number" />
          </StyledLabel>
          <StyledLabel>
            Sale price:
            <StyledInput style={{ maxWidth: 70 }} type="number" />
          </StyledLabel>
          <StyledLabel>
            Product comment:
            <StyledInput />
          </StyledLabel>
        </HeaderStock>
        {isFetching ? (
          <Loading />
        ) : (
          <ProductsList>
            {products.length > 0 ? (
              <>
                <ProductHeader />
                {products.map(
                  ({
                    productName,
                    id,
                    base64Image,
                    comments,
                    costPrice,
                    dueDate,
                    purchaseDate,
                    salePrice,
                  }) => (
                    <ProductItem
                      key={id}
                      productName={productName}
                      id={id}
                      base64Image={base64Image}
                      comments={comments}
                      costPrice={costPrice}
                      dueDate={dueDate}
                      purchaseDate={purchaseDate}
                      salePrice={salePrice}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                    />
                  )
                )}
              </>
            ) : (
              <li>Nothing</li>
            )}
          </ProductsList>
        )}
      </DefaultContent>
      {openDeleteModal && (
        <Modal
          title="Are you sure?"
          onConfirm={() => confirmDelete()}
          onClose={() => setOpenDeleteModal(false)}
        >
          <ModalContent>
            <p>
              {`Are you sure you want to delete the item with "id = ${currentProduct?.id}" and "name = ${currentProduct?.productName}"?`}
            </p>
            <p>this action is IRREVERSIBLE!</p>
          </ModalContent>
        </Modal>
      )}
      {openEditModal && (
        <Modal
          title={`Edit ${currentProduct?.productName}`}
          onConfirm={() => {}}
          onClose={() => setopenEditModal(false)}
        >
          {currentProduct && (
            <EditProductContent
              base64Image={currentProduct?.base64Image}
              comments={currentProduct?.comments}
              costPrice={currentProduct?.costPrice}
              dueDate={currentProduct?.dueDate}
              productName={currentProduct?.productName}
              purchaseDate={currentProduct?.purchaseDate}
              salePrice={currentProduct?.salePrice}
            />
          )}
        </Modal>
      )}
    </>
  );
}

export default Stock;
