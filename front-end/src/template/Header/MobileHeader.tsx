import {
  DashboardOutlined,
  FormOutlined,
  HomeOutlined,
  LogoutOutlined,
  StockOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import styled from "styled-components";
import { IHeader } from ".";
import { StyledButton } from "../../components/Button";
import { StyledMenu, StyledBurger } from "../../components/Hamburguer/index";

const MenuBody = styled.div`
  width: 60vw;
  height: calc(100vh - 80px);
`;

const HeaderOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  height: 100%;
`;

function MobileHeader({ clearUser, isLogedIn, navigate, user }: IHeader) {
  const [openBurger, setOpenBurger] = useState(false);
  return isLogedIn ? (
    <>
      <StyledBurger open={openBurger} setOpen={setOpenBurger}></StyledBurger>
      <StyledMenu open={openBurger} setOpen={setOpenBurger}>
        <MenuBody>
          <HeaderOptionsContainer>
            <StyledButton
              style={{ width: "100%" }}
              onClick={() => {
                navigate("/home");
                setOpenBurger(false);
              }}
            >
              <HomeOutlined style={{ marginRight: 8 }} />
              Início
            </StyledButton>
            {user.isAnAdministrator && (
              <>
                <StyledButton
                  style={{ width: "100%" }}
                  onClick={() => {
                    navigate("/home/dashboard");
                    setOpenBurger(false);
                  }}
                >
                  <DashboardOutlined style={{ marginRight: 8 }} />
                  Painel
                </StyledButton>
                <StyledButton
                  style={{ width: "100%" }}
                  onClick={() => {
                    navigate("/home/register");
                    setOpenBurger(false);
                  }}
                >
                  <FormOutlined style={{ marginRight: 8 }} />
                  Registrar produtos
                </StyledButton>
              </>
            )}
            <StyledButton
              style={{ width: "100%" }}
              onClick={() => {
                navigate("/home/stock");
                setOpenBurger(false);
              }}
            >
              <StockOutlined style={{ marginRight: 8 }} />
              Estoque
            </StyledButton>
            <div
              style={{
                justifySelf: "end",
              }}
            >
              <StyledButton
                style={{ width: "max-content" }}
                onClick={() => {
                  clearUser();
                  setOpenBurger(false);
                }}
              >
                <LogoutOutlined style={{ marginRight: 8 }} /> Log-out
              </StyledButton>
            </div>
          </HeaderOptionsContainer>
        </MenuBody>
      </StyledMenu>
    </>
  ) : null;
}

export default MobileHeader;
