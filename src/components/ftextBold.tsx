import { Text, TextProps } from "react-native";
import { getCommonStyle } from "../styles/common";
import { useTheme } from "../hooks/useTheme";

export default function FTextBold({ children, style, ...props }: TextProps) {
  const { theme } = useTheme();
  const common = getCommonStyle(theme);

  return (
    <Text style={[common.boldText, style]} {...props}>
      {children}
    </Text>
  );
}
