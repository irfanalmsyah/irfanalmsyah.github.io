import rss from "@astrojs/rss";
import { SITE } from "@consts";
import { getCollection } from "astro:content";

export async function GET(context) {
  const wdiwlms = (await getCollection("wdiwlms")).filter((post) => !post.data.draft);

  const projects = (await getCollection("projects")).filter(
    (project) => !project.data.draft,
  );

  const items = [...wdiwlms, ...projects].sort(
    (a, b) => new Date(b.data.publishedAt).valueOf() - new Date(a.data.publishedAt).valueOf(),
  );

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.publishedAt,
      link: `/${item.collection}/${item.slug}/`,
    })),
  });
}
