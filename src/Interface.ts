export default interface iPostRecommendation {
  author: string | null;
  url: string;
  title: string;
  description: string | null;
  tags: string[];
  content_type: string;
  rating: string;
  reason: string | null;
  build_week: number;
}

export default interface iRecentRecommendation {
  id: number;
  user_id: number | null;
  author: string | null;
  date: Date;
  url: string;
  title: string;
  description: string | null;
  tags: string[];
  content_type: string;
  rating: string;
  reason: string | null;
  build_week: number;
}
