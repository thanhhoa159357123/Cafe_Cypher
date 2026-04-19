import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Save, X } from "lucide-react";

interface SizeToppingFormDrawerProps {
  isOpen: boolean;
  mode: "create" | "edit";
  type: "size" | "topping";
  onClose: () => void;
  onSubmit: (data: { name: string; price?: number }) => Promise<void>;
  initialData?: { name: string; price?: number } | null;
}

// 1. Khởi tạo schema validate động với Zod
const formSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên."),
  price: z
    .number({ message: "Vui lòng nhập số hợp lệ." })
    .min(0, "Giá không hợp lệ.")
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Size_TopingFormDrawer = ({
  isOpen,
  mode,
  type,
  onClose,
  onSubmit: onSubmitProp,
  initialData,
}: SizeToppingFormDrawerProps) => {
  // 2. Setup React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  // Reset form khi đóng/mở drawer hoặc khi chuyển đổi mode/type
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialData) {
        reset({ name: initialData.name, price: initialData.price ?? 0 });
      } else {
        reset({ name: "", price: 0 });
      }
    }
  }, [isOpen, mode, type, initialData, reset]);

  const onSubmit = async (data: FormValues) => {
    // Nếu là size thì loại bỏ price trước khi gửi API
    const payload = type === "size" ? { name: data.name } : data;
    await onSubmitProp(payload);
  };

  const titleType = type === "size" ? "Kích cỡ" : "Topping";
  const actionText = mode === "create" ? "Thêm mới" : "Cập nhật";

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

      <SheetContent className="z-50 sm:max-w-md w-full flex flex-col h-full bg-card border-l border-border shadow-2xl p-0">
        <div className="p-6 border-b border-border/50 bg-secondary-light/20">
          <SheetHeader>
            <SheetTitle className="text-xl font-black text-foreground">
              {actionText} {titleType}
            </SheetTitle>
            <SheetDescription className="text-sm font-medium text-muted-foreground mt-1">
              {mode === "create"
                ? `Nhập thông tin để tạo ${titleType.toLowerCase()} mới trong hệ thống.`
                : `Chỉnh sửa thông tin ${titleType.toLowerCase()} hiện tại.`}
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* Khung chứa Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {/* Field: Tên */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">
              Tên {titleType} <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              placeholder={`VD: ${type === "size" ? "Size L" : "Trân châu trắng"}`}
              className={`w-full px-4 py-2.5 bg-background border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium ${
                errors.name ? "border-destructive" : "border-border"
              }`}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs font-semibold text-destructive mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Field: Giá (Chỉ hiển thị khi type === 'topping') */}
          {type === "topping" && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">
                Phụ thu (VNĐ) <span className="text-destructive">*</span>
              </label>
              <input
                type="number"
                placeholder="VD: 10000"
                className={`w-full px-4 py-2.5 bg-background border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium ${
                  errors.price ? "border-destructive" : "border-border"
                }`}
                {...register("price", {
                  setValueAs: (v) => (v === "" ? 0 : Number(v)), // Thêm dòng này để ép text thành số
                })}
              />
              {errors.price && (
                <p className="text-xs font-semibold text-destructive mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
          )}

          {/* Spacer để đẩy footer xuống dưới cùng nếu màn hình dài */}
          <div className="flex-1" />

          {/* Footer / Buttons */}
          <SheetFooter className="mt-auto pt-6 border-t border-border flex justify-end gap-3 pb-2">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-secondary-light transition-colors text-sm font-bold"
            >
              <X size={18} />
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-bold shadow-md disabled:opacity-70"
            >
              <Save size={18} />
              {isSubmitting ? "Đang lưu..." : actionText}
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default Size_TopingFormDrawer;
