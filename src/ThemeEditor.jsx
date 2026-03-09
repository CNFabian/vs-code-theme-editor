import { useState, useEffect, useCallback, useRef } from "react";

const SAMPLE_CODE = `// Daily Theme Shuffle 🎨
import { useState, useEffect } from "react";

function ThunderBreathing({ speed = "lightning" }) {
  const [power, setPower] = useState(0);
  const MAX_POWER = 9999;

  // First Form: Thunderclap and Flash
  useEffect(() => {
    const interval = setInterval(() => {
      setPower(prev => Math.min(prev + 1, MAX_POWER));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const execute = async (form) => {
    console.log(\`Executing: \${form}\`);
    return { power, speed, form };
  };

  return (
    <div className="breathing-style">
      <h1>Thunder Breathing</h1>
      <span>{power} / {MAX_POWER}</span>
    </div>
  );
}

export default ThunderBreathing;`;

const DEFAULT_THEMES = [
  {
    name: "Zenitsu - Thunder Breathing",
    id: "zenitsu",
    emoji: "⚡",
    colors: {
      "editor.background": "#0d0d0d",
      "editor.foreground": "#f5e6a3",
      "sideBar.background": "#0a0a00",
      "sideBar.foreground": "#d4c46a",
      "activityBar.background": "#050500",
      "activityBar.foreground": "#ffd700",
      "statusBar.background": "#1a1500",
      "statusBar.foreground": "#ffd700",
      "tab.activeBackground": "#1a1500",
      "tab.activeForeground": "#ffd700",
      "tab.inactiveBackground": "#0a0a00",
      "tab.inactiveForeground": "#8a7a30",
      "titleBar.activeBackground": "#0d0d00",
      "titleBar.activeForeground": "#ffd700",
      "editorLineNumber.foreground": "#665e33",
      "editorLineNumber.activeForeground": "#ffd700",
      "focusBorder": "#ffd700",
    },
    tokenColors: {
      comment: "#5a5020",
      string: "#ffcc00",
      keyword: "#ffd700",
      function: "#ffb700",
      variable: "#f5e6a3",
      number: "#ffe44d",
      type: "#ffa500",
      tag: "#ffd700",
      operator: "#8a7a30",
    },
  },
  {
    name: "Akaza - Upper Moon Three",
    id: "akaza",
    emoji: "🌸",
    colors: {
      "editor.background": "#0d0010",
      "editor.foreground": "#e8b4d0",
      "sideBar.background": "#08000d",
      "sideBar.foreground": "#c77daa",
      "activityBar.background": "#05000a",
      "activityBar.foreground": "#ff1493",
      "statusBar.background": "#1a0025",
      "statusBar.foreground": "#ff69b4",
      "tab.activeBackground": "#1a0025",
      "tab.activeForeground": "#ff69b4",
      "tab.inactiveBackground": "#08000d",
      "tab.inactiveForeground": "#6a3060",
      "titleBar.activeBackground": "#0d0015",
      "titleBar.activeForeground": "#ff69b4",
      "editorLineNumber.foreground": "#5a2050",
      "editorLineNumber.activeForeground": "#ff1493",
      "focusBorder": "#ff1493",
    },
    tokenColors: {
      comment: "#4a2045",
      string: "#ff69b4",
      keyword: "#ff1493",
      function: "#ff4da6",
      variable: "#e8b4d0",
      number: "#ff82c0",
      type: "#8b008b",
      tag: "#ff1493",
      operator: "#6a3060",
    },
  },
  {
    name: "Tanjiro - Water Breathing",
    id: "tanjiro",
    emoji: "🌊",
    colors: {
      "editor.background": "#05121a",
      "editor.foreground": "#a8d8ea",
      "sideBar.background": "#03101a",
      "sideBar.foreground": "#7ab8c8",
      "activityBar.background": "#020d14",
      "activityBar.foreground": "#00bcd4",
      "statusBar.background": "#0a2030",
      "statusBar.foreground": "#00bcd4",
      "tab.activeBackground": "#0a1a25",
      "tab.activeForeground": "#00bcd4",
      "tab.inactiveBackground": "#03101a",
      "tab.inactiveForeground": "#3a6a7a",
      "titleBar.activeBackground": "#05121a",
      "titleBar.activeForeground": "#00bcd4",
      "editorLineNumber.foreground": "#2a5a6a",
      "editorLineNumber.activeForeground": "#00bcd4",
      "focusBorder": "#00bcd4",
    },
    tokenColors: {
      comment: "#2a5a6a",
      string: "#4db6ac",
      keyword: "#00bcd4",
      function: "#26c6da",
      variable: "#a8d8ea",
      number: "#80deea",
      type: "#4a8a6a",
      tag: "#00bcd4",
      operator: "#3a6a7a",
    },
  },
  {
    name: "Sukuna - King of Curses",
    id: "sukuna",
    emoji: "👹",
    colors: {
      "editor.background": "#0a0005",
      "editor.foreground": "#e0b0b0",
      "sideBar.background": "#070003",
      "sideBar.foreground": "#b06060",
      "activityBar.background": "#050002",
      "activityBar.foreground": "#dc143c",
      "statusBar.background": "#150010",
      "statusBar.foreground": "#dc143c",
      "tab.activeBackground": "#150010",
      "tab.activeForeground": "#dc143c",
      "tab.inactiveBackground": "#070003",
      "tab.inactiveForeground": "#5a2030",
      "titleBar.activeBackground": "#0a0005",
      "titleBar.activeForeground": "#dc143c",
      "editorLineNumber.foreground": "#5a1525",
      "editorLineNumber.activeForeground": "#dc143c",
      "focusBorder": "#dc143c",
    },
    tokenColors: {
      comment: "#8b4a5e",
      string: "#cd5c5c",
      keyword: "#dc143c",
      function: "#e04040",
      variable: "#e0b0b0",
      number: "#c9a000",
      type: "#6a0dad",
      tag: "#dc143c",
      operator: "#5a2030",
    },
  },
  {
    name: "Gojo - Infinite Void",
    id: "gojo",
    emoji: "👁️",
    colors: {
      "editor.background": "#080818",
      "editor.foreground": "#d0e8ff",
      "sideBar.background": "#060614",
      "sideBar.foreground": "#8aacdd",
      "activityBar.background": "#040410",
      "activityBar.foreground": "#7df9ff",
      "statusBar.background": "#0e0e2a",
      "statusBar.foreground": "#7df9ff",
      "tab.activeBackground": "#0e1028",
      "tab.activeForeground": "#7df9ff",
      "tab.inactiveBackground": "#060614",
      "tab.inactiveForeground": "#3a5a8a",
      "titleBar.activeBackground": "#080818",
      "titleBar.activeForeground": "#7df9ff",
      "editorLineNumber.foreground": "#3a4a8a",
      "editorLineNumber.activeForeground": "#7df9ff",
      "focusBorder": "#7df9ff",
    },
    tokenColors: {
      comment: "#3a4a7a",
      string: "#87ceeb",
      keyword: "#7df9ff",
      function: "#5dade2",
      variable: "#d0e8ff",
      number: "#b0e0ff",
      type: "#9370db",
      tag: "#7df9ff",
      operator: "#3a5a8a",
    },
  },
  {
    name: "Resident Evil - Biohazard",
    id: "resident-evil",
    emoji: "☣️",
    colors: {
      "editor.background": "#0a0d08",
      "editor.foreground": "#b0c4a0",
      "sideBar.background": "#070a05",
      "sideBar.foreground": "#7a9a68",
      "activityBar.background": "#050804",
      "activityBar.foreground": "#8b0000",
      "statusBar.background": "#0d120a",
      "statusBar.foreground": "#8b0000",
      "tab.activeBackground": "#121810",
      "tab.activeForeground": "#cc0000",
      "tab.inactiveBackground": "#070a05",
      "tab.inactiveForeground": "#4a6a3a",
      "titleBar.activeBackground": "#0a0d08",
      "titleBar.activeForeground": "#8b0000",
      "editorLineNumber.foreground": "#3a5030",
      "editorLineNumber.activeForeground": "#8b0000",
      "focusBorder": "#8b0000",
    },
    tokenColors: {
      comment: "#3a5030",
      string: "#6b8e23",
      keyword: "#8b0000",
      function: "#a0c060",
      variable: "#b0c4a0",
      number: "#9acd32",
      type: "#556b2f",
      tag: "#8b0000",
      operator: "#4a6a3a",
    },
  },
  {
    name: "Mario - Mushroom Kingdom",
    id: "mario",
    emoji: "🍄",
    colors: {
      "editor.background": "#0f1533",
      "editor.foreground": "#e8dcc8",
      "sideBar.background": "#0a1028",
      "sideBar.foreground": "#a0b0d0",
      "activityBar.background": "#080d20",
      "activityBar.foreground": "#e52521",
      "statusBar.background": "#049cd8",
      "statusBar.foreground": "#ffffff",
      "tab.activeBackground": "#141a40",
      "tab.activeForeground": "#fbd000",
      "tab.inactiveBackground": "#0a1028",
      "tab.inactiveForeground": "#4a5a8a",
      "titleBar.activeBackground": "#0f1533",
      "titleBar.activeForeground": "#e52521",
      "editorLineNumber.foreground": "#3a4a7a",
      "editorLineNumber.activeForeground": "#fbd000",
      "focusBorder": "#e52521",
    },
    tokenColors: {
      comment: "#3a5a6a",
      string: "#43b047",
      keyword: "#e52521",
      function: "#049cd8",
      variable: "#e8dcc8",
      number: "#fbd000",
      type: "#e52521",
      tag: "#e52521",
      operator: "#5a6a9a",
    },
  },
  {
    name: "Luigi's Mansion - Ghostly",
    id: "luigis-mansion",
    emoji: "👻",
    colors: {
      "editor.background": "#0a0d18",
      "editor.foreground": "#c8b8e8",
      "sideBar.background": "#070a14",
      "sideBar.foreground": "#9080b8",
      "activityBar.background": "#050810",
      "activityBar.foreground": "#7cfc00",
      "statusBar.background": "#0f1025",
      "statusBar.foreground": "#7cfc00",
      "tab.activeBackground": "#0f1222",
      "tab.activeForeground": "#7cfc00",
      "tab.inactiveBackground": "#070a14",
      "tab.inactiveForeground": "#4a4a6a",
      "titleBar.activeBackground": "#0a0d18",
      "titleBar.activeForeground": "#7cfc00",
      "editorLineNumber.foreground": "#4a3a6a",
      "editorLineNumber.activeForeground": "#7cfc00",
      "focusBorder": "#7cfc00",
    },
    tokenColors: {
      comment: "#4a3a6a",
      string: "#98fb98",
      keyword: "#7cfc00",
      function: "#66ff66",
      variable: "#c8b8e8",
      number: "#adff2f",
      type: "#8a2be2",
      tag: "#7cfc00",
      operator: "#4a4a6a",
    },
  },
  {
    name: "Bowser's Castle - Lava",
    id: "bowsers-castle",
    emoji: "🔥",
    colors: {
      "editor.background": "#100800",
      "editor.foreground": "#e8c8a0",
      "sideBar.background": "#0c0600",
      "sideBar.foreground": "#b08860",
      "activityBar.background": "#0a0500",
      "activityBar.foreground": "#ff4500",
      "statusBar.background": "#1a0e05",
      "statusBar.foreground": "#ff6600",
      "tab.activeBackground": "#1a0e05",
      "tab.activeForeground": "#ff4500",
      "tab.inactiveBackground": "#0c0600",
      "tab.inactiveForeground": "#6a4a28",
      "titleBar.activeBackground": "#100800",
      "titleBar.activeForeground": "#ff4500",
      "editorLineNumber.foreground": "#5a3a20",
      "editorLineNumber.activeForeground": "#ff4500",
      "focusBorder": "#ff4500",
    },
    tokenColors: {
      comment: "#5a3a20",
      string: "#daa520",
      keyword: "#ff4500",
      function: "#ff7f24",
      variable: "#e8c8a0",
      number: "#ffae42",
      type: "#b8860b",
      tag: "#ff4500",
      operator: "#6a4a28",
    },
  },
  {
    name: "SpongeBob - Bikini Bottom",
    id: "spongebob",
    emoji: "🧽",
    colors: {
      "editor.background": "#0a1a2e",
      "editor.foreground": "#f5e663",
      "sideBar.background": "#081525",
      "sideBar.foreground": "#c4b840",
      "activityBar.background": "#061020",
      "activityBar.foreground": "#ffe135",
      "statusBar.background": "#1e90ff",
      "statusBar.foreground": "#ffffff",
      "tab.activeBackground": "#0f2038",
      "tab.activeForeground": "#ffe135",
      "tab.inactiveBackground": "#081525",
      "tab.inactiveForeground": "#3a6a8a",
      "titleBar.activeBackground": "#0a1a2e",
      "titleBar.activeForeground": "#ffe135",
      "editorLineNumber.foreground": "#2a5a7a",
      "editorLineNumber.activeForeground": "#ffe135",
      "focusBorder": "#ffe135",
    },
    tokenColors: {
      comment: "#2a5a7a",
      string: "#f4a460",
      keyword: "#ffe135",
      function: "#1e90ff",
      variable: "#f5e663",
      number: "#ff69b4",
      type: "#ff69b4",
      tag: "#ffe135",
      operator: "#3a6a8a",
    },
  },
  {
    name: "Bikini Bottom Night",
    id: "bikini-bottom-night",
    emoji: "🌙",
    colors: {
      "editor.background": "#040d18",
      "editor.foreground": "#88c8d8",
      "sideBar.background": "#030a14",
      "sideBar.foreground": "#5a98a8",
      "activityBar.background": "#020810",
      "activityBar.foreground": "#00ff7f",
      "statusBar.background": "#061020",
      "statusBar.foreground": "#00ff7f",
      "tab.activeBackground": "#081420",
      "tab.activeForeground": "#00ff7f",
      "tab.inactiveBackground": "#030a14",
      "tab.inactiveForeground": "#2a4a6a",
      "titleBar.activeBackground": "#040d18",
      "titleBar.activeForeground": "#00ff7f",
      "editorLineNumber.foreground": "#1a3a5a",
      "editorLineNumber.activeForeground": "#00ff7f",
      "focusBorder": "#00ff7f",
    },
    tokenColors: {
      comment: "#1a3a5a",
      string: "#48d1cc",
      keyword: "#00ff7f",
      function: "#00fa9a",
      variable: "#88c8d8",
      number: "#40e0d0",
      type: "#7b68ee",
      tag: "#00ff7f",
      operator: "#2a4a6a",
    },
  },
  {
    name: "Demon Slayer - Muzan",
    id: "muzan",
    emoji: "🌑",
    colors: {
      "editor.background": "#08080c",
      "editor.foreground": "#d8d0e0",
      "sideBar.background": "#05050a",
      "sideBar.foreground": "#9080a0",
      "activityBar.background": "#030308",
      "activityBar.foreground": "#ffffff",
      "statusBar.background": "#0e0810",
      "statusBar.foreground": "#d0c0e0",
      "tab.activeBackground": "#0e0e14",
      "tab.activeForeground": "#ffffff",
      "tab.inactiveBackground": "#05050a",
      "tab.inactiveForeground": "#4a4050",
      "titleBar.activeBackground": "#08080c",
      "titleBar.activeForeground": "#ffffff",
      "editorLineNumber.foreground": "#3a3040",
      "editorLineNumber.activeForeground": "#ffffff",
      "focusBorder": "#8b0000",
    },
    tokenColors: {
      comment: "#3a3040",
      string: "#c0a0c8",
      keyword: "#ffffff",
      function: "#e0d0f0",
      variable: "#d8d0e0",
      number: "#e8d8f0",
      type: "#8b0000",
      tag: "#ffffff",
      operator: "#4a4050",
    },
  },
];

// Syntax highlighter
function highlightCode(code, tokenColors) {
  const escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  let result = escaped;

  const rules = [
    { regex: /(\/\/.*)/gm, color: tokenColors.comment },
    { regex: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, color: tokenColors.string },
    { regex: /\b(import|export|from|default|return|const|let|var|function|class|async|await|new|if|else|switch|case|break|for|while|do|try|catch|finally|throw|typeof|instanceof|in|of|void|delete|yield)\b/g, color: tokenColors.keyword },
    { regex: /\b(\d+\.?\d*)\b/g, color: tokenColors.number },
    { regex: /\b([A-Z][a-zA-Z0-9]*)\b/g, color: tokenColors.type },
    { regex: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, color: tokenColors.function },
  ];

  // Build spans with priority (later rules can't override earlier)
  const chars = [...result];
  const colorMap = new Array(result.length).fill(null);

  for (const rule of rules) {
    let match;
    const r = new RegExp(rule.regex.source, rule.regex.flags);
    while ((match = r.exec(result)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      for (let i = start; i < end && i < colorMap.length; i++) {
        if (colorMap[i] === null) colorMap[i] = rule.color;
      }
    }
  }

  let html = "";
  let currentColor = null;
  for (let i = 0; i < result.length; i++) {
    const c = colorMap[i];
    if (c !== currentColor) {
      if (currentColor !== null) html += "</span>";
      if (c !== null) html += `<span style="color:${c}">`;
      currentColor = c;
    }
    html += result[i];
  }
  if (currentColor !== null) html += "</span>";

  return html;
}

function ColorInput({ label, value, onChange }) {
  const id = label.replace(/[.\s]/g, "-");
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: 28, height: 28, border: "none", background: "none", cursor: "pointer", padding: 0 }}
      />
      <label style={{ fontSize: 11, color: "#999", fontFamily: "'JetBrains Mono', monospace", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {label}
      </label>
      <span style={{ fontSize: 10, color: "#666", fontFamily: "monospace" }}>{value}</span>
    </div>
  );
}

export default function ThemeEditor() {
  const [themes, setThemes] = useState(DEFAULT_THEMES);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [editingName, setEditingName] = useState(false);
  const [tab, setTab] = useState("ui");
  const [notification, setNotification] = useState(null);
  const nameRef = useRef(null);

  const theme = themes[selectedIdx];

  const notify = useCallback((msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  }, []);

  const updateColor = useCallback((key, value) => {
    setThemes((prev) => {
      const next = [...prev];
      next[selectedIdx] = {
        ...next[selectedIdx],
        colors: { ...next[selectedIdx].colors, [key]: value },
      };
      return next;
    });
  }, [selectedIdx]);

  const updateToken = useCallback((key, value) => {
    setThemes((prev) => {
      const next = [...prev];
      next[selectedIdx] = {
        ...next[selectedIdx],
        tokenColors: { ...next[selectedIdx].tokenColors, [key]: value },
      };
      return next;
    });
  }, [selectedIdx]);

  const addTheme = () => {
    const newTheme = {
      name: "New Theme",
      id: `custom-${Date.now()}`,
      emoji: "🎨",
      colors: { ...themes[0].colors },
      tokenColors: { ...themes[0].tokenColors },
    };
    setThemes((prev) => [...prev, newTheme]);
    setSelectedIdx(themes.length);
    notify("New theme created!");
  };

  const duplicateTheme = () => {
    const dupe = {
      ...JSON.parse(JSON.stringify(theme)),
      name: theme.name + " (Copy)",
      id: `${theme.id}-copy-${Date.now()}`,
    };
    setThemes((prev) => [...prev, dupe]);
    setSelectedIdx(themes.length);
    notify("Theme duplicated!");
  };

  const deleteTheme = () => {
    if (themes.length <= 1) return;
    setThemes((prev) => prev.filter((_, i) => i !== selectedIdx));
    setSelectedIdx(Math.max(0, selectedIdx - 1));
    notify("Theme deleted");
  };

  const exportTheme = () => {
    const t = theme;
    const vsTheme = {
      name: t.name,
      type: "dark",
      colors: { ...t.colors, "editor.selectionBackground": t.colors["activityBar.foreground"] + "44", "editor.lineHighlightBackground": t.colors["sideBar.background"] },
      tokenColors: [
        { scope: "comment", settings: { foreground: t.tokenColors.comment, fontStyle: "italic" } },
        { scope: "string", settings: { foreground: t.tokenColors.string } },
        { scope: ["keyword", "keyword.control"], settings: { foreground: t.tokenColors.keyword, fontStyle: "bold" } },
        { scope: ["constant.numeric"], settings: { foreground: t.tokenColors.number } },
        { scope: ["variable"], settings: { foreground: t.tokenColors.variable } },
        { scope: ["entity.name.function", "support.function"], settings: { foreground: t.tokenColors.function } },
        { scope: ["entity.name.type", "support.type"], settings: { foreground: t.tokenColors.type } },
        { scope: ["entity.name.tag"], settings: { foreground: t.tokenColors.tag } },
        { scope: ["punctuation", "meta.brace"], settings: { foreground: t.tokenColors.operator } },
        { scope: ["storage.type", "storage.modifier"], settings: { foreground: t.tokenColors.keyword } },
      ],
    };
    const blob = new Blob([JSON.stringify(vsTheme, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${t.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    notify(`Exported ${t.name}!`);
  };

  const exportAll = () => {
    themes.forEach((t, i) => {
      setTimeout(() => {
        const vsTheme = {
          name: t.name, type: "dark",
          colors: { ...t.colors, "editor.selectionBackground": t.colors["activityBar.foreground"] + "44", "editor.lineHighlightBackground": t.colors["sideBar.background"] },
          tokenColors: [
            { scope: "comment", settings: { foreground: t.tokenColors.comment, fontStyle: "italic" } },
            { scope: "string", settings: { foreground: t.tokenColors.string } },
            { scope: ["keyword", "keyword.control"], settings: { foreground: t.tokenColors.keyword, fontStyle: "bold" } },
            { scope: ["constant.numeric"], settings: { foreground: t.tokenColors.number } },
            { scope: ["variable"], settings: { foreground: t.tokenColors.variable } },
            { scope: ["entity.name.function", "support.function"], settings: { foreground: t.tokenColors.function } },
            { scope: ["entity.name.type", "support.type"], settings: { foreground: t.tokenColors.type } },
            { scope: ["entity.name.tag"], settings: { foreground: t.tokenColors.tag } },
            { scope: ["punctuation", "meta.brace"], settings: { foreground: t.tokenColors.operator } },
          ],
        };
        const blob = new Blob([JSON.stringify(vsTheme, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${t.id}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }, i * 200);
    });
    notify(`Exporting all ${themes.length} themes!`);
  };

  useEffect(() => {
    if (editingName && nameRef.current) nameRef.current.focus();
  }, [editingName]);

  const lines = SAMPLE_CODE.split("\n");
  const highlighted = highlightCode(SAMPLE_CODE, theme.tokenColors);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#111", color: "#ccc", overflow: "hidden" }}>

      {/* NOTIFICATION */}
      {notification && (
        <div style={{
          position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 999,
          background: "#222", border: "1px solid #444", borderRadius: 8, padding: "10px 24px",
          fontSize: 13, color: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          animation: "fadeIn 0.2s ease",
        }}>
          {notification}
        </div>
      )}

      {/* LEFT - THEME LIST */}
      <div style={{ width: 240, background: "#0a0a0a", borderRight: "1px solid #222", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "16px 14px 10px", borderBottom: "1px solid #1a1a1a" }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>Theme Collection</h2>
          <p style={{ margin: "4px 0 0", fontSize: 11, color: "#666" }}>{themes.length} themes in rotation</p>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "6px 8px" }}>
          {themes.map((t, i) => (
            <button
              key={t.id + i}
              onClick={() => setSelectedIdx(i)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 8,
                padding: "8px 10px", marginBottom: 2, border: "none", borderRadius: 6, cursor: "pointer",
                background: i === selectedIdx ? t.colors["activityBar.foreground"] + "18" : "transparent",
                borderLeft: i === selectedIdx ? `3px solid ${t.colors["activityBar.foreground"]}` : "3px solid transparent",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 16 }}>{t.emoji}</span>
              <div style={{ textAlign: "left", minWidth: 0 }}>
                <div style={{
                  fontSize: 12, fontWeight: i === selectedIdx ? 600 : 400,
                  color: i === selectedIdx ? "#fff" : "#888",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>{t.name}</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 3 }}>
                {["editor.background", "activityBar.foreground", "statusBar.background"].map((k) => (
                  <div key={k} style={{ width: 8, height: 8, borderRadius: "50%", background: t.colors[k], border: "1px solid #333" }} />
                ))}
              </div>
            </button>
          ))}
        </div>

        <div style={{ padding: "8px 10px", borderTop: "1px solid #1a1a1a", display: "flex", gap: 6 }}>
          <button onClick={addTheme} style={{ flex: 1, padding: "7px 0", background: "#1a1a1a", border: "1px solid #333", borderRadius: 6, color: "#aaa", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>
            + New
          </button>
          <button onClick={duplicateTheme} style={{ flex: 1, padding: "7px 0", background: "#1a1a1a", border: "1px solid #333", borderRadius: 6, color: "#aaa", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>
            Duplicate
          </button>
          <button onClick={deleteTheme} style={{ padding: "7px 10px", background: "#1a1a1a", border: "1px solid #333", borderRadius: 6, color: "#666", fontSize: 11, cursor: "pointer" }}>
            🗑
          </button>
        </div>
      </div>

      {/* CENTER - LIVE PREVIEW */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Fake VS Code title bar */}
        <div style={{
          background: theme.colors["titleBar.activeBackground"],
          color: theme.colors["titleBar.activeForeground"],
          padding: "6px 16px", fontSize: 12, fontWeight: 500,
          display: "flex", alignItems: "center", justifyContent: "center",
          borderBottom: `1px solid ${theme.colors["focusBorder"]}22`,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          {editingName ? (
            <input
              ref={nameRef}
              value={theme.name}
              onChange={(e) => setThemes(prev => { const n = [...prev]; n[selectedIdx] = { ...n[selectedIdx], name: e.target.value }; return n; })}
              onBlur={() => setEditingName(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditingName(false)}
              style={{ background: "transparent", border: "none", borderBottom: `1px solid ${theme.colors["focusBorder"]}`, color: "inherit", fontSize: 12, textAlign: "center", outline: "none", fontFamily: "inherit", width: 300 }}
            />
          ) : (
            <span onClick={() => setEditingName(true)} style={{ cursor: "pointer" }}>
              {theme.emoji} {theme.name} <span style={{ fontSize: 10, opacity: 0.5, marginLeft: 6 }}>click to rename</span>
            </span>
          )}
        </div>

        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

          {/* Fake activity bar */}
          <div style={{ width: 42, background: theme.colors["activityBar.background"], display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 8, gap: 14, flexShrink: 0 }}>
            {["📁", "🔍", "🔀", "🐛", "🧩"].map((icon, i) => (
              <div key={i} style={{
                fontSize: 16, opacity: i === 0 ? 1 : 0.4, cursor: "pointer",
                color: theme.colors["activityBar.foreground"],
                borderLeft: i === 0 ? `2px solid ${theme.colors["activityBar.foreground"]}` : "2px solid transparent",
                paddingLeft: 10, width: "100%", textAlign: "center",
              }}>{icon}</div>
            ))}
          </div>

          {/* Fake sidebar */}
          <div style={{ width: 180, background: theme.colors["sideBar.background"], color: theme.colors["sideBar.foreground"], fontSize: 12, padding: "10px 0", flexShrink: 0, borderRight: `1px solid ${theme.colors["editor.background"]}` }}>
            <div style={{ padding: "0 12px 8px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.7 }}>Explorer</div>
            {["src", "  components", "    ThemeEditor.jsx", "    Preview.jsx", "  utils", "    colors.ts", "  App.tsx", "package.json", "README.md"].map((f, i) => (
              <div key={i} style={{
                padding: "2px 12px", fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                paddingLeft: f.startsWith("    ") ? 36 : f.startsWith("  ") ? 24 : 12,
                background: i === 2 ? theme.colors["activityBar.foreground"] + "15" : "transparent",
                color: i === 2 ? theme.colors["activityBar.foreground"] : "inherit",
                cursor: "pointer",
              }}>{f.trim()}</div>
            ))}
          </div>

          {/* Editor area */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

            {/* Tabs */}
            <div style={{ display: "flex", background: theme.colors["tab.inactiveBackground"], borderBottom: `1px solid ${theme.colors["editor.background"]}` }}>
              <div style={{ padding: "6px 16px", fontSize: 12, background: theme.colors["tab.activeBackground"], color: theme.colors["tab.activeForeground"], fontFamily: "'JetBrains Mono', monospace", borderBottom: `2px solid ${theme.colors["focusBorder"]}` }}>
                ThemeEditor.jsx
              </div>
              <div style={{ padding: "6px 16px", fontSize: 12, color: theme.colors["tab.inactiveForeground"], fontFamily: "'JetBrains Mono', monospace" }}>
                Preview.jsx
              </div>
            </div>

            {/* Code editor */}
            <div style={{ flex: 1, background: theme.colors["editor.background"], overflow: "auto", display: "flex" }}>
              {/* Line numbers */}
              <div style={{ padding: "10px 0", textAlign: "right", paddingRight: 12, paddingLeft: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, lineHeight: "20px", color: theme.colors["editorLineNumber.foreground"], userSelect: "none", flexShrink: 0 }}>
                {lines.map((_, i) => (
                  <div key={i} style={{ color: i === 5 ? theme.colors["editorLineNumber.activeForeground"] : undefined }}>
                    {i + 1}
                  </div>
                ))}
              </div>
              {/* Code */}
              <pre style={{
                flex: 1, margin: 0, padding: "10px 16px", fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12.5, lineHeight: "20px", color: theme.colors["editor.foreground"],
                overflow: "auto", whiteSpace: "pre",
              }} dangerouslySetInnerHTML={{ __html: highlighted }} />
            </div>

            {/* Status bar */}
            <div style={{
              background: theme.colors["statusBar.background"], color: theme.colors["statusBar.foreground"],
              padding: "3px 12px", fontSize: 11, display: "flex", justifyContent: "space-between",
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              <span>🎨 Daily Theme Shuffle</span>
              <span>Ln 6, Col 28 · UTF-8 · JSX</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT - COLOR EDITOR */}
      <div style={{ width: 280, background: "#0a0a0a", borderLeft: "1px solid #222", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "12px 14px", borderBottom: "1px solid #1a1a1a" }}>
          <div style={{ display: "flex", gap: 0 }}>
            {["ui", "syntax"].map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1, padding: "7px 0", border: "none", borderRadius: 0, cursor: "pointer",
                background: tab === t ? "#1a1a1a" : "transparent",
                color: tab === t ? "#fff" : "#666",
                fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em",
                borderBottom: tab === t ? `2px solid ${theme.colors["focusBorder"]}` : "2px solid transparent",
              }}>{t === "ui" ? "UI Colors" : "Syntax"}</button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "10px 14px" }}>
          {tab === "ui" ? (
            <>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Editor</div>
              <ColorInput label="Background" value={theme.colors["editor.background"]} onChange={(v) => updateColor("editor.background", v)} />
              <ColorInput label="Foreground" value={theme.colors["editor.foreground"]} onChange={(v) => updateColor("editor.foreground", v)} />
              <ColorInput label="Line Numbers" value={theme.colors["editorLineNumber.foreground"]} onChange={(v) => updateColor("editorLineNumber.foreground", v)} />
              <ColorInput label="Active Line #" value={theme.colors["editorLineNumber.activeForeground"]} onChange={(v) => updateColor("editorLineNumber.activeForeground", v)} />

              <div style={{ fontSize: 10, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, marginTop: 16 }}>Sidebar</div>
              <ColorInput label="Background" value={theme.colors["sideBar.background"]} onChange={(v) => updateColor("sideBar.background", v)} />
              <ColorInput label="Foreground" value={theme.colors["sideBar.foreground"]} onChange={(v) => updateColor("sideBar.foreground", v)} />

              <div style={{ fontSize: 10, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, marginTop: 16 }}>Activity Bar</div>
              <ColorInput label="Background" value={theme.colors["activityBar.background"]} onChange={(v) => updateColor("activityBar.background", v)} />
              <ColorInput label="Foreground" value={theme.colors["activityBar.foreground"]} onChange={(v) => updateColor("activityBar.foreground", v)} />

              <div style={{ fontSize: 10, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, marginTop: 16 }}>Title Bar</div>
              <ColorInput label="Background" value={theme.colors["titleBar.activeBackground"]} onChange={(v) => updateColor("titleBar.activeBackground", v)} />
              <ColorInput label="Foreground" value={theme.colors["titleBar.activeForeground"]} onChange={(v) => updateColor("titleBar.activeForeground", v)} />

              <div style={{ fontSize: 10, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, marginTop: 16 }}>Status Bar</div>
              <ColorInput label="Background" value={theme.colors["statusBar.background"]} onChange={(v) => updateColor("statusBar.background", v)} />
              <ColorInput label="Foreground" value={theme.colors["statusBar.foreground"]} onChange={(v) => updateColor("statusBar.foreground", v)} />

              <div style={{ fontSize: 10, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, marginTop: 16 }}>Tabs</div>
              <ColorInput label="Active BG" value={theme.colors["tab.activeBackground"]} onChange={(v) => updateColor("tab.activeBackground", v)} />
              <ColorInput label="Active FG" value={theme.colors["tab.activeForeground"]} onChange={(v) => updateColor("tab.activeForeground", v)} />
              <ColorInput label="Inactive BG" value={theme.colors["tab.inactiveBackground"]} onChange={(v) => updateColor("tab.inactiveBackground", v)} />
              <ColorInput label="Inactive FG" value={theme.colors["tab.inactiveForeground"]} onChange={(v) => updateColor("tab.inactiveForeground", v)} />

              <div style={{ fontSize: 10, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, marginTop: 16 }}>Accent</div>
              <ColorInput label="Focus Border" value={theme.colors["focusBorder"]} onChange={(v) => updateColor("focusBorder", v)} />
            </>
          ) : (
            <>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Token Colors</div>
              {Object.entries(theme.tokenColors).map(([key, val]) => (
                <ColorInput key={key} label={key} value={val} onChange={(v) => updateToken(key, v)} />
              ))}
            </>
          )}
        </div>

        {/* Export buttons */}
        <div style={{ padding: "10px 14px", borderTop: "1px solid #1a1a1a", display: "flex", flexDirection: "column", gap: 6 }}>
          <button onClick={exportTheme} style={{
            padding: "9px 0", background: theme.colors["activityBar.foreground"] || "#fff", color: theme.colors["activityBar.background"] || "#000",
            border: "none", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer",
            letterSpacing: "0.02em",
          }}>
            Export This Theme
          </button>
          <button onClick={exportAll} style={{
            padding: "9px 0", background: "#1a1a1a", border: "1px solid #333",
            borderRadius: 6, color: "#aaa", fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>
            Export All ({themes.length}) Themes
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateX(-50%) translateY(-8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #555; }
      `}</style>
    </div>
  );
}
