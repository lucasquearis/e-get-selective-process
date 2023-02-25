import styled from "styled-components";
import logo from "../../assets/Logo/logo.webp";

const HeaderContent = styled.header`
  height: 10vh;
  max-width: 1440px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.color.brand[600]};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  align-items: center;
`;

function Header() {
  return (
    <HeaderContent>
      <div>
        <img
          style={{ padding: "0px 25px" }}
          width={70}
          height={50}
          src={logo}
        />
      </div>
    </HeaderContent>
  );
}

export default Header;
