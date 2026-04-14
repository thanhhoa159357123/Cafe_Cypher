import { ImagePlus } from "lucide-react";
import React from "react";

interface UploadImageProductProps {
  value: string | File | any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLocalImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview: string | null;
  setPreview: (preview: string | null) => void;
}

const UploadImageProduct = ({
  value,
  handleChange,
  handleLocalImageChange,
  preview,
  setPreview,
}: UploadImageProductProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold">Hình ảnh minh họa</label>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors font-medium border border-border">
            <ImagePlus size={18} />
            Chọn từ máy
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLocalImageChange}
            />
          </label>
          <div className="text-sm font-medium text-muted-foreground">hoặc</div>
          <input
            name="image"
            value={typeof value === "string" ? value : ""}
            onChange={(e) => {
              handleChange(e);
              setPreview(e.target.value);
            }}
            className="flex-1 p-2 rounded-xl border bg-background text-sm"
            placeholder="Dán link ảnh https://..."
          />
        </div>

        {preview && (
          <div className="w-32 h-32 rounded-xl border border-border overflow-hidden bg-muted/50 mt-1">
            <img
              src={preview}
              alt="preview"
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImageProduct;
