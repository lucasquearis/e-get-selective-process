import { EditOutlined } from "@ant-design/icons";
import styled from "styled-components";

export const EditIcon = styled(EditOutlined)`
  cursor: pointer;
  color: ${({ theme }) => theme.color.brand[1000]};
  font-size: x-large;
`;
