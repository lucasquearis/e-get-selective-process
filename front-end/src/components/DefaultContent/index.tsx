import { ReactNode } from "react";
import styled from "styled-components";

const Content = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const ContentBox = styled.div`
  padding-top: 80px;
  max-width: 1440px;
  margin: 0px auto;
  min-height: calc(100vh - 160px);
  display: flex;
  overflow: auto;
  align-items: center;
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

export function DefaultContent({ children }: { children: ReactNode }) {
  return (
    <Content>
      <ContentBox>{children}</ContentBox>
    </Content>
  );
}
