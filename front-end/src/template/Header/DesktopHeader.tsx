import styled from "styled-components";
import { StyledButton } from "../../components/Button";
import {
  DashboardOutlined,
  FormOutlined,
  HomeOutlined,
  LogoutOutlined,
  StockOutlined,
} from "@ant-design/icons";
import { IHeader } from ".";

const HeaderOptionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  justify-content: start;
  margin-left: 24px;
`;

const DesktopHeaderContent = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;

function DesktopHeader({ user, navigate, clearUser, isLogedIn }: IHeader) {
  return isLogedIn ? (
    <DesktopHeaderContent>
      <HeaderOptionsContainer>
        <StyledButton onClick={() => navigate("/home")}>
          <HomeOutlined style={{ marginRight: 8 }} />
          Início
        </StyledButton>
        {user.isAnAdministrator && (
          <>
            <StyledButton onClick={() => navigate("/home/dashboard")}>
              <DashboardOutlined style={{ marginRight: 8 }} />
              Painel
            </StyledButton>
            <StyledButton onClick={() => navigate("/home/register")}>
              <FormOutlined style={{ marginRight: 8 }} />
              Registrar produtos
            </StyledButton>
          </>
        )}
        <StyledButton onClick={() => navigate("/home/stock")}>
          <StockOutlined style={{ marginRight: 8 }} />
          Estoque
        </StyledButton>
      </HeaderOptionsContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <StyledButton
          style={{ width: "max-content" }}
          onClick={() => clearUser()}
        >
          <LogoutOutlined style={{ marginRight: 8 }} /> Log-out
        </StyledButton>
      </div>
    </DesktopHeaderContent>
  ) : null;
}

export default DesktopHeader;
