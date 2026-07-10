import { useMemo, useState } from "react";
import { Search, Shuffle, BookOpen, Globe2 } from "lucide-react";

import { nations } from "./factsNation";

const continents = ["全部", ...new Set(nations.map((nation) => nation.continent))];

function flagUrl(nation) {
  return (
    nation.flagUrl ||
    `https://flagcdn.com/w160/${nation.code.toLowerCase()}.png`
  );
}

export default function Nations() {
  const [nationQuery, setNationQuery] = useState("");
  const [activeContinent, setActiveContinent] = useState("全部");
  const [selectedNation, setSelectedNation] = useState(nations[0]);

  const filteredNations = useMemo(() => {
    return nations.filter((nation) => {
      const matchContinent =
        activeContinent === "全部" || nation.continent === activeContinent;

      const keyword = nationQuery.trim().toLowerCase();

      const searchText = `${nation.name} ${nation.englishName} ${nation.code} ${nation.continent}`.toLowerCase();

      return matchContinent && (!keyword || searchText.includes(keyword));
    });
  }, [nationQuery, activeContinent]);

  function randomNation() {
    const item = nations[Math.floor(Math.random() * nations.length)];
    setSelectedNation(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <section className="hero-content">
        <div>
          <p className="eyebrow">世界国家 · 国旗资料库</p>
          <h1>
            查看世界各国
            <br />
            名字、国旗与基本资料
          </h1>

          <p className="hero-text">
            这里不是冷知识，是另外一个资料栏目：国家名称、英文名、国旗与洲别。
          </p>

          <div className="hero-actions">
            <button onClick={randomNation} className="primary-btn">
              <Shuffle size={18} /> 随机国家
            </button>
          </div>
        </div>

        <div className="today-card">
          <span>国家推荐</span>

          <img
            className="flag-big"
            src={flagUrl(selectedNation)}
            alt={selectedNation.name}
          />

          <h2>{selectedNation.name}</h2>
          <p>{selectedNation.englishName}</p>
          <button>查看资料</button>
        </div>
      </section>

      <main className="main-grid">
        <aside className="sidebar">
          <div className="search-box">
            <Search size={18} />
            <input
              value={nationQuery}
              onChange={(e) => setNationQuery(e.target.value)}
              placeholder="搜索国家、英文名、代码..."
            />
          </div>

          <div className="category-box">
            <h3>
              <Globe2 size={18} /> 洲别
            </h3>

            <div className="category-list">
              {continents.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveContinent(item)}
                  className={activeContinent === item ? "active" : ""}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="stats-box">
            <h3>
              <BookOpen size={18} /> 国家资料
            </h3>

            <p>
              国家总数：<b>{nations.length}</b>
            </p>

            <p>
              目前显示：<b>{filteredNations.length}</b>
            </p>
          </div>
        </aside>

        <section className="content-area">
          {selectedNation && (
            <article className="detail-card">
              <div className="detail-top">
                <img
                  className="flag-detail"
                  src={flagUrl(selectedNation)}
                  alt={selectedNation.name}
                />

                <div>
                  <p className="detail-category">{selectedNation.continent}</p>
                  <h2>{selectedNation.name}</h2>
                </div>
              </div>

              <p className="summary">
                <Globe2 size={18} /> {selectedNation.englishName}
              </p>

              <div className="article-block">
                <h3>国家资料</h3>
                <p>国家代码：{selectedNation.code}</p>
                <p>所属洲：{selectedNation.continent}</p>
              </div>
            </article>
          )}

          <div className="section-title">
            <h2>国家列表</h2>
            <p>点击国家卡片可以查看资料</p>
          </div>

          <div className="cards-grid">
            {filteredNations.map((nation) => (
              <button
                key={nation.id}
                className={`fact-card ${
                  selectedNation?.id === nation.id ? "selected" : ""
                }`}
                onClick={() => setSelectedNation(nation)}
              >
                <img
                  className="flag-card"
                  src={flagUrl(nation)}
                  alt={nation.name}
                />

                <div className="card-meta">
                  {nation.continent} · {nation.code}
                </div>

                <h3>{nation.name}</h3>
                <p>{nation.englishName}</p>
              </button>
            ))}
          </div>

          {filteredNations.length === 0 && (
            <div className="empty">
              找不到相关国家，可以换一个关键词试试看。
            </div>
          )}
        </section>
      </main>
    </>
  );
}