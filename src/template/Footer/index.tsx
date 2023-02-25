import styled from "styled-components";

const FooterContent = styled.header`
  height: 10vh;
  max-width: 1440px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.color.brand[100]};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.brand[1000]};
`;

function Footer() {
  return <FooterContent>Developed with 🧡 by Lucas A. Santos</FooterContent>;
}

export default Footer;
