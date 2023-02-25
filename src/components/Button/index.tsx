import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  width: auto;
  background-color: ${({ theme }) => theme.color.brand[1000]};
  color: ${({ theme }) => theme.color.white};
  font-weight: 500;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.color.brand[600]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.color.neutral[400]};
  }
`;
