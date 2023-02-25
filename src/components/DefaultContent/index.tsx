import styled from "styled-components";

export const DefaultContent = styled.div`
  max-width: 1440px;
  background-color: ${({ theme }) => theme.color.background};
  margin: 0px auto;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
