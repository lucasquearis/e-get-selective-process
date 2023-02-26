import { SyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { DefaultContent } from "../../../components/DefaultContent";
import { StyledInput } from "../../../components/Input";
import { StyledInputMask } from "../../../components/InputMask";
import { StyledLabel } from "../../../components/Label";
import Loading from "../../../components/Loading";
import Modal from "../../../components/Modal";
import ProductItem, { ProductHeader } from "../../../components/ProductItem";
import { Heading } from "../../../components/Text/Heading";
import { getAllProducts, IProduct } from "../../../utils/api";

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
`;

function Stock() {
  const [products, setProducts] = useState<IProduct[] | never[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setopenEditModal] = useState(false);

  const handleDelete = (e: SyntheticEvent) => {
    setOpenDeleteModal(true);
  };

  const handleEdit = (e: SyntheticEvent) => {
    setopenEditModal(true);
  };

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      const response = await getAllProducts();
      if (response?.data) {
        setProducts(response.data);
        setIsFetching(false);
      }
    })();
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
          title="DELETE"
          onConfirm={() => {}}
          onClose={() => setOpenDeleteModal(false)}
        >
          DELETE
        </Modal>
      )}
      {openEditModal && (
        <Modal
          title="EDIT"
          onConfirm={() => {}}
          onClose={() => setopenEditModal(false)}
        >
          EDIT
        </Modal>
      )}
    </>
  );
}

export default Stock;
