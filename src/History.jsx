import { useMemo, useState } from "react";
import { Search, Shuffle, BookOpen, Landmark, Clock3 } from "lucide-react";

import { historyWorld } from "./history";

const historyCategories = [
  "全部",
  ...new Set(historyWorld.map((item) => item.category)),
];

export default function History() {
  const [historyQuery, setHistoryQuery] = useState("");
  const [activeHistoryCategory, setActiveHistoryCategory] = useState("全部");
  const [selectedHistory, setSelectedHistory] = useState(historyWorld[0]);

  const filteredHistory = useMemo(() => {
    return historyWorld.filter((item) => {
      const matchCategory =
        activeHistoryCategory === "全部" ||
        item.category === activeHistoryCategory;

      const keyword = historyQuery.trim().toLowerCase();

      const timelineText = item.timeline
        .map((t) => `${t.year} ${t.event}`)
        .join(" ");

      const searchText =
        `${item.title} ${item.period} ${item.region} ${item.category} ${item.summary} ${item.story} ${item.impact} ${timelineText}`.toLowerCase();

      return matchCategory && (!keyword || searchText.includes(keyword));
    });
  }, [historyQuery, activeHistoryCategory]);

  function randomHistory() {
    const item = historyWorld[Math.floor(Math.random() * historyWorld.length)];
    setSelectedHistory(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <section className="hero-content">
        <div>
          <p className="eyebrow">世界历史 · 华文故事版</p>
          <h1>
            用时间线
            <br />
            看懂世界历史故事
          </h1>

          <p className="hero-text">
            从农业革命、古文明、帝国、战争、革命到现代世界，每篇都有完整故事与时间线。
          </p>

          <div className="hero-actions">
            <button onClick={randomHistory} className="primary-btn">
              <Shuffle size={18} /> 随机历史
            </button>
          </div>
        </div>

        <div className="today-card">
          <span>历史推荐</span>
          <div className="big-icon">🏛️</div>
          <h2>{selectedHistory.title}</h2>
          <p>{selectedHistory.summary}</p>
          <button>查看故事</button>
        </div>
      </section>

      <main className="main-grid">
        <aside className="sidebar">
          <div className="search-box">
            <Search size={18} />
            <input
              value={historyQuery}
              onChange={(e) => setHistoryQuery(e.target.value)}
              placeholder="搜索历史、事件、地区、时间..."
            />
          </div>

          <div className="category-box">
            <h3>
              <Landmark size={18} /> 历史分类
            </h3>

            <div className="category-list">
              {historyCategories.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveHistoryCategory(item)}
                  className={activeHistoryCategory === item ? "active" : ""}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="stats-box">
            <h3>
              <BookOpen size={18} /> 历史资料
            </h3>

            <p>
              历史主题：<b>{historyWorld.length}</b>
            </p>

            <p>
              目前显示：<b>{filteredHistory.length}</b>
            </p>
          </div>
        </aside>

        <section className="content-area">
          {selectedHistory && (
            <article className="detail-card">
              <div className="detail-top">
                <div className="detail-icon">🏛️</div>

                <div>
                  <p className="detail-category">
                    {selectedHistory.category} · {selectedHistory.region}
                  </p>
                  <h2>{selectedHistory.title}</h2>
                </div>
              </div>

              <p className="summary">
                <Clock3 size={18} /> {selectedHistory.period}
              </p>

              <div className="article-block">
                <h3>历史简介</h3>
                <p>{selectedHistory.summary}</p>
              </div>

              <div className="article-block">
                <h3>完整故事</h3>
                <p>{selectedHistory.story}</p>
              </div>

              <div className="article-block highlight">
                <h3>时间线</h3>
                {selectedHistory.timeline.map((item, index) => (
                  <p key={index}>
                    <b>{item.year}</b>：{item.event}
                  </p>
                ))}
              </div>

              <div className="article-block">
                <h3>历史影响</h3>
                <p>{selectedHistory.impact}</p>
              </div>
            </article>
          )}

          <div className="section-title">
            <h2>世界历史列表</h2>
            <p>点击历史卡片可以阅读完整故事</p>
          </div>

          <div className="cards-grid">
            {filteredHistory.map((item) => (
              <button
                key={item.id}
                className={`fact-card ${
                  selectedHistory?.id === item.id ? "selected" : ""
                }`}
                onClick={() => setSelectedHistory(item)}
              >
                <div className="card-icon">🏛️</div>

                <div className="card-meta">
                  {item.category} · {item.period}
                </div>

                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </button>
            ))}
          </div>

          {filteredHistory.length === 0 && (
            <div className="empty">
              找不到相关历史，可以换一个关键词试试看。
            </div>
          )}
        </section>
      </main>
    </>
  );
}