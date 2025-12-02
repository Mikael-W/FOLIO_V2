import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  linkify: true,
  breaks: true,
});

export function renderMarkdown(text: string) {
  return md.render(text);
}
