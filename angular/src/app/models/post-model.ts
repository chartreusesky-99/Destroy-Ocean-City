export interface post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  link: string;
  date: string;
  _embedded?: {
    author?: {
      id: number;
      name: string;
      avatar_urls: { [size: string]: string };
    }[];
    'wp:featuredmedia'?: { source_url: string }[];
  };
}