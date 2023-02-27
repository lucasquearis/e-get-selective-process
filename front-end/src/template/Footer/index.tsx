import styled from "styled-components";

const FooterContent = styled.footer`
  background-color: ${({ theme }) => theme.color.brand[100]};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  color: ${({ theme }) => theme.color.brand[1000]};
`;

const FooterBox = styled.div`
  height: 80px;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Footer() {
  return (
    <FooterContent>
      <FooterBox>Desenvolvido por Lucas A. Santos</FooterBox>
    </FooterContent>
  );
}

export default Footer;
