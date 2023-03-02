import styled from "styled-components";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import ChartProducts from "../../../components/ChartProducts";
import PieChart from "../../../components/PieChart";
import { Heading } from "../../../components/Text/Heading";
import Loading from "../../../components/Loading";
import {
  getAllProducts,
  getAllProductsExpired,
  getAllProductsLoss,
  getAllProductsSold,
  IProduct,
} from "../../../utils/api";
import { MOBILE_WIDTH } from "../../../utils/constants";
import { IsMobileProp } from "../Stock";

interface IPrepareProducts {
  productsFetch: IProduct[] | never[];
  productsSoldFetch: IProduct[] | never[];
  productsLossFetch: IProduct[] | never[];
  productsExpiredFetch: IProduct[] | never[];
}

export interface IgroupedProducts {
  [key: string]: {
    activeProducts?: IProduct[];
    soldProducts?: IProduct[];
    lostProducts?: IProduct[];
    expiredProducts?: IProduct[];
  };
}

export interface IProductsChart {
  products: IgroupedProducts;
}

const ProductsBox = styled.div<IsMobileProp>`
  width: ${({ isMobile }) => (isMobile ? "100%" : "50%")};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  height: 500px;
  justify-content: space-between;
`;

export const LoadingContent = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 100%;
  padding: 0px 20px;
`;

const DashboardContent = styled.div<IsMobileProp>`
  margin: 40px 0px;
  display: flex;
  width: ${({ isMobile }) => (isMobile ? "85%" : "100%")};
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
`;

function DashBoard() {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState({ boolean: false, message: "" });
  const [products, setProducts] = useState<IgroupedProducts>({});
  const { user: userRedux, dimensions } = useAppSelector((state) => state);
  const navigate = useNavigate();
  const isMobile = useMemo(
    () => dimensions.width < MOBILE_WIDTH,
    [dimensions.width]
  );

  const formatMapProducts = useCallback(
    ({
      productName,
      comments,
      costPrice,
      dueDate,
      purchaseDate,
      salePrice,
    }: IProduct) => ({
      productName,
      comments,
      costPrice,
      dueDate,
      purchaseDate,
      salePrice,
    }),
    [products]
  );

  const prepareProductsBase = useCallback(
    ({
      productsFetch,
      productsLossFetch,
      productsSoldFetch,
      productsExpiredFetch,
    }: IPrepareProducts) => {
      const newProductsFormat = {
        activeProducts: productsFetch.map(formatMapProducts),
        soldProducts: productsSoldFetch.map(formatMapProducts),
        lostProducts: productsLossFetch.map(formatMapProducts),
        expiredProducts: productsExpiredFetch.map(formatMapProducts),
      };

      const groupedProducts = Object.values(newProductsFormat)
        .flat()
        .reduce(
          (
            acc: { [key: string]: { [key: string]: IProduct[] } },
            curr: IProduct
          ) => {
            const purchaseDate = curr.purchaseDate;
            const productType = Object.keys(newProductsFormat).find((type) =>
              newProductsFormat[
                type as keyof typeof newProductsFormat
              ].includes(curr)
            );
            if (!acc[purchaseDate]) {
              acc[purchaseDate] = {};
            }
            if (!acc[purchaseDate][productType as string]) {
              acc[purchaseDate][productType as string] = [];
            }
            acc[purchaseDate][productType as string].push(curr);
            return acc;
          },
          {}
        );
      setProducts(groupedProducts);
    },
    []
  );

  const getAllProductsInDB = useCallback(async () => {
    setIsFetching(true);
    try {
      const [
        productsFetch,
        productsLossFetch,
        productsExpiredFetch,
        productsSoldFetch,
      ] = await Promise.all([
        getAllProducts(),
        getAllProductsLoss(),
        getAllProductsExpired(),
        getAllProductsSold(),
      ]);
      prepareProductsBase({
        productsFetch: productsFetch?.data || [],
        productsLossFetch: productsLossFetch?.data || [],
        productsSoldFetch: productsSoldFetch?.data || [],
        productsExpiredFetch: productsExpiredFetch?.data || [],
      });
    } catch (error: any) {
      setFetchError({ boolean: true, message: error.message });
    }
    setIsFetching(false);
  }, []);

  useEffect(() => {
    if (!userRedux.isAnAdministrator) {
      navigate("/home");
    }
    getAllProductsInDB();
  }, []);

  return isFetching ? (
    <LoadingContent data-testid="test-loading-svg">
      <Loading />
    </LoadingContent>
  ) : fetchError.boolean ? (
    <LoadingContent>
      <Heading>
        Erro ao carregar api, contate o suporte. Error message:{" "}
        {fetchError.message}
      </Heading>
    </LoadingContent>
  ) : (
    <DashboardContent isMobile={isMobile}>
      <ProductsBox isMobile={isMobile}>
        <Heading>Grafico geral dos produtos</Heading>
        <ChartProducts products={products} />
      </ProductsBox>
      <ProductsBox isMobile={isMobile}>
        <Heading>Gráfico de entrada e saída</Heading>
        <PieChart products={products} />
      </ProductsBox>
    </DashboardContent>
  );
}

export default DashBoard;
