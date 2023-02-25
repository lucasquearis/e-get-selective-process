import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DefaultContent } from "../../components/DefaultContent";
import { useAppSelector } from "../../hooks";

function Home() {
  const navigate = useNavigate();
  const { user: userRedux } = useAppSelector((state) => state);
  useEffect(() => {
    if (!userRedux.fullName) {
      navigate("/");
    }
    console.log(userRedux);
  }, [userRedux]);
  return <DefaultContent>Welcome, {userRedux.fullName}!</DefaultContent>;
}

export default Home;
