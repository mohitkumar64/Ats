function Ticker() {
    const items = [
        "ATS COMPATIBILITY SCAN",
        "KEYWORD DENSITY ANALYSIS",
        "FORMAT STRUCTURE REVIEW",
        "SEMANTIC MATCHING ENGINE",
        "RECRUITER SCORING MODEL",
        "PDF PARSE VALIDATION",
        "SECTION HEADER DETECTION",
        "DATE FORMAT COMPLIANCE",
        "ACTION VERB ANALYSIS",
        "SKILL GAP REPORT",
    ];
    const doubled = [...items, ...items];

    return (
        <div
            className="relative overflow-hidden text-[#2A3444]  py-3 hover:text-white"
            style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
        >
            <div className="flex gap-10 whitespace-nowrap animate-ticker" style={{ width: "max-content" }}>
                {doubled.map((item, i) => (
                    <span key={i} className="flex items-center gap-10">
                        <span
                            style={{

                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "10px",
                                fontWeight: 600,
                                letterSpacing: "0.14em",
                            }}
                        >
                            {item}
                        </span>
                        <span style={{ opacity: 0.25, fontSize: "7px" }}>◆</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

export default Ticker