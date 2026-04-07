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
import { Coffee, Store, Trash2, Save } from "lucide-react";
import { IProduct } from "@/app/types/base/product";

interface ProductFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  // "create": Thêm mới | "edit": Xem chi tiết & Sửa
  mode: "create" | "edit";
  initialData: IProduct | null;
  // Các hàm callback gọi khi hoàn tất (truyền từ Hook/Store vào)
  onSubmit: (data: any) => Promise<void>;
  onDelete?: (id: number | string) => Promise<void>;
}

export default function ProductFormDrawer({
  isOpen,
  onClose,
  mode,
  initialData,
  onSubmit,
  onDelete,
}: ProductFormDrawerProps) {
  // Quản lý state của Form đơn giản (Bạn có thể dùng react-hook-form + zod cho xịn hơn sau này)
  const [formData, setFormData] = useState<Partial<IProduct>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Khi mở ngăn kéo hoặc đổi dữ liệu, nạp lại thông tin vào Form
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: "", description: "", price: 0, image: "" }); // Reset
    }
  }, [mode, initialData, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Sheet
      modal={false}
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      {/* Tạo lớp phủ đên che lại */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-all"
          onClick={onClose}
        />
      )}
      {/* sm:max-w-xl làm cái trượt này to ra một chút để dễ nhìn UI Form */}
      <SheetContent className="sm:max-w-xl overflow-y-auto w-full flex flex-col h-full bg-card border-l-border">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold flex items-center gap-2">
            {mode === "create" ? (
              <>
                <Coffee className="text-primary" /> Thêm món mới
              </>
            ) : (
              <>
                <Store className="text-primary" /> Chi tiết & Cập nhật
              </>
            )}
          </SheetTitle>
          <SheetDescription>
            {mode === "create"
              ? "Điền thông tin bên dưới để tạo món mới chạy trên Menu."
              : `Chỉnh sửa thông tin cho mã #${formData.id}.`}
          </SheetDescription>
        </SheetHeader>

        {/* Nội dung FORM kéo dài chiếm phần giữa */}
        <div className="flex-1 space-y-6 pr-2">
          {/* Bạn có thể tự custom các ô input thành Component xịn hơn */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">Tên sản phẩm *</label>
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl border bg-background text-foreground"
              placeholder="VD: Cà phê sữa đá..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Giá bán (VNĐ) *</label>
            <input
              type="number"
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl border bg-background"
              placeholder="0"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">
              Hình ảnh (URL hoặc File)
            </label>
            <input
              name="image"
              value={formData.image || ""}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl border bg-background"
              placeholder="https://..."
            />
            {/* Hiển thị luôn hình preview nếu có */}
            {formData.image && (
              <div className="mt-2 w-24 h-24 rounded-xl border overflow-hidden">
                <img
                  src={formData.image}
                  alt="preview"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Mô tả ngắn</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl border bg-background resize-none"
              placeholder="Thông tin thêm..."
            />
          </div>

          {/* ... Các khu vực như chọn Category, Kích thước (Sizes), Toppings bác sẽ bổ sung Select Box sau nhé ... */}
        </div>

        {/* FOOTER: Nút bấm cố định dưới cùng */}
        <SheetFooter className="mt-8 pt-4 border-t border-border flex sm:justify-between items-center">
          {/* Nút Xóa (Nằm bên trái nếu là Edit) */}
          {mode === "edit" ? (
            <button
              onClick={() => onDelete && formData.id && onDelete(formData.id)}
              className="flex items-center gap-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-xl font-semibold transition-colors"
            >
              <Trash2 size={18} />
              Xóa món
            </button>
          ) : (
            <div /> // Khối rỗng đẩy nút Hủy/Lưu sang phải
          )}

          {/* Cụm Hủy / Lưu nẳm bên phải */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-muted-foreground hover:bg-muted font-semibold transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary-light transition-colors font-bold shadow disabled:opacity-50"
            >
              <Save size={18} />
              {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
