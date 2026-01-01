export type ResourceCategory = 'app' | 'tool' | 'website' | 'library' | 'other';

export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: ResourceCategory;
  tags: string[];
  platform?: string[];
  keywords?: string[];
}

export const resources: Resource[] = [
  {
    id: '1',
    name: 'Yawm',
    description: 'A beautiful daily Quran companion app helping you build consistent recitation habits.',
    url: 'https://getyawm.com',
    category: 'app',
    tags: ['quran', 'daily', 'habit', 'recitation', 'mobile'],
    platform: ['iOS', 'Android'],
    keywords: ['quran reader', 'quran app', 'reading', 'daily quran', 'mushaf', 'tilawah']
  },
  {
    id: '2',
    name: 'Quran Video Maker (FFmpeg)',
    description: 'Open-source tool to create Quran recitation videos with synchronized text and audio using FFmpeg.',
    url: 'https://github.com/ashaltu/quran-video-maker-ffmpeg',
    category: 'tool',
    tags: ['video', 'ffmpeg', 'open-source', 'automation', 'github'],
    platform: ['CLI'],
    keywords: ['video maker', 'quran video', 'recitation video', 'youtube', 'social media']
  },
  {
    id: '3',
    name: 'Tarteel AI',
    description: 'AI-powered Quran memorization and recitation app with voice recognition technology.',
    url: 'https://tarteel.ai',
    category: 'app',
    tags: ['ai', 'memorization', 'recitation', 'voice', 'mobile'],
    platform: ['iOS', 'Android', 'Web'],
    keywords: ['quran reader', 'hifz', 'memorize quran', 'tajweed', 'quran app', 'reading']
  },
  {
    id: '4',
    name: 'QUL Website',
    description: 'The official Quranic Universal Library - the largest open-source collection of Quranic resources.',
    url: 'https://qul.tarteel.ai',
    category: 'website',
    tags: ['official', 'resources', 'api', 'database', 'open-source'],
    platform: ['Web'],
    keywords: ['quran data', 'quran api', 'translations', 'tafsir', 'audio']
  },
  {
    id: '5',
    name: 'QUL GitHub Repository',
    description: 'Source code for the Quranic Universal Library CMS and data management system.',
    url: 'https://github.com/TarteelAI/quranic-universal-library',
    category: 'library',
    tags: ['github', 'open-source', 'cms', 'ruby', 'rails'],
    platform: ['GitHub'],
    keywords: ['source code', 'contribute', 'developers', 'quran data']
  }
];

export const categoryLabels: Record<ResourceCategory, string> = {
  app: 'App',
  tool: 'Tool',
  website: 'Website',
  library: 'Library',
  other: 'Other'
};

export const categoryColors: Record<ResourceCategory, string> = {
  app: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  tool: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  website: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300',
  library: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300',
  other: 'bg-stone-100 text-stone-800 dark:bg-stone-900/30 dark:text-stone-300'
};

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function searchResources(query: string, items: Resource[]): Resource[] {
  if (!query.trim()) return items;
  
  const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  
  return items.filter(resource => {
    const searchableText = [
      resource.name,
      resource.description,
      ...resource.tags,
      resource.category,
      ...(resource.platform || []),
      ...(resource.keywords || [])
    ].join(' ').toLowerCase();
    
    return queryWords.every(word => searchableText.includes(word));
  });
}
