import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultContent } from "../../../components/DefaultContent";
import { useAppSelector } from "../../../hooks";

function RegisterProducts() {
  const { user: userRedux } = useAppSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRedux.isAnAdministrator) {
      navigate("/home");
    }
  }, []);
  return <DefaultContent>Register Products</DefaultContent>;
}

export default RegisterProducts;
