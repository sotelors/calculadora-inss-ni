import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function App() {
  const [salario, setSalario] = useState<string>("");
  const [inss, setInss] = useState<number>(0);
  const [ir, setIr] = useState<number>(0);
  const [salarioNeto, setSalarioNeto] = useState<number>(0);
  const [mostrarResultados, setMostrarResultados] = useState<boolean>(false);

  const calcularDescuentos = () => {
    const salarioNum = parseFloat(salario) || 0;

    // Cálculo del INSS (7% del salario bruto)
    const inssCalculado = salarioNum * 0.07;
    setInss(inssCalculado);

    // Cálculo del IR
    const salarioNetoMensual = salarioNum - inssCalculado;
    const salarioNetoAnual = salarioNetoMensual * 12;

    let irAnual = 0;

    if (salarioNetoAnual <= 100000) {
      irAnual = 0;
    } else if (salarioNetoAnual <= 200000) {
      irAnual = (salarioNetoAnual - 100000) * 0.15;
    } else if (salarioNetoAnual <= 350000) {
      irAnual = 100000 * 0.15 + (salarioNetoAnual - 200000) * 0.2;
    } else if (salarioNetoAnual <= 500000) {
      irAnual =
        100000 * 0.15 + 150000 * 0.2 + (salarioNetoAnual - 350000) * 0.25;
    } else {
      irAnual =
        100000 * 0.15 +
        150000 * 0.2 +
        150000 * 0.25 +
        (salarioNetoAnual - 500000) * 0.3;
    }

    const irMensual = irAnual / 12;
    setIr(irMensual);

    // Salario neto (después de INSS e IR)
    const salarioNetoFinal = salarioNetoMensual - irMensual;
    setSalarioNeto(salarioNetoFinal);

    setMostrarResultados(true);
  };

  const limpiarCampos = () => {
    setSalario("");
    setInss(0);
    setIr(0);
    setSalarioNeto(0);
    setMostrarResultados(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Calculadora de Descuentos</Text>
      <Text style={styles.subtitulo}>INSS e IR - Nicaragua</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Salario Bruto Mensual (C$):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Ej: 16000"
          value={salario}
          onChangeText={setSalario}
        />
      </View>

      <TouchableOpacity style={styles.boton} onPress={calcularDescuentos}>
        <Text style={styles.botonTexto}>Calcular Descuentos</Text>
      </TouchableOpacity>

      {mostrarResultados && (
        <View style={styles.resultadosContainer}>
          <Text style={styles.resultadosTitulo}>Resultados:</Text>

          <View style={styles.resultadoItem}>
            <Text style={styles.resultadoLabel}>INSS (7%):</Text>
            <Text style={styles.resultadoValor}>C$ {inss.toFixed(2)}</Text>
          </View>

          <View style={styles.resultadoItem}>
            <Text style={styles.resultadoLabel}>IR Mensual:</Text>
            <Text style={styles.resultadoValor}>C$ {ir.toFixed(2)}</Text>
          </View>

          <View style={styles.resultadoItem}>
            <Text style={styles.resultadoLabel}>Salario Neto:</Text>
            <Text style={[styles.resultadoValor, styles.salarioNeto]}>
              C$ {salarioNeto.toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.boton, styles.botonLimpiar]}
            onPress={limpiarCampos}
          >
            <Text style={styles.botonTexto}>Nuevo Cálculo</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitulo}>Información sobre descuentos:</Text>
        <Text style={styles.infoTexto}>- INSS: 7% del salario bruto</Text>
        <Text style={styles.infoTexto}>
          - IR: Se calcula sobre el salario anual después del INSS
        </Text>
        <Text style={styles.infoTexto}> • Hasta C$100,000: 0%</Text>
        <Text style={styles.infoTexto}>
          {" "}
          • C$100,001 - C$200,000: 15% sobre el excedente
        </Text>
        <Text style={styles.infoTexto}>
          {" "}
          • C$200,001 - C$350,000: C$15,000 + 20% sobre excedente de C$200,000
        </Text>
        <Text style={styles.infoTexto}>
          {" "}
          • C$350,001 - C$500,000: C$45,000 + 25% sobre excedente de C$350,000
        </Text>
        <Text style={styles.infoTexto}>
          {" "}
          • Más de C$500,000: C$82,500 + 30% sobre excedente de C$500,000
        </Text>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#444",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  boton: {
    width: "100%",
    height: 50,
    backgroundColor: "#3498db",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botonLimpiar: {
    backgroundColor: "#e74c3c",
    marginTop: 20,
  },
  resultadosContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultadosTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  resultadoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  resultadoLabel: {
    fontSize: 16,
    color: "#555",
  },
  resultadoValor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  salarioNeto: {
    color: "#27ae60",
    fontSize: 18,
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  infoTexto: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
    lineHeight: 20,
  },
});
