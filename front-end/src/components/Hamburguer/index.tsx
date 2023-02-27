import styled from "styled-components";

export const Burger = styled.button<{
  open: boolean;
}>`
  position: absolute;
  right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ open }) => (open ? "#EFFFFA" : "#EFFFFA")};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const Menu = styled.nav<{
  open: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.color.brand[200]};
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateY(0%)" : "translateY(-100%)")};
`;

export function StyledMenu({ open, children }: any) {
  return <Menu open={open}>{children}</Menu>;
}

export function StyledBurger({ open, setOpen }: any) {
  return (
    <Burger open={open} onClick={() => setOpen(!open)}>
      <div></div>
      <div></div>
      <div></div>
    </Burger>
  );
}
