import styled from "styled-components";
import { DeleteOutlined } from "@ant-design/icons";

export const DeleteIcon = styled(DeleteOutlined)`
  cursor: pointer;
  color: ${({ theme }) => theme.color.error};
  font-size: x-large;
`;
