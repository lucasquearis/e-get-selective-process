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
import { clearUser } from "../../redux/reducers";
import { useNavigate } from "react-router-dom";

const HeaderContent = styled.header`
  height: 10vh;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.color.brand[500]};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const HeaderBox = styled.div`
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
  justify-content: end;
`;

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user: userRedux } = useAppSelector((state) => state);
  return (
    <HeaderContent>
      <HeaderBox>
        <div>
          <img width={70} height={50} src={logo} />
        </div>
        {userRedux.fullName && (
          <HeaderOptionsContainer>
            <StyledButton onClick={() => navigate("/home")}>
              <HomeOutlined style={{ marginRight: 8 }} />
              Home
            </StyledButton>
            <StyledButton onClick={() => navigate("/home/dashboard")}>
              <DashboardOutlined style={{ marginRight: 8 }} />
              Dashboard
            </StyledButton>
            <StyledButton onClick={() => navigate("/home/stock")}>
              <StockOutlined style={{ marginRight: 8 }} />
              Stock
            </StyledButton>
            <StyledButton onClick={() => navigate("/home/register")}>
              <FormOutlined style={{ marginRight: 8 }} />
              Register Products
            </StyledButton>
            <StyledButton
              onClick={() => {
                dispatch(clearUser());
                navigate("/");
              }}
            >
              <LogoutOutlined style={{ marginRight: 8 }} /> Log-out
            </StyledButton>
          </HeaderOptionsContainer>
        )}
      </HeaderBox>
    </HeaderContent>
  );
}

export default Header;
