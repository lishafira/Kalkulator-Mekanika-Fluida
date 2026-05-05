import streamlit as st
import matplotlib.pyplot as plt
import numpy as np

#CARA NGERUN NYA: python -m streamlit run Tubes_Mekflu.py

st.set_page_config(page_title="Kalkulator Mekanika Fluida", layout="centered")

st.title("Aplikasi Perhitungan Sistem Fluida")
st.write("Tugas Besar Mekanika Fluida - S1 Teknik Fisika")
mode = st.sidebar.selectbox("Pilih Jenis Sistem:", ["Estimasi Daya Turbin", "Estimasi Daya Pompa"])

RHO = 1000  
G = 9.81    

st.header(mode)
col1, col2 = st.columns(2)
with col1:
    debit = st.number_input("Masukkan Debit Air (m³/s):", min_value=0.0, step=0.1)
    head = st.number_input("Masukkan Head (meter):", min_value=0.0, step=0.1)
with col2:
    efisiensi = st.slider("Efisiensi Sistem (%):", 0, 100, 80) / 100

if st.button("Hitung Daya"):
    if mode == "Estimasi Daya Turbin":
        daya = RHO * G * debit * head * efisiensi
        st.success(f"Estimasi Daya Listrik yang Dihasilkan: {daya/1000:.2f} kW")
        fig, ax = plt.subplots()
        ax.bar(["Potensi Hidro", "Output Listrik"], [RHO*G*debit*head/1000, daya/1000], color=['blue', 'green'])
        ax.set_ylabel("Daya (kW)")
        ax.set_title("Visualisasi Efisiensi Turbin")
        st.pyplot(fig)

    else:
        if efisiensi > 0:
            daya = (RHO * G * debit * head) / efisiensi
            st.warning(f"Estimasi Daya Listrik yang Dibutuhkan: {daya/1000:.2f} kW")

            labels = ['Daya Berguna (Fluida)', 'Kerugian (Losses)']
            sizes = [efisiensi * 100, (1 - efisiensi) * 100]
            fig, ax = plt.subplots()
            ax.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90, colors=['cyan', 'red'])
            ax.axis('equal') 
            st.pyplot(fig)
        else:
            st.error("Efisiensi tidak boleh 0%")