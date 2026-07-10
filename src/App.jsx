import { useState } from "react";
import {
  Sparkles,
  Lightbulb,
  Globe2,
  Landmark,
  Gamepad2,
} from "lucide-react";

import Facts from "./Facts.jsx";
import Nations from "./Nations.jsx";
import History from "./History.jsx";
import Game from "./Game.jsx";

import "./style.css";

export default function App() {
  const [page, setPage] = useState("facts");

  const pages = [
    {
      id: "facts",
      label: "冷知识",
      icon: <Lightbulb size={18} />,
    },
    {
      id: "nations",
      label: "国家",
      icon: <Globe2 size={18} />,
    },
    {
      id: "history",
      label: "历史",
      icon: <Landmark size={18} />,
    },
    {
      id: "game",
      label: "游戏",
      icon: <Gamepad2 size={18} />,
    },
  ];

  return (
    <div className="app">
      <header className="hero">
        <nav className="nav">
          <div className="logo">
            <Sparkles size={26} /> 冷知识百科
          </div>

          <div className="hero-actions">
            {pages.map((item) => (
              <button
                key={item.id}
                className={page === item.id ? "primary-btn" : "secondary-btn"}
                onClick={() => setPage(item.id)}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {page === "facts" && <Facts />}
      {page === "nations" && <Nations />}
      {page === "history" && <History />}
      {page === "game" && <Game />}
    </div>
  );
}