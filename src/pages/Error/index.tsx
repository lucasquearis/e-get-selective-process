import { useRouteError, useNavigate } from "react-router-dom";
import styled from "styled-components";

const PageContent = styled.div`
  width: 1440px;
  height: 100vh;
  background-color: rgb(241, 241, 241);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  flex-direction: column;
  gap: 10px;
`;

export default function ErrorHandler() {
  const error: any = useRouteError();
  const navigate = useNavigate();

  return (
    <PageContent>
      <h1>Oops!</h1>
      <p>{`Desculpe, mas essa página não existe :(`}</p>
      <p>
        <i>Motivo: {error.statusText || error.message}</i>
      </p>
      <button onClick={() => navigate("/")}>Voltar ao inicio</button>
    </PageContent>
  );
}
