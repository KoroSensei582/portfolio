export const pages = [
  { path: '/',         label: 'EE / MSU', coord: '00.00' },
  { path: '/about',    label: 'ABOUT',    coord: '00.01' },
  { path: '/research', label: 'RESEARCH', coord: '00.02' },
  { path: '/projects', label: 'PROJECTS', coord: '00.03' },
  { path: '/contact',  label: 'CONTACT',  coord: '00.04' },
] as const;

export type PagePath = (typeof pages)[number]['path'];
export type PageEntry = (typeof pages)[number];

export function getPage(path: PagePath): PageEntry {
  return pages.find((p) => p.path === path)!;
}
