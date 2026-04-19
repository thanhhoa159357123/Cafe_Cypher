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
import { Coffee, Store, Trash2, Save, RefreshCw } from "lucide-react";
import { IProduct, ISize, ITopping } from "@/app/types/base/product";
import { ICategory } from "@/app/types/base/category";
import CategorySelect from "./items/CategorySelect";
import UploadImageProduct from "./items/UploadImageProduct";
import CheckBoxTopping from "./items/CheckBoxTopping";
import CheckBoxSize from "./items/CheckBoxSize";

interface ProductFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  initialData: IProduct | null;
  availableSizes?: ISize[];
  availableToppings?: ITopping[];
  availableCategories?: ICategory[];
  onSubmit: (data: IProduct) => Promise<void>;
  onDelete?: (id: number | string) => Promise<void>;
  onRestore?: (id: number | string) => Promise<void>;
}

export default function ProductFormDrawer({
  isOpen,
  onClose,
  mode,
  initialData,
  availableSizes = [],
  availableToppings = [],
  availableCategories = [],
  onSubmit,
  onDelete,
  onRestore,
}: ProductFormDrawerProps) {
  const [formData, setFormData] = useState<Partial<IProduct>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        ...initialData,
        sizes: initialData.sizes || [],
        toppings: initialData.toppings || [],
      });
      setPreviewImage(initialData.image || null);
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        image: "",
        category: null,
        sizes: [],
        toppings: [],
      });
      setPreviewImage(null);
    }
  }, [mode, initialData, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    // Nếu thay đổi category
    if (name === "category_id") {
      const catId = Number(value);
      // Tìm category thật trong danh sách được truyền vào cả gốc lẫn con
      let selectedCategory = availableCategories.find((c) => c.id === catId);

      if (!selectedCategory) {
        for (const cat of availableCategories) {
          if (cat.children) {
            const childCat = cat.children.find((c) => c.id === catId);
            if (childCat) {
              selectedCategory = childCat;
              break;
            }
          }
        }
      }

      setFormData((prev) => ({
        ...prev,
        category: selectedCategory || null, // Gán nguyên object thật vào
        category_id: catId, // Lưu id để đồng bộ form lúc submit
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleLocalImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file as any }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const toggleSize = (size: ISize) => {
    setFormData((prev) => {
      const currentSizes = prev.sizes || [];
      const isSelected = currentSizes.some((s) => s.id === size.id);
      if (isSelected) {
        return { ...prev, sizes: currentSizes.filter((s) => s.id !== size.id) };
      } else {
        return { ...prev, sizes: [...currentSizes, { ...size, price: 0 }] };
      }
    });
  };

  const handleSizePriceChange = (sizeId: number | string, newPrice: number) => {
    setFormData((prev) => ({
      ...prev,
      sizes: (prev.sizes || []).map((s) =>
        s.id === sizeId ? { ...s, price: newPrice } : s,
      ),
    }));
  };

  const toggleTopping = (topping: ITopping) => {
    setFormData((prev) => {
      const currentToppings = prev.toppings || [];
      const isSelected = currentToppings.some((t) => t.id === topping.id);
      if (isSelected) {
        return {
          ...prev,
          toppings: currentToppings.filter((t) => t.id !== topping.id),
        };
      } else {
        return { ...prev, toppings: [...currentToppings, topping] };
      }
    });
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    await onSubmit({
      id: formData.id ?? 0,
      name: formData.name || "",
      description: formData.description || "",
      price: formData.price || 0,
      image: formData.image || "",
      category: formData.category || null,
      category_id:
        (formData as any).category_id || formData.category?.id || null,
      sizes: formData.sizes || [],
      toppings: formData.toppings || [],
    } as any);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Sheet
      modal={false}
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-all cursor-pointer"
          onClick={onClose}
        />
      )}
      <SheetContent className="sm:max-w-xl overflow-y-auto w-full flex flex-col h-full bg-card border-l-border shadow-xl p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
            <SheetTitle className="text-2xl font-bold flex items-center gap-2 text-card-foreground">
              {mode === "create" ? (
                <>
                  <Coffee className="text-primary" size={24} />
                  Thêm món mới
                </>
              ) : (
                <>
                  <Store className="text-primary" size={24} />
                  Chi tiết & Cập nhật
                </>
              )}
            </SheetTitle>
            <SheetDescription className="text-muted-foreground mt-1">
              {mode === "create"
                ? "Điền thông tin bên dưới để tạo món mới chạy trên Menu."
                : `Chỉnh sửa thông tin cho mã #${formData.id}.`}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto">
            {/* Tên sản phẩm */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">
                Tên sản phẩm <span className="text-destructive">*</span>
              </label>
              <input
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="VD: Cà phê sữa đá..."
              />
            </div>

            {/* Danh mục */}
            <CategorySelect
              value={(formData as any).category_id || formData.category?.id}
              onChange={handleChange}
              availableCategories={availableCategories}
            />

            {/* Giá bán cơ bản */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">
                Giá bán cơ bản (VNĐ) <span className="text-destructive">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="0"
              />
            </div>

            {/* Upload ảnh */}
            <UploadImageProduct
              value={formData.image}
              handleChange={handleChange}
              handleLocalImageChange={handleLocalImageChange}
              preview={previewImage}
              setPreview={setPreviewImage}
            />

            {/* Mô tả */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">
                Mô tả ngắn
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                placeholder="Thông tin thêm về sản phẩm..."
              />
            </div>

            {/* Toppings */}
            <CheckBoxTopping
              value={availableToppings}
              toggleTopping={toggleTopping}
              form={formData}
            />

            {/* Sizes */}
            <CheckBoxSize
              value={availableSizes}
              toggleSize={toggleSize}
              handleSizePriceChange={handleSizePriceChange}
              form={formData}
            />
          </div>

          <SheetFooter className="px-6 py-5 border-t border-border flex sm:justify-between items-center gap-4">
            {mode === "edit" ? (
              formData.deleted_at ? (
                // NẾU ĐÃ CÓ DELETED_AT -> HIỂN THỊ NÚT KHÔI PHỤC KÈM ICON
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (onRestore && formData.id) onRestore(formData.id);
                    onClose();
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 text-blue-600 hover:bg-blue-600/10 rounded-xl font-semibold transition-all cursor-pointer"
                >
                  <RefreshCw size={18} />{" "}
                  {/* Đừng quên import from "lucide-react" nhé */}
                  Khôi phục
                </button>
              ) : (
                // CHƯA XÓA -> NÚT THÙNG RÁC XÓA BÌNH THƯỜNG
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (onDelete && formData.id) onDelete(formData.id);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 text-destructive hover:bg-destructive/10 rounded-xl font-semibold transition-all cursor-pointer"
                >
                  <Trash2 size={18} />
                  Xóa món
                </button>
              )
            ) : (
              <div />
            )}

            <div className="flex gap-3 ml-auto">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-muted-foreground hover:text-card-foreground hover:bg-muted font-medium transition-all cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Save size={18} />
                {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
