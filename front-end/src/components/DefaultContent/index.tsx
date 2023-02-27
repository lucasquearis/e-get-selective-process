import { ReactNode } from "react";
import styled from "styled-components";

const Content = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  overflow: auto;
`;

const ContentBox = styled.div`
  max-width: 1440px;
  margin: 0px auto;
  min-height: calc(100vh - 160px);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function DefaultContent({ children }: { children: ReactNode }) {
  return (
    <Content>
      <ContentBox>{children}</ContentBox>
    </Content>
  );
}
