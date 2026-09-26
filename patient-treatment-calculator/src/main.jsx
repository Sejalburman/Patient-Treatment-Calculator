import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const SERVICE_LIST = [
  "Initial Evaluation",
  "Follow Up visits",
  "Imaging Services - MRI/CT/Ultra Sound/Xray",
  "Physiotherapy - Hot/Cold Pack, E-Stimulation, Therapeutic Activity",
  "Orthopedic services",
  "Pain Management - Surgery Cost/Procedure",
  "Pain Evaluation",
  "Pain Injection",
  "Neuro Physician",
  "Neuro Pain / Traumatic Brain Therapy",
  "Chiropractic Services",
  "Chiropractic Treatment",
  "Post Surgery Equipment",
  "Pharmacy",
  "Notary Charges",
  "Travel Expenses",
  "Medical Records Production",
  "Cancellation Charges / No show Fee",
  "Company expense"
];

function makeRow() {
  return { id: Date.now() + Math.random(), service: "", originalAmount: "", attorneyAmount: "" };
}

function App() {
  const [patient, setPatient] = useState({
    name: "",
    dob: "",
    referralDate: ""
  });

  const [rows, setRows] = useState([makeRow()]);

  const [discount, setDiscount] = useState(""); // percentage value, e.g. 10 = 10%, applies only to Attorney Amount

  const updatePatient = (e) =>
    setPatient({ ...patient, [e.target.name]: e.target.value });

  const addRow = () => setRows([...rows, makeRow()]);

  const updateRow = (id, field, value) =>
    setRows(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));

  const removeRow = (id) => setRows(rows.filter((r) => r.id !== id));

  const originalSubtotal = useMemo(
    () => rows.reduce((sum, r) => sum + (Number(r.originalAmount) || 0), 0),
    [rows]
  );

  const attorneySubtotal = useMemo(
    () => rows.reduce((sum, r) => sum + (Number(r.attorneyAmount) || 0), 0),
    [rows]
  );

  const discountPct = Math.min(Math.max(Number(discount) || 0, 0), 100);
  const attorneyDiscountAmount = attorneySubtotal * (discountPct / 100);
  const attorneyFinal = Math.max(attorneySubtotal - attorneyDiscountAmount, 0);

  const fmt = (n) => `$${Number(n || 0).toFixed(2)}`;

  const clearForm = () => {
    setPatient({ name: "", dob: "", referralDate: "" });
    setRows([makeRow()]);
    setDiscount("");
  };

  return (
    <main className="page">
      <div className="calculator">
        <header className="topbar">
          <div>
            <h1>Patient Treatment Calculator</h1>
            <p>Patient referral &amp; treatment billing</p>
          </div>
          <button className="primary" onClick={() => window.print()}>
            Print / Save PDF
          </button>
        </header>

        <section className="patient-card">
          <h2>Patient Details</h2>
          <div className="form-grid">
            <label className="wide">
              Patient Name
              <input name="name" value={patient.name} onChange={updatePatient} />
            </label>
            <label>
              Date of Birth
              <input type="date" name="dob" value={patient.dob} onChange={updatePatient} />
            </label>
            <label>
              Referral Date
              <input
                type="date"
                name="referralDate"
                value={patient.referralDate}
                onChange={updatePatient}
              />
            </label>
          </div>
        </section>

        <section>
          <div className="section-head">
            <h2>Treatments / Services</h2>
            <button className="secondary" onClick={addRow}>
              + Add Treatment
            </button>
          </div>
          <div className="table">
            <div className="thead">
              <span>#</span>
              <span>Treatment / Service</span>
              <span>Original Amount ($)</span>
              <span>Attorney Amount ($)</span>
              <span></span>
            </div>
            {rows.map((row, index) => (
              <div className="trow" key={row.id}>
                <span className="row-num">{index + 1}</span>
                <select
                  value={row.service}
                  onChange={(e) => updateRow(row.id, "service", e.target.value)}
                >
                  <option value="">Select treatment/service</option>
                  {SERVICE_LIST.map((service, i) => (
                    <option key={i} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="0"
                  value={row.originalAmount}
                  placeholder="0"
                  onChange={(e) => updateRow(row.id, "originalAmount", e.target.value)}
                />
                <input
                  type="number"
                  min="0"
                  value={row.attorneyAmount}
                  placeholder="0"
                  onChange={(e) => updateRow(row.id, "attorneyAmount", e.target.value)}
                />
                <button className="danger" onClick={() => removeRow(row.id)}>
                  ×
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="bottom">
          <div className="summary">
            <div>
              <span>Original Amount</span>
              <b>{fmt(originalSubtotal)}</b>
            </div>
            <div>
              <span>Attorney Amount</span>
              <b>{fmt(attorneySubtotal)}</b>
            </div>
            <div className="discount">
              <span>Discount (on Attorney Amount)</span>
              <div className="discount-wrap">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="0"
                />
                <span className="percent-sign">%</span>
              </div>
            </div>
            <div className="discount-amt">
              <span>Discount Amount</span>
              <b>{fmt(attorneyDiscountAmount)}</b>
            </div>
            <div className="grand">
              <span>Attorney Amount After Discount</span>
              <b>{fmt(attorneyFinal)}</b>
            </div>
          </div>
        </section>

        <footer>
          <button className="clear" onClick={clearForm}>
            Clear
          </button>
          <button className="primary" onClick={() => window.print()}>
            Print Bill
          </button>
        </footer>

        <p className="hint">
          Amounts are in US Dollars ($). Discount applies only to the Attorney Amount.
          Original Amount and Attorney Amount are shown separately.
        </p>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
