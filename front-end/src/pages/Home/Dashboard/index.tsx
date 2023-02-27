import styled from "styled-components";
import { useEffect } from "react";
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
  return <div>DashBoard</div>;
}

export default DashBoard;
