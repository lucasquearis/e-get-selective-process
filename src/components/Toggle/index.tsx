import { ChangeEvent, Dispatch } from "react";
import styled from "styled-components";

interface IToggle {
  setChecked: Dispatch<React.SetStateAction<boolean>>;
  checked: boolean;
}

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Switch = styled.div`
  position: relative;
  width: 30px;
  height: 14px;
  background: ${({ theme }) => theme.color.neutral[500]};
  border-radius: 32px;
  padding: 2px;
  transition: 300ms all;

  &:before {
    content: "";
    transition: 300ms all;
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 35px;
    top: 50%;
    left: 2px;
    background: white;
    transform: translate(0, -50%);
  }
`;

const Input = styled.input`
  display: none;

  &:checked + ${Switch} {
    background: ${({ theme }) => theme.color.brand.primary};

    &:before {
      transform: translate(16px, -50%);
    }
  }
`;

function Toggle({ checked, setChecked }: IToggle) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setChecked(e.target.checked);

  return (
    <Label>
      <Input checked={checked} type="checkbox" onChange={handleChange} />
      <Switch />
    </Label>
  );
}

export default Toggle;
