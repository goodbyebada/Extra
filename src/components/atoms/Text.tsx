import React from "react";
import styled from "styled-components";

interface TextProps {
  children: React.ReactNode;
  size?: number;
  color?: string;
  align?: "left" | "center" | "right";
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  highlight?: boolean;
  inline?: boolean;
}

interface ThemeTextProps extends TextProps {
  variant:
    | "title"
    | "content-title"
    | "item-title"
    | "item-subtitle"
    | "item-info";
}

const StyledText = styled.p<TextProps>`
  margin: 0;
  padding: 0;

  ${({ inline }) => (inline ? `display: inline-block;` : "")}

  color: ${({ color, highlight }) => (highlight ? "#F5C001" : color || "#fff")};
  text-align: ${({ align }) => align || "left"};
  font-weight: ${({ weight }) => weight || 400};
  font-size: ${({ size }) => size + "px" || "16px"};
`;

const StyledThemeText = styled(StyledText)<ThemeTextProps>`
  ${({ variant }) => {
    switch (variant) {
      case "title":
        return `
          font-size: 24px;
          font-weight: 900;
        `;
      case "content-title":
        return `
          font-size: 20px;
          font-weight: 900;
        `;
      case "item-title":
        return `
          font-size: 16px;
          font-weight: 900;
        `;
      case "item-subtitle":
        return `
          font-size: 14px;
          font-weight: 900;
        `;
      case "item-info":
        return `
            font-size: 11px;
            font-weight: 700;
            color: #868686;
        `;
    }
  }}
`;

const Text: React.FC<TextProps> = ({
  children,
  size = 20,
  color,
  align,
  weight,
  highlight = false,
  inline = false,
}) => {
  return (
    <StyledText
      size={size}
      color={color}
      align={align}
      weight={weight}
      highlight={highlight}
      inline={inline}
    >
      {children}
    </StyledText>
  );
};

const ThemeText: React.FC<ThemeTextProps> = ({ children, align, variant }) => {
  return (
    <StyledThemeText variant={variant} align={align}>
      {children}
    </StyledThemeText>
  );
};

export default Text;
export { ThemeText };
