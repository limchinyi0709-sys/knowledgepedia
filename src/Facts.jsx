import { useMemo, useState } from "react";
import {
  Search,
  Shuffle,
  BookOpen,
  Star,
  X,
  Heart,
  Tag,
  Lightbulb,
} from "lucide-react";

import { facts } from "./facts";

const categories = ["全部", ...new Set(facts.map((fact) => fact.category))];

export default function Facts() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("全部");
  const [selectedFact, setSelectedFact] = useState(facts[0]);
  const [favorites, setFavorites] = useState([]);

  const filteredFacts = useMemo(() => {
    return facts.filter((fact) => {
      const matchCategory =
        activeCategory === "全部" || fact.category === activeCategory;

      const keyword = query.trim().toLowerCase();

      const searchText = `${fact.title} ${fact.summary} ${fact.content} ${
        fact.category
      } ${fact.extra || ""}`.toLowerCase();

      return matchCategory && (!keyword || searchText.includes(keyword));
    });
  }, [query, activeCategory]);

  const todayFact = facts[new Date().getDate() % facts.length];

  function randomFact() {
    const item = facts[Math.floor(Math.random() * facts.length)];
    setSelectedFact(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleFavorite(id) {
    setFavorites((old) =>
      old.includes(id) ? old.filter((item) => item !== id) : [...old, id]
    );
  }

  return (
    <>
      <section className="hero-content">
        <div>
          <p className="eyebrow">每天一个冷知识，每天聪明一点</p>
          <h1>
            探索世界上那些
            <br />
            有趣又意想不到的知识
          </h1>
          <p className="hero-text">
            动物、人体、宇宙、地球、科技、历史、商业与心理学，一站式轻松阅读。
          </p>

          <div className="hero-actions">
            <button onClick={randomFact} className="primary-btn">
              <Shuffle size={18} /> 随机一个
            </button>

            <button
              onClick={() => setSelectedFact(todayFact)}
              className="secondary-btn"
            >
              <Star size={18} /> 今日冷知识
            </button>
          </div>
        </div>

        <div className="today-card">
          <span>今日推荐</span>
          <div className="big-icon">{todayFact.icon}</div>
          <h2>{todayFact.title}</h2>
          <p>{todayFact.summary}</p>
          <button onClick={() => setSelectedFact(todayFact)}>马上阅读</button>
        </div>
      </section>
            <main className="main-grid">
        <aside className="sidebar">
          <div className="search-box">
            <Search size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索冷知识、分类、关键词..."
            />
          </div>

          <div className="category-box">
            <h3>
              <Tag size={18} /> 分类
            </h3>

            <div className="category-list">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={activeCategory === cat ? "active" : ""}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="stats-box">
            <h3>
              <BookOpen size={18} /> 网站资料
            </h3>
            <p>
              冷知识总数：<b>{facts.length}</b>
            </p>
            <p>
              目前显示：<b>{filteredFacts.length}</b>
            </p>
            <p>
              我的收藏：<b>{favorites.length}</b>
            </p>
          </div>
        </aside>

        <section className="content-area">
          {selectedFact && (
            <article className="detail-card">
              <button
                className="close-mobile"
                onClick={() => setSelectedFact(null)}
              >
                <X size={18} />
              </button>

              <div className="detail-top">
                <div className="detail-icon">{selectedFact.icon}</div>

                <div>
                  <p className="detail-category">
                    {selectedFact.category} · {selectedFact.level}
                  </p>
                  <h2>{selectedFact.title}</h2>
                </div>

                <button
                  className={`heart-btn ${
                    favorites.includes(selectedFact.id) ? "saved" : ""
                  }`}
                  onClick={() => toggleFavorite(selectedFact.id)}
                >
                  <Heart size={20} />
                </button>
              </div>

              <p className="summary">
                <Lightbulb size={18} /> {selectedFact.summary}
              </p>

              <div className="article-block">
                <h3>为什么？</h3>
                <p>{selectedFact.content}</p>
              </div>

              <div className="article-block highlight">
                <h3>冷知识加码</h3>
                <p>{selectedFact.extra}</p>
              </div>
            </article>
          )}
                    <div className="section-title">
            <h2>冷知识列表</h2>
            <p>点击卡片可以阅读完整内容</p>
          </div>

          <div className="cards-grid">
            {filteredFacts.map((fact) => (
              <button
                key={fact.id}
                className={`fact-card ${
                  selectedFact?.id === fact.id ? "selected" : ""
                }`}
                onClick={() => setSelectedFact(fact)}
              >
                <div className="card-icon">{fact.icon}</div>

                <div className="card-meta">
                  {fact.category} · {fact.level}
                </div>

                <h3>{fact.title}</h3>

                <p>{fact.summary}</p>
              </button>
            ))}
          </div>

          {filteredFacts.length === 0 && (
            <div className="empty">
              找不到相关冷知识，可以换一个关键词试试看。
            </div>
          )}
        </section>
      </main>
    </>
  );
}
      