import React from "react";
import Text from "@components/atoms/Text";
import styled from "styled-components";
import star_g from "@assets/Star_g.png";
import star_y from "@assets/Star_y.png";
import BackIconImg from "@assets/backIcon.png";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
}

const StyledButton = styled.button`
  margin: 0;
  padding: 0;
  outline: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledMainButton = styled(StyledButton)<ButtonProps>`
  width: 100%;
  height: 53px;
  margin: 0 auto;
  border-radius: 18px;
  ${({ disabled }) => !disabled && "cursor: pointer;"}

  background: ${({ isActive }) => (isActive ? "#f5c001" : "#575757")};
`;

/**
 * Favorite Button (별 모양 즐겨찾기 버튼)
 * isActive: 활성화 여부
 * 하위 컴포넌트 추가 불가능
 * @param onClick () => void (onClick method)
 * @param isActive boolean (active status)
 */
const StarToggleButton = ({ onClick, isActive }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick}>
      <img src={isActive ? star_y : star_g} alt="star" />
    </StyledButton>
  );
};

/**
 * Main Submit Button
 * isActive: 색 지정을 위한 props (비활성화 불가능)
 * isActive: true => 테마 (#f5c001) 색
 * isActive: false => 회색
 * disabled: button 비활성화 여부
 * 하위 컴포넌트에는 텍스트만 가능
 * @param children string (button inner text)
 * @param  onClick () => void (onClick method)
 * @param isActive boolean (button design type)
 * @param disabled boolean (disabled status)
 */
const MainButton = ({
  children,
  onClick = () => {},
  isActive = true,
  disabled = false,
}: ButtonProps) => {
  return (
    <StyledMainButton isActive={isActive} onClick={onClick} disabled={disabled}>
      <Text size={17} color={isActive ? "#000" : "#adadad"} weight={700}>
        {children}
      </Text>
    </StyledMainButton>
  );
};

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <StyledButton onClick={() => navigate(-1)}>
      <img src={BackIconImg} alt="뒤로가기" />
    </StyledButton>
  );
};

export { StarToggleButton, MainButton, BackButton };
