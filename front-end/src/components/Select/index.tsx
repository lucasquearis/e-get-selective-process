import styled from "styled-components";

export const StyledSelect = styled.select`
  margin: 0;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.color.neutral[600]};
  border-radius: 6px;
  transition: all 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
  &:focus-visible {
    outline: none;
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.color.brand[1000]};
  }
`;
