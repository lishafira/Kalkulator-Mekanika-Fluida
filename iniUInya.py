import streamlit as st
import matplotlib.pyplot as plt
import app_logic as logic 

st.set_page_config(page_title="Kalkulator Mekflu", layout="wide")

st.title("Aplikasi Perhitungan Sistem Fluida")
st.write("Tugas Besar Mekanika Fluida - S1 Teknik Fisika")
mode = st.sidebar.selectbox("Pilih Jenis Sistem:", ["Estimasi Daya Turbin", "Estimasi Daya Pompa"])
debit = st.number_input("Masukkan Debit Air (m³/s):", min_value=0.0, step=0.1)
head = st.number_input("Masukkan Head (meter):", min_value=0.0, step=0.1)
efisiensi = st.slider("Efisiensi Sistem (%):", 0, 100, 80)

if st.button("Hitung Daya"):
    if mode == "Estimasi Daya Turbin":
        ideal, nyata = logic.hitung_daya_turbin(debit, head, efisiensi)
        st.success(f"Estimasi Daya Listrik yang Dihasilkan: {nyata:.2f} kW")
        fig, ax = plt.subplots()
        ax.bar(["Potensi Hidro", "Output Listrik"], [ideal, nyata], color=['blue', 'green'])
        st.pyplot(fig)
        
    else:
        hidrolik, listrik = logic.hitung_daya_pompa(debit, head, efisiensi)
        if efisiensi > 0:
            st.warning(f"Estimasi Daya Listrik yang Dibutuhkan: {listrik:.2f} kW")
        else:
            st.error("Efisiensi tidak boleh 0%")
