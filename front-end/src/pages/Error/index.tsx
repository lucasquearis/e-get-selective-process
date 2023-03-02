import { useRouteError, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Heading } from "../../components/Text/Heading";

const PageContent = styled.div`
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
      <Heading>Oops!</Heading>
      <p>{`Desculpa, mas essa página não existe :(`}</p>
      <p>
        <i>Reason: {error.statusText || error.message}</i>
      </p>
      <button onClick={() => navigate("/")}>Voltar ao inicio</button>
    </PageContent>
  );
}
