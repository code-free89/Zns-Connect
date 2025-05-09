import { StyleProp, Text, TextStyle, View } from "react-native";

type Props = {
  text: string;
  textStyle: StyleProp<TextStyle>;
  size: { width: number; height: number };
  setSize: ({ width, height }: { width: number; height: number }) => void;
};

export default function DummyText({ text, textStyle, size, setSize }: Props) {
  return (
    <View
      style={{
        position: "absolute",
        opacity: 0,
        zIndex: -1,
      }}
      onLayout={(event) => {
        if (size.width !== event.nativeEvent.layout.width) {
          setSize({
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height,
          });
        }
      }}
    >
      <Text style={textStyle}>{text}</Text>
    </View>
  );
}
