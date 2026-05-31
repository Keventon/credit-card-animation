import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { CardSide, CreditCard } from "@/components/credit-card";
import { useSharedValue } from "react-native-reanimated";
import { Input } from "@/components/input";

export function Payment() {
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const cardSide = useSharedValue<CardSide>(CardSide.FRONT);

  function handleShowFrontCard() {
    cardSide.value = CardSide.FRONT;
  }

  function handleShowBackCard() {
    cardSide.value = CardSide.BACK;
  }

  function handleInvertCard() {
    if (cardSide.value === CardSide.FRONT) {
      handleShowBackCard();
    } else {
      handleShowFrontCard();
    }
  }

  function formatCardExpiry(input: string): string {
    return input.replace(/^(\d{2})(\d{0,2})$/, (match, p1, p2) =>
      p2 ? `${p1}/${p2}` : p1
    );
  }

  function handleDateChange(text: string) {
    const formattedText = formatCardExpiry(text);
    setDate(formattedText);
  }

  function removeSpecialCharactersAndAccents(input: string): string {
    return input
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z\s]/g, "");
  }

  function capitalizeWords(input: string): string {
    return input.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function handleNameChange(text: string) {
    const sanitizedText = removeSpecialCharactersAndAccents(text);
    const capitalizedText = capitalizeWords(sanitizedText);
    setName(capitalizedText);
  }

  function formatCardNumber(input: string): string {
    return input
      .replace(/\s?/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  }

  function handleNumberChange(text: string) {
    const formattedText = formatCardNumber(text);
    setNumber(formattedText);
  }

  return (
    <View style={styles.container}>
      <CreditCard
        cardSide={cardSide}
        data={{
          name,
          number,
          date,
          code,
        }}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={handleInvertCard}
      >
        <Text>Inverter</Text>
      </TouchableOpacity>

      <View style={styles.form}>
        <Input
          placeholder="Nome do titular"
          onChangeText={handleNameChange}
          onFocus={handleShowFrontCard}
          value={name}
        />
        <Input
          placeholder="Numero do cartão"
          keyboardType="numeric"
          maxLength={19}
          onChangeText={handleNumberChange}
          onFocus={handleShowBackCard}
          value={number}
        />

        <View style={styles.row}>
          <Input
            placeholder="MM/AA"
            keyboardType="numeric"
            maxLength={5}
            style={styles.smallInput}
            onChangeText={handleDateChange}
            value={date}
          />
          <Input
            placeholder="CVV"
            keyboardType="numeric"
            maxLength={3}
            style={styles.smallInput}
            onChangeText={setCode}
          />
        </View>
      </View>
    </View>
  );
}
