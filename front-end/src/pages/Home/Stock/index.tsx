import { Component, ReactNode, FormEvent } from "react";
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
import { getAllProducts, IProduct } from "../../../utils/api";
import { DimensionsState } from "../../../redux/reducers/dimensionsResize";
import { LoadingContent } from "../Dashboard";

export type IsMobileProp = {
  isMobile?: boolean;
  dimensions?: DimensionsState;
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

interface IProps {
  children?: ReactNode;
  dimensions: DimensionsState;
  isMobile: boolean;
}
interface IState {
  products: IProduct[] | never[];
  filteredProducts: IProduct[] | never[];
  isFetching: boolean;
  fetchError: { boolean: boolean; message: string };
  openDeleteModal: boolean;
  openEditModal: boolean;
  currentProduct: IProduct | undefined;
  searchByName: string;
  searchById: string;
  searchByCost: string;
  searchBySale: string;
  searchByComment: string;
}

class Stock extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      products: [],
      isFetching: false,
      fetchError: { boolean: false, message: "" },
      openDeleteModal: false,
      openEditModal: false,
      currentProduct: undefined,
      searchByName: "",
      searchById: "",
      searchByCost: "",
      searchBySale: "",
      searchByComment: "",
      filteredProducts: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
    this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
    this.fetchApi = this.fetchApi.bind(this);
  }

  componentDidMount(): void {
    this.fetchApi();
  }

  componentDidUpdate(
    _prevProps: Readonly<IProps>,
    prevState: Readonly<IState>
  ): void {
    if (
      prevState.searchByName !== this.state.searchByName ||
      prevState.searchById !== this.state.searchById ||
      prevState.searchByCost !== this.state.searchByCost ||
      prevState.searchBySale !== this.state.searchBySale ||
      prevState.searchByComment !== this.state.searchByComment
    ) {
      this.filterProducts();
    }
  }

  filterProducts = () => {
    const {
      products,
      searchByName,
      searchById,
      searchByCost,
      searchBySale,
      searchByComment,
    } = this.state;

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

    this.setState((state) => ({ ...state, filteredProducts: newArray }));
  };

  async fetchApi() {
    this.setState((state) => ({ ...state, isFetching: true }));
    try {
      const response = await getAllProducts();
      if (response?.data) {
        this.setState((state) => ({
          ...state,
          products: response.data,
          filteredProducts: response.data,
          isFetching: false,
        }));
      }
    } catch (error: any) {
      this.setState((state) => ({
        ...state,
        fetchError: { boolean: true, message: error.message },
      }));
    }
  }

  handleDelete(product: IProduct) {
    this.setState((state) => ({
      ...state,
      currentProduct: product,
      openDeleteModal: true,
    }));
  }

  handleEdit(product: IProduct) {
    this.setState((state) => ({
      ...state,
      currentProduct: product,
      openEditModal: true,
    }));
  }

  handleChange(event: FormEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
  }

  handleOpenDeleteModal() {
    this.setState((state) => ({
      ...state,
      openDeleteModal: !state.openDeleteModal,
    }));
  }

  handleOpenEditModal() {
    this.setState((state) => ({
      ...state,
      openEditModal: !state.openEditModal,
    }));
  }

  render() {
    const { isMobile } = this.props;
    const {
      searchByName,
      searchById,
      searchByCost,
      searchBySale,
      searchByComment,
      currentProduct,
      filteredProducts,
      isFetching,
      openDeleteModal,
      openEditModal,
      fetchError,
    } = this.state;

    return fetchError.boolean ? (
      <LoadingContent>
        <Heading>
          Erro ao carregar api, contate o suporte. Error message:{" "}
          {fetchError.message}
        </Heading>
      </LoadingContent>
    ) : (
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <HeaderStock>
          <div>
            <Heading>Filtrar produtos por:</Heading>
          </div>
          <FiltersContent isMobile={isMobile}>
            <StyledLabel>
              Nome:
              <StyledInput
                name="searchByName"
                value={searchByName}
                onChange={this.handleChange}
              />
            </StyledLabel>
            <StyledLabel>
              id do produto:
              <StyledInput
                value={searchById}
                name="searchById"
                onChange={this.handleChange}
                type="number"
              />
            </StyledLabel>
            <StyledLabel>
              Preço de custo:
              <StyledInput
                value={searchByCost}
                name="searchByCost"
                onChange={this.handleChange}
                type="number"
              />
            </StyledLabel>
            <StyledLabel>
              Preço de venda:
              <StyledInput
                value={searchBySale}
                name="searchBySale"
                onChange={this.handleChange}
                type="number"
              />
            </StyledLabel>
            <StyledLabel>
              Especificação:
              <StyledInput
                value={searchByComment}
                name="searchByComment"
                onChange={this.handleChange}
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
                      handleDelete={this.handleDelete}
                      handleEdit={this.handleEdit}
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
              onClose={this.handleOpenDeleteModal}
            >
              {currentProduct && (
                <DeleteProductContent
                  fetchApi={this.fetchApi}
                  setOpenModal={this.handleOpenDeleteModal}
                  currentProduct={currentProduct}
                />
              )}
            </Modal>
          )}
          {openEditModal && (
            <Modal
              title={`Edit ${currentProduct?.productName}`}
              onClose={this.handleOpenEditModal}
            >
              {currentProduct && (
                <EditProductContent
                  currentProduct={currentProduct}
                  setOpenModal={this.handleOpenEditModal}
                  fetchApi={this.fetchApi}
                />
              )}
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

export default Stock;
