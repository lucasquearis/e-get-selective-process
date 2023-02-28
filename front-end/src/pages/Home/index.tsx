import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ErrorText } from "../../components/Text/Error";
import { Heading } from "../../components/Text/Heading";
import { SuccessText } from "../../components/Text/Success";
import { useAppSelector } from "../../hooks";
import welcome from "../../assets/Logo/welcome.png";
import { MOBILE_WIDTH } from "../../utils/constants";
import { IsMobileProp } from "./Stock";

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  align-self: flex-start;
`;

const HeaderHome = styled.div`
  background-color: ${({ theme }) => theme.color.brand[100]};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin: 40px 0;
  padding: 25px;
  border-radius: 4px;
`;

const BodyContainer = styled.div<IsMobileProp>`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 48px;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
`;

const Welcome = styled.img<IsMobileProp>`
  width: ${({ isMobile }) => (isMobile ? "100%" : "50%")};
`;

const NewsContainer = styled.div<IsMobileProp>`
  width: ${({ isMobile }) => (isMobile ? "" : "50%")};
  background-color: ${({ theme }) => theme.color.white};
  max-height: 500px;
  overflow: auto;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 4px;
  padding: 16px;
  margin: 10px 0;
`;

const NewsUl = styled.div`
  list-style-position: inside;
  margin-top: 10px;
`;

function Home() {
  const navigate = useNavigate();
  const { user: userRedux, dimensions } = useAppSelector((state) => state);
  const isMobile = useMemo(
    () => dimensions.width < MOBILE_WIDTH,
    [dimensions.width]
  );

  useEffect(() => {
    if (!userRedux.fullName) {
      navigate("/");
    }
  }, [userRedux]);

  return (
    <HomeContainer>
      <HeaderHome>
        <Heading>Bem vindo(a), {userRedux.fullName}!</Heading>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <p>Administrador:</p>
          {userRedux.isAnAdministrator ? (
            <SuccessText>POSITIVO</SuccessText>
          ) : (
            <ErrorText>NEGATIVO</ErrorText>
          )}
        </div>
      </HeaderHome>
      <BodyContainer isMobile={isMobile}>
        <Welcome isMobile={isMobile} src={welcome}></Welcome>
        <NewsContainer isMobile={isMobile}>
          <Heading>Próximos updates!</Heading>
          <NewsUl>
            <li>Testes completos com RTL.</li>
            <li>Opção para adicionar mais de um produto por vez.</li>
            <li>
              Melhoria de performance de renderização dos dados no Painel.
            </li>
            <li>Back-end de verdade com Node.js.</li>
          </NewsUl>
        </NewsContainer>
      </BodyContainer>
    </HomeContainer>
  );
}

export default Home;
