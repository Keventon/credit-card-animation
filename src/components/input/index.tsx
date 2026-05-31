import { Text, TextInput, TextInputProps, View } from "react-native";
import { styles } from "./styles";

export function Input({ style, ...rest }: TextInputProps) {
  return <TextInput style={[styles.input, style]} {...rest} />;
}
