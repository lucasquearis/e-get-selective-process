import styled from "styled-components";
import { useEffect } from "react";
import { DefaultContent } from "../../../components/DefaultContent";
import { useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const { user: userRedux } = useAppSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRedux.isAnAdministrator) {
      navigate("/home");
    }
  }, []);
  return <DefaultContent>DashBoard</DefaultContent>;
}

export default DashBoard;
