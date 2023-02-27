import { useRouteError, useNavigate } from "react-router-dom";
import styled from "styled-components";

const PageContent = styled.div`
  max-width: 1440px;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.background};
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
      <p>{`Sorry, but this page does not exist :(`}</p>
      <p>
        <i>Reason: {error.statusText || error.message}</i>
      </p>
      <button onClick={() => navigate("/")}>Voltar ao inicio</button>
    </PageContent>
  );
}
