import styled from "styled-components";
import logo from "../../assets/Logo/logo.webp";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { LogoutOutlined } from "@ant-design/icons";
import { clearUser } from "../../redux/reducers";
import { useNavigate } from "react-router-dom";

const HeaderContent = styled.header`
  height: 10vh;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.color.brand[600]};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 25px;
  height: 100%;
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
          <div>
            <LogoutOutlined
              onClick={() => {
                dispatch(clearUser());
                navigate("/");
              }}
            />
          </div>
        )}
      </HeaderBox>
    </HeaderContent>
  );
}

export default Header;
