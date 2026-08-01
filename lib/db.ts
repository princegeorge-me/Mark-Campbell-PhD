import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL!);

export type PressEntry = {
  id: number;
  outlet: string;
  badge: string;
  headline: string;
  url: string;
  year: string;
  image: string;
  object_position: string;
  is_video: boolean;
  display_order: number;
  created_at: string;
};

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS press_mentions (
      id              SERIAL PRIMARY KEY,
      outlet          VARCHAR(255)  NOT NULL,
      badge           VARCHAR(255)  NOT NULL,
      headline        TEXT          NOT NULL,
      url             TEXT          NOT NULL UNIQUE,
      year            VARCHAR(50)   NOT NULL,
      image           TEXT          NOT NULL,
      object_position VARCHAR(50)   NOT NULL DEFAULT 'center 50%',
      is_video        BOOLEAN       NOT NULL DEFAULT FALSE,
      display_order   INTEGER       NOT NULL DEFAULT 0,
      created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
    )
  `;

  const [row] = await sql`SELECT COUNT(*)::int AS count FROM press_mentions`;
  if (row.count === 0) await seedEntries();
}

async function seedEntries() {
  const entries = [
    { outlet: "MSN", badge: "Money & Business", headline: "Top 10 Most Inspiring Men in 2026", url: "https://www.msn.com/en-us/money/news/top-10-most-inspiring-men-in-2026/ar-AA27k9CQ", year: "2026", image: "/dr-mark-campbell-Inspiring-men.jpeg", object_position: "center 15%", is_video: false, display_order: 1 },
    { outlet: "Chicago Business", badge: "Chicago ORBIE Awards", headline: "CIO of the Year — ORBIE Award Honoree", url: "https://www.chicagobusiness.com/recognitions/chicago-orbie-awards/cio/2023/mark-campbell/", year: "2023", image: "/ORBIE.jpeg", object_position: "center 35%", is_video: false, display_order: 2 },
    { outlet: "Government Technology", badge: "Top 25 Doers, Dreamers & Drivers", headline: "Mark Campbell Named Top 25 in Government Technology", url: "https://www.govtech.com/top-25/Mark-Campbell.html", year: "Top 25", image: "/CIO-White-Sox.png", object_position: "center 30%", is_video: false, display_order: 3 },
    { outlet: "Government Technology", badge: "Featured Video", headline: "Remote Work Pays Off for Atlanta Housing Authority", url: "https://www.govtech.com/districts/videos/Remote-Work-Pays-Off-for-Atlanta-Housing-Authority.html", year: "Featured", image: "/Atlanta-housing.jpg", object_position: "center 50%", is_video: false, display_order: 4 },
    { outlet: "Pittsburgh Post-Gazette", badge: "Education Technology", headline: "For Pittsburgh Teachers, iPads Keeping Students Charged", url: "https://www.post-gazette.com/local/city/2013/04/08/for-pittsburgh-teachers-ipads-keeping-students-charged/stories/201304080110", year: "2013", image: "/Pittsburg.png", object_position: "center 30%", is_video: false, display_order: 5 },
    { outlet: "Ho-Chunk Nation", badge: "Community Feature", headline: "Introducing Dr. Mark Campbell — Executive Spotlight", url: "https://www.facebook.com/HoChunkNation/photos/please-tell-us-what-you-think-of-this-style-of-introducing-new-key-employees-inc/10157446187819181/", year: "Featured", image: "/downtown-Atlanta.png", object_position: "center 40%", is_video: false, display_order: 6 },
    { outlet: "Next In Line Podcast", badge: "YouTube · Featured Interview", headline: "Leadership in Tech, AI, Career Reinvention & Finding Your Purpose", url: "https://www.youtube.com/watch?v=xKp5kr-8QCQ", year: "Ep. 76", image: "/youtube-next-in-line.jpg", object_position: "center 30%", is_video: true, display_order: 7 },
  ];

  for (const e of entries) {
    await sql`
      INSERT INTO press_mentions (outlet, badge, headline, url, year, image, object_position, is_video, display_order)
      VALUES (${e.outlet}, ${e.badge}, ${e.headline}, ${e.url}, ${e.year}, ${e.image}, ${e.object_position}, ${e.is_video}, ${e.display_order})
      ON CONFLICT (url) DO NOTHING
    `;
  }
}
