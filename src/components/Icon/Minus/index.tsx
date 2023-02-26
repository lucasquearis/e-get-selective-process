import styled from "styled-components";
import { MinusOutlined } from "@ant-design/icons";

export const MinusIcon = styled(MinusOutlined)`
  cursor: pointer;
  color: ${({ theme }) => theme.color.error};
  font-size: x-large;
`;
