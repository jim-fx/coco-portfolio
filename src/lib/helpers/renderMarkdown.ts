import { remark } from 'remark';
import html from 'remark-html';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { rehype } from 'rehype';

export async function renderMarkdown(input: string) {

  const htmlContent = await remark().use(remarkGfm).use(html, { sanitize: false }).process(input);

  const result = await rehype()
    .data('settings', { fragment: true })
    .use(rehypeHighlight)
    .process(htmlContent);

  return result.toString();
}
