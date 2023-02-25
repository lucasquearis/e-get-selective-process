import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SyledButton } from "../../components/Button";
import { DefaultContent } from "../../components/DefaultContent";
import { BoxFormLogin } from "../../components/Form";
import { StyledInput } from "../../components/Input";
import { StyledLabel } from "../../components/Label";
import { ErrorText } from "../../components/Text/Error";
import { Heading } from "../../components/Text/Heading";
import { getUserByUserName, IUser } from "../../utils/api";
import { setUser } from "../../redux/reducers";

interface IVerifyUserInDB {
  userName: string;
  password: string;
}

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user: userRedux } = useAppSelector((state) => state);
  const [loginError, setLoginError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const setUserLocalStorageAndRedux = (user: IUser) => {
    const { fullName, userName, isAnAdministrator, id } = user;
    const formatUser = { fullName, userName, isAnAdministrator, id };
    dispatch(setUser(formatUser));
    const userJson = JSON.stringify(formatUser);
    localStorage.setItem("user", userJson);
  };

  const verifyUserPassword = (user: IUser, password: string) => {
    if (user?.password === password) {
      setUserLocalStorageAndRedux(user);
      navigate("/home");
    } else {
      setLoginError("Incorrect password");
      return setIsFetching(false);
    }
  };

  const verifyUserInDB = async ({ userName, password }: IVerifyUserInDB) => {
    setIsFetching(true);
    const response = await getUserByUserName({ userName });

    if (!response?.data.length) {
      setLoginError("Username not registered");
      return setIsFetching(false);
    }

    const firstUserRegistered = response.data.find(
      (user) => user.userName === userName
    );

    if (firstUserRegistered) {
      verifyUserPassword(firstUserRegistered, password);
    }
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    // @ts-ignore
    const [{ value: userName }, { value: password }] = event.target;
    if (!userName || !password) {
      return setLoginError("Username and Password are required!");
    }
    verifyUserInDB({ userName, password });
  };

  useEffect(() => {
    if (userRedux.userName) {
      navigate("/home");
    }
    userNameRef?.current && userNameRef.current.focus();
  }, []);

  useEffect(() => {
    if (!loginError) return;
    const timer = setTimeout(() => {
      setLoginError("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [loginError]);

  return (
    <DefaultContent>
      <BoxFormLogin onSubmit={handleSubmit}>
        <Heading>Login</Heading>
        <StyledLabel>
          Username:
          <StyledInput ref={userNameRef} />
        </StyledLabel>
        <StyledLabel>
          Password:
          <StyledInput type="password" ref={passwordRef} />
        </StyledLabel>
        <div style={{ minHeight: 25 }}>
          {loginError && <ErrorText>{loginError}</ErrorText>}
        </div>
        <ButtonContainer>
          <SyledButton disabled={isFetching} type="submit">
            Login
          </SyledButton>
          <SyledButton type="button" onClick={() => navigate("/register")}>
            Register
          </SyledButton>
        </ButtonContainer>
      </BoxFormLogin>
    </DefaultContent>
  );
}

export default Login;
