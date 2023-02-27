import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../../hooks";

function Home() {
  const navigate = useNavigate();
  const { user: userRedux } = useAppSelector((state) => state);
  useEffect(() => {
    if (!userRedux.fullName) {
      navigate("/");
    }
  }, [userRedux]);
  return <div>Welcome, {userRedux.fullName}!</div>;
}

export default Home;
