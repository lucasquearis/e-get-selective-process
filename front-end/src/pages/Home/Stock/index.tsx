import { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteProductContent from "../../../components/DeleteProductContent";
import EditProductContent from "../../../components/EditProductContent";
import { StyledInput } from "../../../components/Input";
import { StyledLabel } from "../../../components/Label";
import Loading from "../../../components/Loading";
import Modal from "../../../components/Modal";
import ProductItem, { ProductHeader } from "../../../components/ProductItem";
import { ProductsList, StyledList } from "../../../components/ProductsList";
import { Heading } from "../../../components/Text/Heading";
import { useAppSelector } from "../../../hooks";
import { getAllProducts, IProduct } from "../../../utils/api";
import { MOBILE_WIDTH } from "../../../utils/constants";

type IsMobileProp = {
  isMobile: boolean;
};

const HeaderStock = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.white};
  padding: 24px;
  border-radius: 4px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin: 24px;
  flex-wrap: wrap;
  flex-direction: column;
`;

export const ModalContent = styled.div`
  color: ${({ theme }) => theme.color.error};
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  word-break: break-all;
`;

const FiltersContent = styled.div<IsMobileProp>`
  margin-top: 20px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
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
  const { dimensions } = useAppSelector((state) => state);
  const isMobile = dimensions.width < MOBILE_WIDTH;

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
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <HeaderStock>
        <div>
          <Heading>Filtrar produtos por:</Heading>
        </div>
        <FiltersContent isMobile={isMobile}>
          <StyledLabel>
            Nome:
            <StyledInput
              value={searchByName}
              onChange={(e) => setSearchByName(e.target.value)}
            />
          </StyledLabel>
          <StyledLabel>
            id do produto:
            <StyledInput
              value={searchById}
              onChange={(e) => setSearchById(e.target.value)}
              type="number"
            />
          </StyledLabel>
          <StyledLabel>
            Preço de custo:
            <StyledInput
              value={searchByCost}
              onChange={(e) => setSearchByCost(e.target.value)}
              type="number"
            />
          </StyledLabel>
          <StyledLabel>
            Preço de venda:
            <StyledInput
              value={searchBySale}
              onChange={(e) => setSearchBySale(e.target.value)}
              type="number"
            />
          </StyledLabel>
          <StyledLabel>
            Especificação:
            <StyledInput
              value={searchByComment}
              onChange={(e) => setSearchByComment(e.target.value)}
            />
          </StyledLabel>
        </FiltersContent>
      </HeaderStock>
      <div>
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
        {openDeleteModal && (
          <Modal
            title={`Você tem certeza que deseja remover "${currentProduct?.productName}" ?`}
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
      </div>
    </div>
  );
}

export default Stock;
