import { NavigateFunction, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/Logo/logo.webp";
import { useAppDispatch, useAppSelector } from "../../hooks";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { clearUser, UserState } from "../../redux/reducers/users";
import { MOBILE_WIDTH } from "../../utils/constants";

export interface IHeader {
  user: UserState;
  navigate: NavigateFunction;
  clearUser: () => void;
  isLogedIn: boolean;
}

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

function Header() {
  const { dimensions } = useAppSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClearUser = () => {
    dispatch(clearUser());
    navigate("/");
  };

  const { user: userRedux } = useAppSelector((state) => state);
  const isUserLogedIn = !!userRedux.fullName;
  return (
    <HeaderContent>
      <HeaderBox>
        <div>
          <img width={70} height={50} src={logo} />
        </div>
        {dimensions.width > MOBILE_WIDTH ? (
          <DesktopHeader
            isLogedIn={isUserLogedIn}
            user={userRedux}
            navigate={navigate}
            clearUser={handleClearUser}
          />
        ) : (
          <MobileHeader
            isLogedIn={isUserLogedIn}
            user={userRedux}
            navigate={navigate}
            clearUser={handleClearUser}
          />
        )}
      </HeaderBox>
    </HeaderContent>
  );
}

export default Header;
