"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { FolderTree, Save } from "lucide-react";
import { ICategory } from "@/app/types/base/category";

interface CategoryFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  initialData: ICategory | null;
  categories: ICategory[];
  onSubmit: (data: {
    name: string;
    parent_id?: number | null;
  }) => Promise<void>;
}

export default function CategoryFormDrawer({
  isOpen,
  onClose,
  mode,
  initialData,
  categories,
  onSubmit,
}: CategoryFormDrawerProps) {
  const [formData, setFormData] = useState<Partial<ICategory>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: "", parent_id: "" });
    }
  }, [mode, initialData, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.name) return;
    setIsSubmitting(true);
    await onSubmit({
      name: formData.name,
      parent_id: formData.parent_id ? Number(formData.parent_id) : null,
    });
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Sheet
      modal={false}
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      {/* Overlay tùy chỉnh */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-all"
          onClick={onClose}
        />
      )}

      <SheetContent className="sm:max-w-md z-50 overflow-y-auto w-full flex flex-col h-full bg-card border-l-border shadow-xl">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-2xl font-bold flex items-center gap-3 text-card-foreground">
            <FolderTree className="text-primary" size={24} />
            {mode === "create" ? "Thêm danh mục" : "Cập nhật danh mục"}
          </SheetTitle>
          <SheetDescription className="text-muted-foreground mt-2">
            {mode === "create"
              ? "Tạo một nhóm phân loại mới cho thực đơn của cửa hàng."
              : `Chỉnh sửa thông tin danh mục #${formData.id}.`}
          </SheetDescription>
        </SheetHeader>

        {/* Nội dung form */}
        <div className="flex-1 space-y-6 px-4">
          {/* Tên danh mục */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-card-foreground block">
              Tên danh mục <span className="text-destructive">*</span>
            </label>
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="VD: Cà phê Việt Nam, Trà trái cây..."
              autoFocus
            />
          </div>

          {/* Danh mục cha */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-card-foreground block">
              Danh mục cha
            </label>
            <select
              name="parent_id"
              value={formData.parent_id || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
            >
              <option value="">-- Không có (Làm danh mục gốc) --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              Chọn nếu danh mục này nằm bên trong một danh mục khác lớn hơn.
            </p>
          </div>
        </div>

        {/* Footer */}
        <SheetFooter className="mt-8 pt-6 border-t border-border">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-muted-foreground hover:text-card-foreground hover:bg-muted font-semibold transition-all cursor-pointer"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              disabled={isSubmitting || !formData.name}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all font-bold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Save size={18} />
              {isSubmitting ? "Đang lưu..." : "Xác nhận"}
            </button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
