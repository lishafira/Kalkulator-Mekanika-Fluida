import streamlit as st
import matplotlib.pyplot as plt
import numpy as np

st.set_page_config(
    page_title="Kalkulator Mekanika Fluida",
    layout="wide"
)

st.markdown("""
    <style>
    .main { background-color: #f8f9fa; }
    .stMetric { 
        background-color: #ffffff; 
        padding: 20px; 
        border-radius: 12px; 
        box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
    }
    .stButton>button {
        width: 100%;
        border-radius: 8px;
        height: 3em;
        background-color: #ff4b4b;
        color: white;
    }
    </style>
    """, unsafe_allow_html=True)
with st.sidebar:
    st.title("Tugas Besar Mekanika Fluida")
    st.divider()
    mode = st.radio("Pilih Mode Perhitungan:", ["Turbin Air (Pembangkit)", "Pompa Air (Konsumsi)"])
    st.caption("Gunakan aplikasi ini untuk estimasi daya listrik.")

st.title("Sistem Analisis Daya Fluida")
st.write("Aplikasi ini menghitung estimasi daya berdasarkan input debit, head, dan efisiensi.")

# Container Input
with st.container():
    col1, col2, col3 = st.columns(3)
    with col1:
        debit = st.number_input("Debit Air (Q) [m³/s]", min_value=0.0, step=0.1, help="Volume fluida yang mengalir per satuan waktu.") 
    with col2:
        head = st.number_input("Head (H) [meter]", min_value=0.0, step=0.1, help="Tinggi jatuh air atau kenaikan tekanan yang dibutuhkan.") 
    with col3:
        efisiensi = st.slider("Efisiensi (η) [%]", 0, 100, 85)

st.divider()
RHO = 1000  # Densitas air (kg/m^3)
G = 9.81    # Gravitasi (m/s^2)
eta = efisiensi / 100

if st.button("Jalankan Simulasi"):
    if debit > 0 and head > 0:
        res_col1, res_col2 = st.columns([1, 1])
        
        with res_col1:
            st.subheader("Hasil Perhitungan")
            if mode == "Turbin Air (Pembangkit)":
                daya_ideal = (RHO * G * debit * head) / 1000 # kW
                daya_nyata = daya_ideal * eta
                
                st.metric("Estimasi Daya Dihasilkan", f"{daya_nyata:.2f} kW", delta=f"{efisiensi}% Eff")
                st.write(f"Daya ini setara dengan menyalakan sekitar {int(daya_nyata*1000/10)} lampu LED 10W.")
                
                # Visualisasi Bar Chart
                fig, ax = plt.subplots(figsize=(5, 4))
                ax.bar(["Potensi Air", "Output Listrik"], [daya_ideal, daya_nyata], color=['#0077b6', '#00b4d8'])
                ax.set_ylabel("Daya (kW)")
                ax.set_title("Visualisasi Energi Terkonversi")
                st.pyplot(fig) [cite: 24]

            else:
                if eta > 0:
                    daya_hidrolik = (RHO * G * debit * head) / 1000 # kW
                    daya_listrik = daya_hidrolik / eta
                    
                    st.metric("Estimasi Daya Dibutuhkan", f"{daya_listrik:.2f} kW", delta=f"-{100-efisiensi}% Losses", delta_color="inverse")
                    
                    # Visualisasi Pie Chart
                    labels = 'Daya Berguna', 'Kerugian Energi'
                    sizes = [efisiensi, 100 - efisiensi]
                    fig, ax = plt.subplots()
                    ax.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90, colors=['#2a9d8f', '#e76f51'], explode=(0.1, 0))
                    ax.set_title("Distribusi Penggunaan Daya Pompa")
                    st.pyplot(fig)
                else:
                    st.error("Efisiensi tidak boleh 0%!")

        with res_col2:
            st.subheader("ANALISIS:")
            st.info(f"""
            Berdasarkan input:
            - **Debit**: {debit} m³/s
            - **Head**: {head} m
            - **Densitas**: {RHO} kg/m³
            
            Rumus yang digunakan:
            $P = \\rho \\cdot g \\cdot Q \\cdot H \\cdot \\eta$ (Untuk Turbin)
            $P = \\frac{{\\rho \\cdot g \\cdot Q \\cdot H}}{{\\eta}}$ (Untuk Pompa)
            """)
            st.success("Perhitungan selesai dengan akurasi tinggi.") 
    else:
        st.warning("Mohon masukkan nilai Debit dan Head yang valid (> 0).")

st.divider()
