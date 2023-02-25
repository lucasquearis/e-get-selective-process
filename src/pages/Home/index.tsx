import styled from "styled-components";
import { useAppSelector } from "../../hooks";

function Home() {
  const { user } = useAppSelector((state) => state);
  return <h1>{JSON.stringify(user)}</h1>;
}

export default Home;
