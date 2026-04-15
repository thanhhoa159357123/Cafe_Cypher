export interface ICategory {
  id: number | string;
  name: string;
  slug: string;
  parent_id?: number | string | null;
  children?: ICategory[];
  status: "active" | "inactive";
  deleted_at: string | null;
}
