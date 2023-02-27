import { CloseOutlined } from "@ant-design/icons";
import { ReactNode } from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  background-color: rgba(149 157, 165, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  gap: 15px;
  background-color: ${({ theme }) => theme.color.white};
  padding: 12px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  max-width: 300px;
  width: 100%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.neutral[400]};
  padding: 14px 0;
  margin-bottom: 14px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.color.neutral[400]};
  padding: 14px 0;
  margin-top: 14px;
  gap: 14px;
`;

function Modal({
  children,
  title,
  onClose,
}: {
  children: ReactNode;
  title: string | ReactNode;
  onClose: () => void;
}) {
  return (
    <ModalBackground>
      <ModalBox>
        <ModalHeader>
          <p>{title}</p>
          <CloseOutlined onClick={onClose} />
        </ModalHeader>
        {children}
      </ModalBox>
    </ModalBackground>
  );
}

export default Modal;
