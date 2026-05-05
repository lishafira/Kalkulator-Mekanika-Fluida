def hitung_daya_turbin(debit, head, efisiensi, rho=1000, g=9.81):
    """Estimasi daya listrik yang dihasilkan turbin (kW)"""
    #P = rho * g * Q * H * eta[cite: 3]
    eta_decimal = efisiensi / 100
    daya_ideal = (rho * g * debit * head) / 1000  # dalam kW
    daya_nyata = daya_ideal * eta_decimal
    return daya_ideal, daya_nyata

def hitung_daya_pompa(debit, head, efisiensi, rho=1000, g=9.81):
    """Estimasi daya listrik yang dibutuhkan pompa (kW)"""
    #P = (rho * g * Q * H) / eta[cite: 3]
    eta_decimal = efisiensi / 100
    daya_hidrolik = (rho * g * debit * head) / 1000  # dalam kW
    if eta_decimal > 0:
        daya_listrik = daya_hidrolik / eta_decimal
        return daya_hidrolik, daya_listrik
    return daya_hidrolik, 0
