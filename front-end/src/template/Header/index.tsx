import styled from "styled-components";
import logo from "../../assets/Logo/logo.webp";
import { StyledButton } from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  DashboardOutlined,
  FormOutlined,
  HomeOutlined,
  LogoutOutlined,
  StockOutlined,
} from "@ant-design/icons";
import { clearUser } from "../../redux/reducers/users";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HeaderContent = styled.header`
  background-color: ${({ theme }) => theme.color.brand[500]};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  height: 80px;
`;

const HeaderBox = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 25px;
  height: 100%;
`;

const HeaderOptionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  justify-content: start;
  margin-left: 24px;
`;

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const test = useAppSelector((state) => state);

  useEffect(() => {
    console.log(test.width);
  }, [test.width]);

  const { user: userRedux } = useAppSelector((state) => state);
  return (
    <HeaderContent>
      <HeaderBox>
        <div>
          <img width={70} height={50} src={logo} />
        </div>
        {userRedux.fullName && (
          <>
            <HeaderOptionsContainer>
              <StyledButton onClick={() => navigate("/home")}>
                <HomeOutlined style={{ marginRight: 8 }} />
                Início
              </StyledButton>
              {userRedux.isAnAdministrator && (
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
              style={{ display: "flex", width: "100%", justifyContent: "end" }}
            >
              <StyledButton
                onClick={() => {
                  dispatch(clearUser());
                  navigate("/");
                }}
              >
                <LogoutOutlined style={{ marginRight: 8 }} /> Log-out
              </StyledButton>
            </div>
          </>
        )}
      </HeaderBox>
    </HeaderContent>
  );
}

export default Header;
