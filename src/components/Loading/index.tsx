import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";

const LoadingContent = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.brand[1000]};
`;

function Loading() {
  return (
    <LoadingContent>
      <LoadingOutlined style={{ fontSize: 200 }} />
    </LoadingContent>
  );
}

export default Loading;
