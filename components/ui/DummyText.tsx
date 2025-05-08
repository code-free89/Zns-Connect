import { Text, TextStyle, View } from "react-native";

type Props = {
  text: string;
  textStyle: TextStyle;
  setSize: ({ width, height }: { width: number; height: number }) => void;
};

export default function DummyText({ text, textStyle, setSize }: Props) {
  return (
    <View
      style={{
        position: "absolute",
        opacity: 0,
        zIndex: -1,
      }}
      onLayout={(event) => {
        setSize({
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height,
        });
      }}
    >
      <Text style={textStyle}>{text}</Text>
    </View>
  );
}
