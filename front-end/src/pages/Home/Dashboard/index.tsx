import styled from "styled-components";
import { useEffect, useState } from "react";
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

const ProductsBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const LoadingContent = styled.div`
  width: 100%;
  margin-top: 50;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function DashBoard() {
  const [isFetching, setIsFetching] = useState(false);
  const [products, setProducts] = useState<IProduct[] | undefined>([]);
  const [lostProducts, setLostProducts] = useState<IProduct[] | undefined>([]);
  const [expiredProducts, setExpiredProducts] = useState<
    IProduct[] | undefined
  >([]);
  const [soldProducts, setSoldProducts] = useState<IProduct[] | undefined>([]);
  const { user: userRedux } = useAppSelector((state) => state);
  const navigate = useNavigate();

  const getAllProductsInDB = async () => {
    setIsFetching(true);
    const productsFetch = await getAllProducts();
    const productsLossFetch = await getAllProductsLoss();
    const productsExpiredFetch = await getAllProductsExpired();
    const productsSoldFetch = await getAllProductsSold();
    setProducts(productsFetch?.data || []);
    setLostProducts(productsLossFetch?.data || []);
    setExpiredProducts(productsExpiredFetch?.data || []);
    setSoldProducts(productsSoldFetch?.data || []);
    setIsFetching(false);
  };

  useEffect(() => {
    if (!isFetching) {
      console.log({ products, lostProducts, expiredProducts, soldProducts });
    }
  }, [isFetching]);

  useEffect(() => {
    if (!userRedux.isAnAdministrator) {
      navigate("/home");
    }
    getAllProductsInDB();
  }, []);

  return isFetching ? (
    <LoadingContent>
      <Loading />
    </LoadingContent>
  ) : (
    <div
      style={{
        margin: "40px 0px",
        display: "flex",
        width: "100%",
      }}
    >
      <ProductsBox>
        <Heading>Grafico geral dos produtos</Heading>
        <ChartProducts />
      </ProductsBox>
      <ProductsBox>
        <Heading>Grafico de entrada e saida de produtos</Heading>
        <PieChart />
        <Heading>Gráfico de lucro</Heading>
        <PieChart />
      </ProductsBox>
    </div>
  );
}

export default DashBoard;
