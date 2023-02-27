import { useEffect, useState } from "react";
import styled from "styled-components";
import { DefaultContent } from "../../../components/DefaultContent";
import DeleteProductContent from "../../../components/DeleteProductContent";
import EditProductContent from "../../../components/EditProductContent";
import { StyledInput } from "../../../components/Input";
import { StyledInputMask } from "../../../components/InputMask";
import { StyledLabel } from "../../../components/Label";
import Loading from "../../../components/Loading";
import Modal from "../../../components/Modal";
import ProductItem, { ProductHeader } from "../../../components/ProductItem";
import { ProductsList, StyledList } from "../../../components/ProductsList";
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
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<IProduct | undefined>();
  const [searchByName, setSearchByName] = useState("");
  const [searchById, setSearchById] = useState("");
  const [searchByCost, setSearchByCost] = useState("");
  const [searchBySale, setSearchBySale] = useState("");
  const [searchByComment, setSearchByComment] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<
    IProduct[] | never[]
  >([]);

  const fetchApi = async () => {
    setIsFetching(true);
    const response = await getAllProducts();
    if (response?.data) {
      setProducts(response.data);
      setFilteredProducts(response.data);
      setIsFetching(false);
    }
  };

  const handleDelete = (product: IProduct) => {
    setCurrentProduct(product);
    setOpenDeleteModal(true);
  };

  const handleEdit = (product: IProduct) => {
    setCurrentProduct(product);
    setOpenEditModal(true);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    const newArray = products
      .filter((product) =>
        product.productName.toLowerCase().includes(searchByName.toLowerCase())
      )
      .filter((product) =>
        product.comments.toLowerCase().includes(searchByComment.toLowerCase())
      )
      .filter((product) => String(product.id).includes(searchById))
      .filter((product) => product.costPrice.includes(searchByCost))
      .filter((product) => product.salePrice.includes(searchBySale));

    setFilteredProducts(newArray);
  }, [searchByName, searchById, searchByCost, searchBySale, searchByComment]);

  return (
    <>
      <div style={{ flexDirection: "column" }}>
        <HeaderStock>
          <Heading>Filtrar produtos por:</Heading>
          <StyledLabel style={{ maxWidth: "12%" }}>
            Nome:
            <StyledInput
              value={searchByName}
              onChange={(e) => setSearchByName(e.target.value)}
            />
          </StyledLabel>
          <StyledLabel style={{ maxWidth: "12%" }}>
            id do produto:
            <StyledInput
              value={searchById}
              onChange={(e) => setSearchById(e.target.value)}
              type="number"
            />
          </StyledLabel>
          <StyledLabel style={{ maxWidth: "12%" }}>
            Preço de custo:
            <StyledInput
              value={searchByCost}
              onChange={(e) => setSearchByCost(e.target.value)}
              type="number"
            />
          </StyledLabel>
          <StyledLabel style={{ maxWidth: "12%" }}>
            Preço de venda:
            <StyledInput
              value={searchBySale}
              onChange={(e) => setSearchBySale(e.target.value)}
              type="number"
            />
          </StyledLabel>
          <StyledLabel style={{ maxWidth: "12%" }}>
            Especificação:
            <StyledInput
              value={searchByComment}
              onChange={(e) => setSearchByComment(e.target.value)}
            />
          </StyledLabel>
        </HeaderStock>
        {isFetching ? (
          <Loading />
        ) : (
          <ProductsList>
            {filteredProducts.length > 0 ? (
              <>
                <ProductHeader />
                {filteredProducts.map((product) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                ))}
              </>
            ) : (
              <StyledList style={{ justifyContent: "center" }}>
                Nenhum produto cadastrado!
              </StyledList>
            )}
          </ProductsList>
        )}
      </div>
      {openDeleteModal && (
        <Modal
          title={`Are you sure you want to remove "${currentProduct?.productName}" ?`}
          onClose={() => setOpenDeleteModal(false)}
        >
          {currentProduct && (
            <DeleteProductContent
              fetchApi={fetchApi}
              setOpenModal={setOpenDeleteModal}
              currentProduct={currentProduct}
            />
          )}
        </Modal>
      )}
      {openEditModal && (
        <Modal
          title={`Edit ${currentProduct?.productName}`}
          onClose={() => setOpenEditModal(false)}
        >
          {currentProduct && (
            <EditProductContent
              currentProduct={currentProduct}
              setOpenModal={setOpenEditModal}
              fetchApi={fetchApi}
            />
          )}
        </Modal>
      )}
    </>
  );
}

export default Stock;
