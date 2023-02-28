import styled from "styled-components";

export const ProductsList = styled.ul`
  background-color: ${({ theme }) => theme.color.white};
  margin: 0 auto 24px auto;
  border-radius: 4px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
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
  height: 400px;
  overflow: auto;
  position: relative;
  z-index: 1;
`;

export const StyledList = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.color.neutral[300]};
  min-height: 50px;
  display: flex;
  align-items: center;
`;

export const StyledHeader = styled(StyledList)`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  z-index: 20;
`;
