import styled from "styled-components";

export const BoxForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.color.white};
  padding: 24px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  height: 100%;
  margin: 40px 0;
  ::-webkit-scrollbar {
    width: 10px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.color.brand[100]};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.brand[1000]};
    border-radius: 10px;
  }
`;
