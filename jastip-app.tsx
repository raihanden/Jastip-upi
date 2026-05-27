import { useState, useMemo } from "react";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  harga_dikirim: { label: "Harga Dikirim", color: "#3b82f6", bg: "#dbeafe" },
  on_trip:       { label: "On Trip",       color: "#8b5cf6", bg: "#ede9fe" },
  arrived:       { label: "Arrived",       color: "#06b6d4", bg: "#cffafe" },
  done:          { label: "Done",          color: "#16a34a", bg: "#dcfce7" },
};

const PRAMUGARI_COLORS = {
  sasa:  { bg: "#ede9fe", text: "#6d28d9", dot: "#7c3aed",  label: "Sasa"  },
  ninda: { bg: "#fef3c7", text: "#b45309", dot: "#f59e0b",  label: "Ninda" },
};

const COUNTRY_FLAG = { Australia: "🇦🇺", Japan: "🇯🇵", Korea: "🇰🇷" };

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────

const INIT_TRIPS = [
  {
    id: 1, name: "Australia - Mei 2026", country: "Australia", currency: "AUD", dp: 5000000,
    pramugari: ["sasa", "ninda"],
    dates: [
      {
        id: 1, label: "3 Mei", kurs: 12568,
        items: [
          { id: 1, nama: "Medela freestyle double mini breast pump", qty: 1, hargaSatuan: 239.99, pajak: 0, ekspedisi: 5, hargaJastip: 3569000, pramugari: "sasa", checked: true,  struk: null },
        ],
      },
      {
        id: 2, label: "6 Mei", kurs: 12560,
        items: [
          { id: 1, nama: "Harbinger pro gloves women", qty: 1, hargaSatuan: 54.99, pajak: 0, ekspedisi: 3, hargaJastip: 755000, pramugari: "sasa", checked: false, struk: null },
        ],
      },
      {
        id: 3, label: "9 Mei", kurs: 12621,
        items: [
          { id: 1,  nama: "Nature's way kids omega 3 (150 gummies)",             qty: 1, hargaSatuan: 28.99, pajak: 0, ekspedisi: 2, hargaJastip: 472000,  pramugari: "sasa",  checked: true,  struk: null },
          { id: 2,  nama: "Nature's way kids iron + vitamin C (120 gummies)",    qty: 1, hargaSatuan: 22.99, pajak: 0, ekspedisi: 2, hargaJastip: 398000,  pramugari: "ninda", checked: true,  struk: null },
          { id: 3,  nama: "Nature's way adult women's multivitamin (180 gummies)",qty: 1, hargaSatuan: 30.99, pajak: 0, ekspedisi: 2, hargaJastip: 499000,  pramugari: "sasa",  checked: false, struk: null },
          { id: 4,  nama: "Brauer kids liquid multivitamin for toddlers 100ml",  qty: 1, hargaSatuan: 11,    pajak: 0, ekspedisi: 2, hargaJastip: 208000,  pramugari: "sasa",  checked: false, struk: null },
          { id: 5,  nama: "Brauer kids liquid vitamin D 10ml",                   qty: 1, hargaSatuan: 9.99,  pajak: 0, ekspedisi: 2, hargaJastip: 173000,  pramugari: "sasa",  checked: false, struk: null },
          { id: 6,  nama: "Brauer kids liquid multivitamin with iron 200ml",     qty: 1, hargaSatuan: 15.99, pajak: 0, ekspedisi: 2, hargaJastip: 279000,  pramugari: "ninda", checked: false, struk: null },
          { id: 7,  nama: "Pentavite multivitamin + iron 200ml",                 qty: 1, hargaSatuan: 21.99, pajak: 0, ekspedisi: 2, hargaJastip: 355000,  pramugari: "ninda", checked: false, struk: null },
          { id: 8,  nama: "Pentavite gold multivitamin + iron 200ml",            qty: 1, hargaSatuan: 25.99, pajak: 0, ekspedisi: 2, hargaJastip: 405000,  pramugari: "sasa",  checked: false, struk: null },
          { id: 9,  nama: "Pentavite daily multivitamin 60 gummies",             qty: 1, hargaSatuan: 14.99, pajak: 0, ekspedisi: 2, hargaJastip: 259000,  pramugari: "sasa",  checked: false, struk: null },
          { id: 10, nama: "Bellamy's step 3 toddler milk drink",                 qty: 2, hargaSatuan: 32.49, pajak: 0, ekspedisi: 4, hargaJastip: 1170000, pramugari: "ninda", checked: false, struk: null },
          { id: 11, nama: "b.box sippy cup disney minnie 240ml",                 qty: 1, hargaSatuan: 12.49, pajak: 0, ekspedisi: 2, hargaJastip: 232000,  pramugari: "sasa",  checked: false, struk: null },
          { id: 12, nama: "Gem skin-loving antiperspirant deodorant aerosol",    qty: 1, hargaSatuan: 8.39,  pajak: 0, ekspedisi: 2, hargaJastip: 146000,  pramugari: "sasa",  checked: false, struk: null },
          { id: 13, nama: "Mitchum antiperspirant black",                        qty: 1, hargaSatuan: 2.88,  pajak: 0, ekspedisi: 2, hargaJastip: 56000,   pramugari: "sasa",  checked: false, struk: null },
          { id: 14, nama: "Mitchum antiperspirant pink",                         qty: 1, hargaSatuan: 2.88,  pajak: 0, ekspedisi: 2, hargaJastip: 56000,   pramugari: "sasa",  checked: false, struk: null },
          { id: 15, nama: "Swisse beauty hair skin nails 60tabs",                qty: 1, hargaSatuan: 17.99, pajak: 0, ekspedisi: 2, hargaJastip: 279000,  pramugari: "sasa",  checked: false, struk: null },
        ],
      },
    ],
  },
  {
    id: 2, name: "Japan - Jun 2026", country: "Japan", currency: "JPY", dp: 3000000,
    pramugari: ["sasa"],
    dates: [
      {
        id: 1, label: "5 Jun", kurs: 105,
        items: [
          { id: 1, nama: "Kit Kat matcha 12pcs", qty: 3, hargaSatuan: 850, pajak: 0, ekspedisi: 10, hargaJastip: 350000, pramugari: "sasa", checked: false, struk: null },
          { id: 2, nama: "Collagen drink Meiji", qty: 2, hargaSatuan: 1200, pajak: 0, ekspedisi: 10, hargaJastip: 280000, pramugari: "sasa", checked: false, struk: null },
        ],
      },
    ],
  },
];

const INIT_REQUESTS = [
  {
    id: 1, client: "Rahma", wa: "08123456789", tripId: 1, status: "on_trip", tanggal: "2026-05-01",
    items: [
      { id: 1, nama: "Medela freestyle double mini breast pump", qty: 1, catatan: "Warna putih", foto: null, hargaOriginal: 3016194, hargaJastip: 3569000 },
      { id: 2, nama: "Pentavite gold multivitamin", qty: 2, catatan: "", foto: null, hargaOriginal: 656040, hargaJastip: 810000 },
    ],
  },
  {
    id: 2, client: "Aisyah", wa: "08111222333", tripId: 2, status: "harga_dikirim", tanggal: "2026-05-15",
    items: [
      { id: 1, nama: "Kit Kat matcha 12pcs", qty: 3, catatan: "", foto: null, hargaOriginal: 270000, hargaJastip: 350000 },
      { id: 2, nama: "Collagen drink Meiji", qty: 2, catatan: "Variant peach", foto: null, hargaOriginal: 220000, hargaJastip: 280000 },
      { id: 3, nama: "Rohto eye drops", qty: 1, catatan: "", foto: null, hargaOriginal: 95000, hargaJastip: 130000 },
    ],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const fmt  = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
const fmtN = (n, d = 2) => n.toLocaleString("id-ID", { minimumFractionDigits: d, maximumFractionDigits: d });

function calcItem(item, kurs) {
  const hargaAUD      = item.hargaSatuan * item.qty;
  const hargaOriginal = Math.round((item.hargaSatuan + item.pajak + item.ekspedisi) * item.qty * kurs);
  const profit        = item.hargaJastip - hargaOriginal;
  return { hargaAUD, hargaOriginal, profit };
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function Badge({ status }) {
  const sc = STATUS_CONFIG[status];
  return (
    <span style={{ background: sc.bg, color: sc.color, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6, letterSpacing: 0.5 }}>
      {sc.label}
    </span>
  );
}

function SectionTitle({ children }) {
  return <div style={{ fontSize: 10, color: "#888", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{children}</div>;
}

function Card({ children, style = {} }) {
  return <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden", ...style }}>{children}</div>;
}

// ─── MODULES ──────────────────────────────────────────────────────────────────

// MODULE 1: REKAP KEUANGAN
function RekapKeuangan({ trips, setTrips }) {
  const [selectedTripId, setSelectedTripId] = useState(trips[0]?.id);
  const [activeDate, setActiveDate]         = useState(null);
  const [editingItem, setEditingItem]       = useState(null);
  const [showAddItem, setShowAddItem]       = useState(null);
  const [newItem, setNewItem]               = useState({ nama: "", qty: 1, hargaSatuan: 0, pajak: 0, ekspedisi: 0, hargaJastip: 0, pramugari: "sasa" });

  const trip = trips.find(t => t.id === selectedTripId);

  const allItems = useMemo(() =>
    trip?.dates.flatMap(d => d.items.map(i => ({ ...i, dateLabel: d.label, kurs: d.kurs, dateId: d.id }))) || [],
    [trip]
  );

  const summary = useMemo(() => {
    let totalOriginal = 0, totalJastip = 0, totalProfit = 0;
    const pp = {};
    trip?.pramugari.forEach(p => pp[p] = 0);
    allItems.forEach(item => {
      const { hargaOriginal, profit } = calcItem(item, item.kurs);
      totalOriginal += hargaOriginal;
      totalJastip   += item.hargaJastip;
      totalProfit   += profit;
      if (pp[item.pramugari] !== undefined) pp[item.pramugari] += profit;
      else pp["sasa"] = (pp["sasa"] || 0) + profit;
    });
    return { totalOriginal, totalJastip, totalProfit, pp, sisa: totalOriginal - (trip?.dp || 0) };
  }, [allItems, trip]);

  const updateItem = (dateId, itemId, field, value) =>
    setTrips(prev => prev.map(t => t.id === trip.id ? {
      ...t, dates: t.dates.map(d => d.id === dateId ? {
        ...d, items: d.items.map(i => i.id === itemId ? { ...i, [field]: field === "nama" || field === "pramugari" ? value : parseFloat(value) || 0 } : i)
      } : d)
    } : t));

  const addItem = (dateId) => {
    setTrips(prev => prev.map(t => t.id === trip.id ? {
      ...t, dates: t.dates.map(d => d.id === dateId ? { ...d, items: [...d.items, { ...newItem, id: Date.now(), checked: false, struk: null }] } : d)
    } : t));
    setNewItem({ nama: "", qty: 1, hargaSatuan: 0, pajak: 0, ekspedisi: 0, hargaJastip: 0, pramugari: "sasa" });
    setShowAddItem(null);
  };

  if (!trip) return null;
  const visibleDates = activeDate ? trip.dates.filter(d => d.id === activeDate) : trip.dates;

  return (
    <div style={{ padding: 16 }}>
      {/* Trip selector */}
      <div style={{ marginBottom: 14 }}>
        <SectionTitle>Trip</SectionTitle>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {trips.map(t => (
            <button key={t.id} onClick={() => { setSelectedTripId(t.id); setActiveDate(null); }}
              style={{ whiteSpace: "nowrap", padding: "7px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit",
                background: selectedTripId === t.id ? "#1a1a2e" : "#fff", color: selectedTripId === t.id ? "#e8c547" : "#666" }}>
              {COUNTRY_FLAG[t.country]} {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        {[
          { label: "Harga Original", value: fmt(summary.totalOriginal) },
          { label: "Harga Jastip",   value: fmt(summary.totalJastip)   },
          { label: "Nett Profit",    value: fmt(summary.totalProfit), highlight: true },
          { label: "DP",             value: fmt(trip.dp), sub: `Sisa: ${fmt(summary.sisa)}` },
        ].map((c, i) => (
          <Card key={i} style={{ padding: "12px 14px", background: c.highlight ? "#1a1a2e" : "#fff" }}>
            <div style={{ fontSize: 9, color: c.highlight ? "#e8c547" : "#888", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: c.highlight ? "#fff" : "#1a1a2e" }}>{c.value}</div>
            {c.sub && <div style={{ fontSize: 10, color: "#dc2626", marginTop: 2 }}>{c.sub}</div>}
          </Card>
        ))}
      </div>

      {/* Profit per pramugari */}
      <Card style={{ padding: "12px 14px", marginBottom: 14 }}>
        <SectionTitle>Profit per Pramugari</SectionTitle>
        <div style={{ display: "flex", gap: 10 }}>
          {trip.pramugari.map(p => {
            const c = PRAMUGARI_COLORS[p] || PRAMUGARI_COLORS.sasa;
            return (
              <div key={p} style={{ flex: 1, background: "#f7f5f0", borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.dot }} />
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#444" }}>{c.label}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#16a34a" }}>{fmt(summary.pp[p] || 0)}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Date filter */}
      <div style={{ marginBottom: 12 }}>
        <SectionTitle>Filter Tanggal</SectionTitle>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          <button onClick={() => setActiveDate(null)}
            style={{ whiteSpace: "nowrap", padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 600,
              background: !activeDate ? "#1a1a2e" : "#fff", color: !activeDate ? "#e8c547" : "#666" }}>Semua</button>
          {trip.dates.map(d => (
            <button key={d.id} onClick={() => setActiveDate(d.id)}
              style={{ whiteSpace: "nowrap", padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 600,
                background: activeDate === d.id ? "#1a1a2e" : "#fff", color: activeDate === d.id ? "#e8c547" : "#666" }}>
              {d.label} · {trip.currency} {fmtN(d.kurs, 0)}
            </button>
          ))}
        </div>
      </div>

      {/* Items */}
      {visibleDates.map(date => (
        <div key={date.id} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ background: "#1a1a2e", color: "#e8c547", padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700 }}>{date.label}</div>
              <div style={{ fontSize: 11, color: "#888" }}>Kurs: {trip.currency} {fmtN(date.kurs, 0)}</div>
            </div>
            <button onClick={() => setShowAddItem(date.id)}
              style={{ background: "#e8c547", color: "#1a1a2e", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              + Item
            </button>
          </div>

          {date.items.map(item => {
            const { hargaAUD, hargaOriginal, profit } = calcItem(item, date.kurs);
            const pc  = PRAMUGARI_COLORS[item.pramugari] || PRAMUGARI_COLORS.sasa;
            const key = `${date.id}-${item.id}`;
            const isEditing = editingItem === key;
            return (
              <Card key={item.id} style={{ marginBottom: 8, padding: "12px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ flex: 1, paddingRight: 8 }}>
                    {isEditing
                      ? <input value={item.nama} onChange={e => updateItem(date.id, item.id, "nama", e.target.value)}
                          style={{ width: "100%", fontSize: 13, fontWeight: 600, border: "1px solid #e8c547", borderRadius: 6, padding: "4px 8px", fontFamily: "inherit" }} />
                      : <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e", lineHeight: 1.3 }}>{item.nama}</div>
                    }
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                      <span style={{ fontSize: 10, color: "#888" }}>QTY {item.qty}</span>
                      <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#ccc", display: "inline-block" }} />
                      <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: pc.bg, color: pc.text, fontWeight: 600 }}>{pc.label}</span>
                    </div>
                  </div>
                  <button onClick={() => setEditingItem(isEditing ? null : key)}
                    style={{ background: isEditing ? "#1a1a2e" : "#f7f5f0", color: isEditing ? "#e8c547" : "#666", border: "none", borderRadius: 6, padding: "4px 8px", fontSize: 11, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
                    {isEditing ? "✓" : "Edit"}
                  </button>
                </div>

                {isEditing ? (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                    {[["Harga", "hargaSatuan"], ["Pajak", "pajak"], ["Ekspedisi", "ekspedisi"], ["Jastip (Rp)", "hargaJastip"], ["QTY", "qty"]].map(([lbl, fld]) => (
                      <div key={fld}>
                        <div style={{ fontSize: 9, color: "#888", fontWeight: 600, marginBottom: 2, textTransform: "uppercase" }}>{lbl}</div>
                        <input type="number" value={item[fld]} onChange={e => updateItem(date.id, item.id, fld, e.target.value)}
                          style={{ width: "100%", fontSize: 12, border: "1px solid #e8e8e8", borderRadius: 6, padding: "4px 8px", fontFamily: "DM Mono, monospace", boxSizing: "border-box" }} />
                      </div>
                    ))}
                    <div>
                      <div style={{ fontSize: 9, color: "#888", fontWeight: 600, marginBottom: 2, textTransform: "uppercase" }}>Pramugari</div>
                      <select value={item.pramugari} onChange={e => updateItem(date.id, item.id, "pramugari", e.target.value)}
                        style={{ width: "100%", fontSize: 12, border: "1px solid #e8e8e8", borderRadius: 6, padding: "4px 8px", fontFamily: "inherit" }}>
                        {trip.pramugari.map(p => <option key={p} value={p}>{PRAMUGARI_COLORS[p]?.label || p}</option>)}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }}>
                    {[
                      { label: trip.currency, value: fmtN(hargaAUD) },
                      { label: "Original",    value: fmt(hargaOriginal) },
                      { label: "Jastip",      value: fmt(item.hargaJastip) },
                      { label: "Profit",      value: fmt(profit), color: profit >= 0 ? "#16a34a" : "#dc2626" },
                    ].map((col, i) => (
                      <div key={i} style={{ background: "#f7f5f0", borderRadius: 6, padding: "6px 8px" }}>
                        <div style={{ fontSize: 9, color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>{col.label}</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: col.color || "#1a1a2e", fontFamily: "DM Mono, monospace" }}>{col.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}

          {/* Add item form */}
          {showAddItem === date.id && (
            <div style={{ background: "#fffbeb", border: "1px dashed #e8c547", borderRadius: 10, padding: 14, marginBottom: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a2e", marginBottom: 10 }}>+ Tambah Item</div>
              <input placeholder="Nama barang" value={newItem.nama} onChange={e => setNewItem(p => ({ ...p, nama: e.target.value }))}
                style={{ width: "100%", fontSize: 13, border: "1px solid #e8e8e8", borderRadius: 6, padding: "8px 10px", marginBottom: 8, fontFamily: "inherit", boxSizing: "border-box" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
                {[["Harga", "hargaSatuan"], ["Pajak", "pajak"], ["Ekspedisi", "ekspedisi"], ["Jastip (Rp)", "hargaJastip"], ["QTY", "qty"]].map(([lbl, fld]) => (
                  <div key={fld}>
                    <div style={{ fontSize: 9, color: "#888", fontWeight: 600, marginBottom: 2, textTransform: "uppercase" }}>{lbl}</div>
                    <input type="number" value={newItem[fld]} onChange={e => setNewItem(p => ({ ...p, [fld]: parseFloat(e.target.value) || 0 }))}
                      style={{ width: "100%", fontSize: 12, border: "1px solid #e8e8e8", borderRadius: 6, padding: "4px 8px", fontFamily: "DM Mono, monospace", boxSizing: "border-box" }} />
                  </div>
                ))}
                <div>
                  <div style={{ fontSize: 9, color: "#888", fontWeight: 600, marginBottom: 2, textTransform: "uppercase" }}>Pramugari</div>
                  <select value={newItem.pramugari} onChange={e => setNewItem(p => ({ ...p, pramugari: e.target.value }))}
                    style={{ width: "100%", fontSize: 12, border: "1px solid #e8e8e8", borderRadius: 6, padding: "4px 8px", fontFamily: "inherit" }}>
                    {trip.pramugari.map(p => <option key={p} value={p}>{PRAMUGARI_COLORS[p]?.label || p}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => addItem(date.id)}
                  style={{ flex: 1, background: "#1a1a2e", color: "#e8c547", border: "none", borderRadius: 8, padding: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Tambah</button>
                <button onClick={() => setShowAddItem(null)}
                  style={{ flex: 1, background: "#f7f5f0", color: "#666", border: "none", borderRadius: 8, padding: 8, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Batal</button>
              </div>
            </div>
          )}

          <div style={{ background: "#f0f0f0", borderRadius: 8, padding: "8px 14px", display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontSize: 11, color: "#666", fontWeight: 600 }}>Subtotal {date.label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#16a34a" }}>
              {fmt(date.items.reduce((acc, i) => acc + (i.hargaJastip - calcItem(i, date.kurs).hargaOriginal), 0))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// MODULE 2: REQUEST MANAGEMENT
function RequestManagement({ trips }) {
  const [requests, setRequests] = useState(INIT_REQUESTS);
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch]             = useState("");
  const [showForm, setShowForm]         = useState(false);
  const [expandedId, setExpandedId]     = useState(null);
  const [form, setForm] = useState({
    client: "", wa: "", tripId: "",
    tanggal: new Date().toISOString().split("T")[0],
    items: [{ id: 1, nama: "", qty: 1, catatan: "", foto: null, hargaOriginal: 0, hargaJastip: 0 }],
  });

  const filtered = requests.filter(r => {
    const okStatus = filterStatus === "all" || r.status === filterStatus;
    const okSearch = r.client.toLowerCase().includes(search.toLowerCase()) ||
      r.items.some(i => i.nama.toLowerCase().includes(search.toLowerCase()));
    return okStatus && okSearch;
  });

  const addFormItem    = () => setForm(p => ({ ...p, items: [...p.items, { id: Date.now(), nama: "", qty: 1, catatan: "", foto: null, hargaOriginal: 0, hargaJastip: 0 }] }));
  const removeFormItem = (id) => setForm(p => ({ ...p, items: p.items.filter(i => i.id !== id) }));
  const updateFormItem = (id, f, v) => setForm(p => ({ ...p, items: p.items.map(i => i.id === id ? { ...i, [f]: v } : i) }));

  const submitForm = () => {
    if (!form.client || !form.wa || form.items.some(i => !i.nama)) return;
    setRequests(p => [{ ...form, id: Date.now(), status: "harga_dikirim", tripId: form.tripId ? parseInt(form.tripId) : null }, ...p]);
    setForm({ client: "", wa: "", tripId: "", tanggal: new Date().toISOString().split("T")[0], items: [{ id: 1, nama: "", qty: 1, catatan: "", foto: null, hargaOriginal: 0, hargaJastip: 0 }] });
    setShowForm(false);
  };

  const updateStatus = (id, s)  => setRequests(p => p.map(r => r.id === id ? { ...r, status: s } : r));
  const updateTrip   = (id, tid) => setRequests(p => p.map(r => r.id === id ? { ...r, tripId: tid ? parseInt(tid) : null } : r));

  return (
    <div style={{ padding: 16 }}>
      {/* Filter */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 12, paddingBottom: 4 }}>
        {[{ label: "Semua", key: "all", count: requests.length },
          ...Object.entries(STATUS_CONFIG).map(([k, v]) => ({ label: v.label, key: k, count: requests.filter(r => r.status === k).length }))
        ].map(s => (
          <button key={s.key} onClick={() => setFilterStatus(s.key)}
            style={{ whiteSpace: "nowrap", padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontFamily: "inherit",
              background: filterStatus === s.key ? "#1a1a2e" : "#fff", color: filterStatus === s.key ? "#e8c547" : "#666", fontSize: 12, fontWeight: 600 }}>
            {s.label} <span style={{ opacity: 0.6 }}>({s.count})</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <input placeholder="Cari client atau barang..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", padding: "10px 14px 10px 36px", borderRadius: 10, border: "none", fontSize: 13, fontFamily: "inherit",
            background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", boxSizing: "border-box" }} />
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#aaa" }}>🔍</span>
      </div>

      {filtered.length === 0 && <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa" }}>Tidak ada request</div>}

      {filtered.map(req => {
        const isExpanded = expandedId === req.id;
        const tripName   = trips.find(t => t.id === req.tripId)?.name || "—";
        return (
          <Card key={req.id} style={{ marginBottom: 10 }}>
            <div style={{ padding: "14px", cursor: "pointer" }} onClick={() => setExpandedId(isExpanded ? null : req.id)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{req.client}</div>
                  <div style={{ fontSize: 11, color: "#888", marginTop: 1, fontFamily: "DM Mono, monospace" }}>{req.wa}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <Badge status={req.status} />
                  <span style={{ fontSize: 10, color: "#aaa" }}>{req.tanggal}</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
                <div style={{ background: "#f7f5f0", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: "#555", fontWeight: 600 }}>
                  {req.items.length} item{req.items.length > 1 ? "s" : ""}
                </div>
                <div style={{ background: "#f7f5f0", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: "#555", fontWeight: 600 }}>
                  ✈️ {tripName}
                </div>
                <div style={{ background: "#dcfce7", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: "#16a34a", fontWeight: 700, marginLeft: "auto" }}>
                  {fmt(req.items.reduce((a, i) => a + (i.hargaJastip || 0), 0))}
                </div>
                <div style={{ fontSize: 11, color: "#aaa" }}>{isExpanded ? "▲" : "▼"}</div>
              </div>
            </div>

            {isExpanded && (
              <div style={{ borderTop: "1px solid #f0f0f0", padding: "12px 14px" }}>
                <div style={{ marginBottom: 12 }}>
                  <SectionTitle>Items</SectionTitle>
                  {req.items.map((item, idx) => (
                    <div key={item.id} style={{ background: "#f7f5f0", borderRadius: 8, padding: "10px 12px", marginBottom: 6 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#1a1a2e" }}>{idx + 1}. {item.nama}</div>
                      <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>QTY: {item.qty}{item.catatan ? ` · ${item.catatan}` : ""}</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 8 }}>
                        <div style={{ background: "#fff", borderRadius: 6, padding: "6px 8px" }}>
                          <div style={{ fontSize: 9, color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>Harga Original</div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: "#1a1a2e", fontFamily: "DM Mono, monospace" }}>{fmt(item.hargaOriginal || 0)}</div>
                        </div>
                        <div style={{ background: "#fff", borderRadius: 6, padding: "6px 8px" }}>
                          <div style={{ fontSize: 9, color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>Harga Jastip</div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", fontFamily: "DM Mono, monospace" }}>{fmt(item.hargaJastip || 0)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: 12 }}>
                  <SectionTitle>Assign Trip</SectionTitle>
                  <select value={req.tripId || ""} onChange={e => updateTrip(req.id, e.target.value)}
                    style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #e8e8e8", fontSize: 12, fontFamily: "inherit" }}>
                    <option value="">— Belum di-assign —</option>
                    {trips.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <SectionTitle>Update Status</SectionTitle>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                      <button key={k} onClick={() => updateStatus(req.id, k)}
                        style={{ padding: "5px 12px", borderRadius: 20, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 11, fontWeight: 600,
                          background: req.status === k ? "#1a1a2e" : v.bg, color: req.status === k ? "#e8c547" : v.color }}>
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>

                <a href={`https://wa.me/62${req.wa.substring(1)}`} target="_blank" rel="noreferrer"
                  style={{ display: "block", textAlign: "center", background: "#25D366", color: "#fff", borderRadius: 8, padding: 8, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
                  💬 Hubungi via WhatsApp
                </a>
              </div>
            )}
          </Card>
        );
      })}

      {/* FAB */}
      <button onClick={() => setShowForm(true)}
        style={{ position: "fixed", bottom: 80, right: 20, background: "#e8c547", color: "#1a1a2e", border: "none", borderRadius: "50%", width: 52, height: 52,
          fontSize: 24, cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.2)", zIndex: 50 }}>+</button>

      {/* Add Request Modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: "#fff", borderRadius: "20px 20px 0 0", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "20px 16px 32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Request Baru</div>
              <button onClick={() => setShowForm(false)}
                style={{ background: "#f7f5f0", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>
            <input placeholder="Nama client" value={form.client} onChange={e => setForm(p => ({ ...p, client: e.target.value }))}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e8e8e8", fontSize: 13, fontFamily: "inherit", marginBottom: 8, boxSizing: "border-box" }} />
            <input placeholder="Nomor WhatsApp (08...)" value={form.wa} onChange={e => setForm(p => ({ ...p, wa: e.target.value }))}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e8e8e8", fontSize: 13, fontFamily: "inherit", marginBottom: 12, boxSizing: "border-box" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
              <div>
                <SectionTitle>Trip</SectionTitle>
                <select value={form.tripId} onChange={e => setForm(p => ({ ...p, tripId: e.target.value }))}
                  style={{ width: "100%", padding: "9px 8px", borderRadius: 8, border: "1px solid #e8e8e8", fontSize: 12, fontFamily: "inherit" }}>
                  <option value="">— Pilih —</option>
                  {trips.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div>
                <SectionTitle>Tanggal</SectionTitle>
                <input type="date" value={form.tanggal} onChange={e => setForm(p => ({ ...p, tanggal: e.target.value }))}
                  style={{ width: "100%", padding: "9px 8px", borderRadius: 8, border: "1px solid #e8e8e8", fontSize: 12, fontFamily: "inherit" }} />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <SectionTitle>Items</SectionTitle>
              <button onClick={addFormItem}
                style={{ background: "#f7f5f0", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>+ Tambah</button>
            </div>
            {form.items.map((item, idx) => (
              <div key={item.id} style={{ background: "#f7f5f0", borderRadius: 10, padding: 12, marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#888" }}>Item {idx + 1}</span>
                  {form.items.length > 1 && <button onClick={() => removeFormItem(item.id)}
                    style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontWeight: 700 }}>✕</button>}
                </div>
                <input placeholder="Nama barang" value={item.nama} onChange={e => updateFormItem(item.id, "nama", e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #e0e0e0", fontSize: 12, fontFamily: "inherit", marginBottom: 8, boxSizing: "border-box" }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 9, color: "#888", fontWeight: 600, marginBottom: 4, textTransform: "uppercase" }}>QTY</div>
                    <input type="number" min="1" value={item.qty} onChange={e => updateFormItem(item.id, "qty", parseInt(e.target.value) || 1)}
                      style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e0e0e0", fontSize: 12, fontFamily: "DM Mono, monospace", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: "#888", fontWeight: 600, marginBottom: 4, textTransform: "uppercase" }}>Harga Original</div>
                    <input type="number" value={item.hargaOriginal} onChange={e => updateFormItem(item.id, "hargaOriginal", parseFloat(e.target.value) || 0)}
                      style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e0e0e0", fontSize: 12, fontFamily: "DM Mono, monospace", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: "#888", fontWeight: 600, marginBottom: 4, textTransform: "uppercase" }}>Harga Jastip</div>
                    <input type="number" value={item.hargaJastip} onChange={e => updateFormItem(item.id, "hargaJastip", parseFloat(e.target.value) || 0)}
                      style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e0e0e0", fontSize: 12, fontFamily: "DM Mono, monospace", boxSizing: "border-box" }} />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 9, color: "#888", fontWeight: 600, marginBottom: 4, textTransform: "uppercase" }}>Catatan</div>
                  <input placeholder="Opsional" value={item.catatan} onChange={e => updateFormItem(item.id, "catatan", e.target.value)}
                    style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e0e0e0", fontSize: 12, fontFamily: "inherit", boxSizing: "border-box" }} />
                </div>
              </div>
            ))}
            <button onClick={submitForm}
              style={{ width: "100%", background: "#1a1a2e", color: "#e8c547", border: "none", borderRadius: 10, padding: 14, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginTop: 8 }}>
              Simpan Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// MODULE 3: SHOPPING LIST (PRAMUGARI VIEW)
function ShoppingList({ trips, setTrips }) {
  const [selectedTripId, setSelectedTripId] = useState(trips[0]?.id);
  const [filterPramugari, setFilterPramugari] = useState("all");
  const [bulkMode, setBulkMode]               = useState(false);
  const [bulkData, setBulkData]               = useState({});
  const [showStrukModal, setShowStrukModal]   = useState(null);

  const trip = trips.find(t => t.id === selectedTripId);
  const allItems = useMemo(() =>
    trip?.dates.flatMap(d => d.items.map(i => ({ ...i, dateLabel: d.label, dateId: d.id }))) || [],
    [trip]
  );
  const filteredItems = filterPramugari === "all" ? allItems : allItems.filter(i => i.pramugari === filterPramugari);
  const checkedCount  = filteredItems.filter(i => i.checked).length;

  const toggleCheck = (dateId, itemId) =>
    setTrips(prev => prev.map(t => t.id === trip.id ? {
      ...t, dates: t.dates.map(d => d.id === dateId ? {
        ...d, items: d.items.map(i => i.id === itemId ? { ...i, checked: !i.checked } : i)
      } : d)
    } : t));

  const saveBulk = () => {
    setTrips(prev => prev.map(t => t.id === trip.id ? {
      ...t, dates: t.dates.map(d => ({
        ...d, items: d.items.map(i => {
          const key = `${d.id}-${i.id}`;
          if (!bulkData[key]) return i;
          return {
            ...i,
            hargaSatuan: parseFloat(bulkData[key].hargaSatuan) || i.hargaSatuan,
            pajak:       parseFloat(bulkData[key].pajak)       || i.pajak,
            ekspedisi:   parseFloat(bulkData[key].ekspedisi)   || i.ekspedisi,
          };
        })
      }))
    } : t));
    setBulkMode(false);
    setBulkData({});
  };

  if (!trip) return null;

  return (
    <div style={{ padding: 16 }}>
      {/* Trip selector */}
      <div style={{ marginBottom: 14 }}>
        <SectionTitle>Trip Saya</SectionTitle>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {trips.map(t => (
            <button key={t.id} onClick={() => setSelectedTripId(t.id)}
              style={{ whiteSpace: "nowrap", padding: "7px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit",
                background: selectedTripId === t.id ? "#1a1a2e" : "#fff", color: selectedTripId === t.id ? "#e8c547" : "#666" }}>
              {COUNTRY_FLAG[t.country]} {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Progress */}
      <Card style={{ padding: "12px 14px", marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>Progress Belanja</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#16a34a" }}>{checkedCount}/{filteredItems.length}</div>
        </div>
        <div style={{ background: "#f0f0f0", borderRadius: 20, height: 8, overflow: "hidden" }}>
          <div style={{ background: "#16a34a", height: "100%", width: `${filteredItems.length ? (checkedCount / filteredItems.length) * 100 : 0}%`, borderRadius: 20, transition: "width 0.3s" }} />
        </div>
        <div style={{ fontSize: 10, color: "#888", marginTop: 6 }}>{filteredItems.length - checkedCount} item tersisa</div>
      </Card>

      {/* Filter pramugari + bulk */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["all", ...trip.pramugari].map(p => {
            const c = p === "all" ? null : PRAMUGARI_COLORS[p];
            return (
              <button key={p} onClick={() => setFilterPramugari(p)}
                style={{ padding: "5px 12px", borderRadius: 20, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 11, fontWeight: 600,
                  background: filterPramugari === p ? "#1a1a2e" : "#fff", color: filterPramugari === p ? "#e8c547" : "#666" }}>
                {p === "all" ? "Semua" : c?.label || p}
              </button>
            );
          })}
        </div>
        <button onClick={() => setBulkMode(!bulkMode)}
          style={{ background: bulkMode ? "#e8c547" : "#f7f5f0", color: bulkMode ? "#1a1a2e" : "#666", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          {bulkMode ? "✕ Batal" : "📝 Input Harga"}
        </button>
      </div>

      {/* Items */}
      {trip.dates.map(date => {
        const dateItems = date.items.filter(i => filterPramugari === "all" || i.pramugari === filterPramugari);
        if (dateItems.length === 0) return null;
        return (
          <div key={date.id} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ background: "#1a1a2e", color: "#e8c547", padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700 }}>{date.label}</div>
              <div style={{ fontSize: 11, color: "#888" }}>{trip.currency}</div>
            </div>

            {dateItems.map(item => {
              const pc  = PRAMUGARI_COLORS[item.pramugari] || PRAMUGARI_COLORS.sasa;
              const key = `${date.id}-${item.id}`;
              return (
                <Card key={item.id} style={{ marginBottom: 8, padding: "12px 14px", opacity: item.checked ? 0.7 : 1 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    {/* Checkbox */}
                    <div onClick={() => toggleCheck(date.id, item.id)}
                      style={{ marginTop: 2, width: 22, height: 22, borderRadius: 6, border: `2px solid ${item.checked ? "#16a34a" : "#ccc"}`,
                        background: item.checked ? "#16a34a" : "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", flexShrink: 0, transition: "all 0.2s" }}>
                      {item.checked && <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>✓</span>}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e", textDecoration: item.checked ? "line-through" : "none", lineHeight: 1.3 }}>{item.nama}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                        <span style={{ fontSize: 10, color: "#888" }}>QTY {item.qty}</span>
                        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#ccc", display: "inline-block" }} />
                        <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: pc.bg, color: pc.text, fontWeight: 600 }}>{pc.label}</span>
                        {item.struk && <span style={{ fontSize: 10, color: "#16a34a", fontWeight: 600 }}>📄 Struk</span>}
                      </div>

                      {/* Bulk input */}
                      {bulkMode && (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginTop: 8 }}>
                          {[["Harga", "hargaSatuan"], ["Pajak", "pajak"], ["Ekspedisi", "ekspedisi"]].map(([lbl, fld]) => (
                            <div key={fld}>
                              <div style={{ fontSize: 9, color: "#888", fontWeight: 600, marginBottom: 2, textTransform: "uppercase" }}>{lbl}</div>
                              <input type="number"
                                value={bulkData[key]?.[fld] ?? item[fld]}
                                onChange={e => setBulkData(p => ({ ...p, [key]: { ...p[key], [fld]: e.target.value } }))}
                                style={{ width: "100%", fontSize: 11, border: "1px solid #e8e8e8", borderRadius: 6, padding: "4px 6px", fontFamily: "DM Mono, monospace", boxSizing: "border-box" }} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Struk button */}
                    <button onClick={() => setShowStrukModal({ dateId: date.id, itemId: item.id, items: date.items })}
                      style={{ background: "#f7f5f0", border: "none", borderRadius: 6, padding: "4px 8px", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: "#666", flexShrink: 0 }}>
                      📄
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        );
      })}

      {/* Bulk save */}
      {bulkMode && (
        <button onClick={saveBulk}
          style={{ width: "100%", background: "#1a1a2e", color: "#e8c547", border: "none", borderRadius: 10, padding: 14, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginTop: 8 }}>
          💾 Simpan Semua Harga
        </button>
      )}

      {/* Struk Modal */}
      {showStrukModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: "#fff", borderRadius: "20px 20px 0 0", width: "100%", padding: "20px 16px 32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Upload Struk</div>
              <button onClick={() => setShowStrukModal(null)}
                style={{ background: "#f7f5f0", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>Satu struk bisa untuk beberapa item sekaligus</div>

            <SectionTitle>Pilih Item yang Tercakup</SectionTitle>
            {showStrukModal.items.map(item => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}>
                <input type="checkbox" defaultChecked={item.id === showStrukModal.itemId}
                  style={{ width: 16, height: 16, cursor: "pointer" }} />
                <div style={{ fontSize: 12, color: "#1a1a2e" }}>{item.nama} <span style={{ color: "#888" }}>×{item.qty}</span></div>
              </div>
            ))}

            <div style={{ marginTop: 16, background: "#f7f5f0", borderRadius: 10, padding: "20px", textAlign: "center", border: "2px dashed #ccc", cursor: "pointer" }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>📷</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#666" }}>Tap untuk upload foto struk</div>
            </div>

            <button onClick={() => setShowStrukModal(null)}
              style={{ width: "100%", background: "#1a1a2e", color: "#e8c547", border: "none", borderRadius: 10, padding: 12, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginTop: 12 }}>
              Simpan Struk
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

const TABS = [
  { id: "rekap",    label: "Rekap",    icon: "📊" },
  { id: "request",  label: "Request",  icon: "📋" },
  { id: "shopping", label: "Shopping", icon: "🛍️" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("rekap");
  const [trips, setTrips]         = useState(INIT_TRIPS);

  const PAGE_TITLES = { rekap: "Rekap Keuangan", request: "Request Client", shopping: "Shopping List" };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f7f5f0", minHeight: "100vh", paddingBottom: 70 }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: "#1a1a2e", padding: "20px 24px 16px" }}>
        <div style={{ color: "#e8c547", fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Jastip Admin</div>
        <div style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>{PAGE_TITLES[activeTab]}</div>
      </div>

      {/* Content */}
      {activeTab === "rekap"    && <RekapKeuangan    trips={trips} setTrips={setTrips} />}
      {activeTab === "request"  && <RequestManagement trips={trips} />}
      {activeTab === "shopping" && <ShoppingList      trips={trips} setTrips={setTrips} />}

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #f0f0f0",
        display: "flex", boxShadow: "0 -2px 10px rgba(0,0,0,0.06)", zIndex: 90 }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{ flex: 1, padding: "10px 0 12px", border: "none", background: "none", cursor: "pointer", fontFamily: "inherit",
              borderTop: activeTab === tab.id ? "2px solid #e8c547" : "2px solid transparent" }}>
            <div style={{ fontSize: 20 }}>{tab.icon}</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: activeTab === tab.id ? "#1a1a2e" : "#aaa", marginTop: 2 }}>{tab.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
