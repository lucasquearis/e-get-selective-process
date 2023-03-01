import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";

const LoadingContent = styled.div<{ forButton?: boolean }>`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme, forButton }) =>
    forButton ? theme.color.neutral[600] : theme.color.brand[1000]};
`;

function Loading({ forButton = false }: { forButton?: boolean }) {
  return (
    <LoadingContent forButton={forButton}>
      <LoadingOutlined style={{ fontSize: forButton ? 20 : 200 }} />
    </LoadingContent>
  );
}

export default Loading;
