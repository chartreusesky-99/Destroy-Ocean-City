export interface post {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  link: string;
  date: string;
  _embedded?: {
    author?: {
      id: number;
      name: string;
      avatar_url: string;
      tier: string;
    }[];
    'media'?: { source_url: string }[];
  };
}