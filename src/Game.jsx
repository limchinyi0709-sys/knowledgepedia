import { useMemo, useState } from "react";
import { Search, Shuffle, BookOpen, Gamepad2 } from "lucide-react";

import { gameStories, annualBestSellingGames, gameTimeline } from "./game";

export default function Game() {
  const [gameQuery, setGameQuery] = useState("");
  const [selectedGameStory, setSelectedGameStory] = useState(gameStories[0]);

  const filteredGameStories = useMemo(() => {
    return gameStories.filter((item) => {
      const keyword = gameQuery.trim().toLowerCase();
      const timelineText = item.timeline
        .map((t) => `${t.year} ${t.event}`)
        .join(" ");

      const searchText =
        `${item.title} ${item.type} ${item.brand} ${item.period} ${item.summary} ${item.story} ${item.impact} ${timelineText}`.toLowerCase();

      return !keyword || searchText.includes(keyword);
    });
  }, [gameQuery]);

  const filteredBestGames = useMemo(() => {
    return annualBestSellingGames.filter((item) => {
      const keyword = gameQuery.trim().toLowerCase();

      const searchText =
        `${item.year} ${item.title} ${item.chineseTitle} ${item.publisher} ${item.genre} ${item.platform}`.toLowerCase();

      return !keyword || searchText.includes(keyword);
    });
  }, [gameQuery]);

  function randomGameStory() {
    const item = gameStories[Math.floor(Math.random() * gameStories.length)];
    setSelectedGameStory(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <section className="hero-content">
        <div>
          <p className="eyebrow">游戏百科 · 华文版本</p>
          <h1>
            看懂 Switch、PlayStation
            <br />
            与年度畅销游戏故事
          </h1>

          <p className="hero-text">
            整理游戏主机故事、游戏产业时间线，以及每一年销量最好的游戏。
          </p>

          <div className="hero-actions">
            <button onClick={randomGameStory} className="primary-btn">
              <Shuffle size={18} /> 随机游戏故事
            </button>
          </div>
        </div>

        <div className="today-card">
          <span>游戏推荐</span>
          <div className="big-icon">{selectedGameStory.icon}</div>
          <h2>{selectedGameStory.title}</h2>
          <p>{selectedGameStory.summary}</p>
          <button>查看故事</button>
        </div>
      </section>

      <main className="main-grid">
        <aside className="sidebar">
          <div className="search-box">
            <Search size={18} />
            <input
              value={gameQuery}
              onChange={(e) => setGameQuery(e.target.value)}
              placeholder="搜索 Switch、PS、游戏、年份..."
            />
          </div>

          <div className="stats-box">
            <h3>
              <Gamepad2 size={18} /> 游戏资料
            </h3>

            <p>
              游戏故事：<b>{gameStories.length}</b>
            </p>

            <p>
              年度销量：<b>{annualBestSellingGames.length}</b>
            </p>

            <p>
              时间线：<b>{gameTimeline.length}</b>
            </p>
          </div>
        </aside>

        <section className="content-area">
          {selectedGameStory && (
            <article className="detail-card">
              <div className="detail-top">
                <div className="detail-icon">{selectedGameStory.icon}</div>

                <div>
                  <p className="detail-category">
                    {selectedGameStory.type} · {selectedGameStory.brand}
                  </p>
                  <h2>{selectedGameStory.title}</h2>
                </div>
              </div>

              <p className="summary">
                <Gamepad2 size={18} /> {selectedGameStory.period}
              </p>

              <div className="article-block">
                <h3>故事简介</h3>
                <p>{selectedGameStory.summary}</p>
              </div>

              <div className="article-block">
                <h3>完整故事</h3>
                <p>{selectedGameStory.story}</p>
              </div>

              <div className="article-block highlight">
                <h3>时间线</h3>
                {selectedGameStory.timeline.map((item, index) => (
                  <p key={index}>
                    <b>{item.year}</b>：{item.event}
                  </p>
                ))}
              </div>

              <div className="article-block">
                <h3>代表游戏</h3>
                {selectedGameStory.keyGames.map((game, index) => (
                  <p key={index}>🎮 {game}</p>
                ))}
              </div>

              <div className="article-block">
                <h3>影响</h3>
                <p>{selectedGameStory.impact}</p>
              </div>
            </article>
          )}

          <div className="section-title">
            <h2>游戏故事</h2>
            <p>Switch、PlayStation 与游戏产业故事</p>
          </div>

          <div className="cards-grid">
            {filteredGameStories.map((item) => (
              <button
                key={item.id}
                className={`fact-card ${
                  selectedGameStory?.id === item.id ? "selected" : ""
                }`}
                onClick={() => setSelectedGameStory(item)}
              >
                <div className="card-icon">{item.icon}</div>

                <div className="card-meta">
                  {item.type} · {item.period}
                </div>

                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </button>
            ))}
          </div>

          <div className="section-title">
            <h2>每一年销量最好的游戏</h2>
            <p>按照年份整理，让大家一眼看懂游戏市场变化</p>
          </div>

          <div className="cards-grid">
            {filteredBestGames.map((item) => (
              <button key={item.id} className="fact-card">
                <div className="card-icon">🏆</div>

                <div className="card-meta">
                  {item.year} · {item.genre}
                </div>

                <h3>{item.chineseTitle}</h3>
                <p>{item.title}</p>

                <p>
                  <b>发行：</b>
                  {item.publisher}
                </p>

                <p>
                  <b>平台：</b>
                  {item.platform}
                </p>
              </button>
            ))}
          </div>

          <div className="section-title">
            <h2>游戏产业时间线</h2>
            <p>从早期街机到现代主机</p>
          </div>

          <article className="detail-card">
            <div className="article-block highlight">
              {gameTimeline.map((item) => (
                <p key={item.id}>
                  <b>{item.year}</b>：{item.event}
                </p>
              ))}
            </div>
          </article>

          {filteredGameStories.length === 0 && filteredBestGames.length === 0 && (
            <div className="empty">
              找不到相关游戏资料，可以换一个关键词试试看。
            </div>
          )}
        </section>
      </main>
    </>
  );
}