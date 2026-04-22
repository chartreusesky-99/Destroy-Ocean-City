export interface hero {
    id: number;
    slug: string;
    name: string;
    tier: string;
    excerpt: string;
    facts: string[];
    order: number;
    media: {
        id: number;
        source_url: string;
        alt_text: string;
        media_details: any;
    };
}