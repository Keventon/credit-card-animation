import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    padding: 24,
    justifyContent: "space-between",
    marginTop: 32,
  },
  front: {
    backgroundColor: "#dae1e7",
    backfaceVisibility: "hidden",
    position: "absolute",
  },
  back: {
    backgroundColor: "#bac1c7",
    backfaceVisibility: "hidden",
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  logo: {
    backgroundColor: "#8795a0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flag: {
    flexDirection: "row",
    gap: -12,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  red: {
    backgroundColor: "red",
  },
  orange: {
    backgroundColor: "orange",
  },
  label: {
    fontWeight: "bold",
  },
  value: {
    fontWeight: "bold",
  },
});
