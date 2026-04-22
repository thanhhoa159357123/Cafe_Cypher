"use client";

import { CreditCard, MapPin, Phone, Wallet, Loader2 } from "lucide-react";
import { useState, useEffect, Suspense, useRef } from "react"; // 👇 Thêm Suspense ở đây
import { useRouter, useSearchParams } from "next/navigation";
import { useCartStore } from "../../store/client/useCartStore";
import { useOrderHook } from "../../hooks/client/OrderHook";
import OrderSummary from "./items/OrderSummary";
import { toast } from "sonner";
import ModalPayment from "./items/ModalPayment";
import { z } from "zod";

const checkoutSchema = z.object({
  address: z
    .string()
    .min(5, "Địa chỉ nhận hàng quá ngắn, vui lòng nhập cụ thể hơn!"),
  phone: z
    .string()
    .regex(
      /^0[0-9]{9}$/,
      "Số điện thoại không hợp lệ! Vui lòng nhập đúng 10 số (Bắt đầu bằng số 0).",
    ),
});

// 👇 Đổi tên CheckOutPage cũ thành CheckOutContent
const CheckOutContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const checkoutType = searchParams.get("type") || "buy_now";
  const isBuyNowFlow = checkoutType === "buy_now";

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "qr_code">(
    "cash",
  );

  const [showQRModal, setShowQRModal] = useState(false);
  const [createdOrderInfo, setCreatedOrderInfo] = useState<{
    id: string | number;
    total: number;
  } | null>(null);
  const isOrderedRef = useRef(false);

  const { cart } = useCartStore();
  const { setBuyNowItem, buyNowItem, handleCreateOrder, loading } =
    useOrderHook();

  useEffect(() => {
    if (!isBuyNowFlow) return;
    // Thêm một cái timeout cực ngắn để đợi quá trình redirect hoặc cập nhật state hoàn tất
    const checkSession = setTimeout(() => {
      if (isBuyNowFlow && !buyNowItem && !isOrderedRef.current) {
        toast.warning("Phiên giao dịch đã hết hạn, vui lòng chọn lại món!");
        router.push("/");
      }
    }, 100); // 100ms là đủ để nó "né" cái lúc dữ liệu vừa bị null

    return () => clearTimeout(checkSession);
  }, [isBuyNowFlow, buyNowItem, router]);

  const displayItems = isBuyNowFlow
    ? buyNowItem
      ? [buyNowItem]
      : []
    : cart?.items || [];

  const displayTotalPrice = isBuyNowFlow
    ? Number(
        buyNowItem?.total_price ||
          Number(buyNowItem?.unit_price || 0) *
            Number(buyNowItem?.quantity || 1),
      )
    : Number(cart?.total_price || 0);

  const handleUpdateBuyNowQuantity = (id: number | string, qty: number) => {
    if (buyNowItem) {
      const unitPrice = Number(buyNowItem.unit_price || 0);
      setBuyNowItem({
        ...buyNowItem,
        quantity: qty,
        total_price: unitPrice * qty,
      });
    }
  };

  const onSubmitOrder = async () => {
    if (!displayItems || displayItems.length === 0) {
      toast.error("Không có sản phẩm nào để thanh toán!");
      return;
    }

    const validationResult = checkoutSchema.safeParse({ address, phone });
    if (!validationResult.success) {
      validationResult.error.issues.forEach((issue) => {
        toast.warning(issue.message);
      });
      return;
    }

    let orderResult: any = null;

    if (isBuyNowFlow) {
      if (!buyNowItem) {
        toast.error("Không tìm thấy thông tin sản phẩm!");
        return;
      }
      orderResult = await handleCreateOrder({
        checkout_type: "buy_now",
        product_id: buyNowItem.product_id,
        quantity: buyNowItem.quantity,
        image_url: buyNowItem.image_url,
        size_id: buyNowItem.size_id ?? null,
        topping_ids: buyNowItem.topping_ids?.map(Number) || [],
        shipping_address: address,
        shipping_phone: phone,
        payment_method: paymentMethod,
        note: note || undefined,
      });
    } else {
      orderResult = await handleCreateOrder({
        checkout_type: "cart",
        shipping_address: address,
        shipping_phone: phone,
        payment_method: paymentMethod,
        note: note || undefined,
      });
    }

    if (orderResult && orderResult.success) {
      isOrderedRef.current = true;

      if (paymentMethod === "qr_code") {
        setCreatedOrderInfo({
          id: orderResult.data.order_id,
          total: displayTotalPrice,
        });
        setShowQRModal(true);
      } else {
        toast.success("Đặt hàng thành công! 🎉");
        router.push("/");
      }
    } else {
      toast.error("Có lỗi xảy ra khi tạo đơn hàng!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Thanh Toán</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin className="text-primary" /> Thông tin giao hàng
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Số điện thoại
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="tel"
                    maxLength={10}
                    pattern="[0-9]*"
                    value={phone}
                    onChange={(e) => {
                      const onlyNums = e.target.value.replace(/\D/g, "");
                      setPhone(onlyNums);
                    }}
                    placeholder="VD: 0987654321"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Địa chỉ nhận hàng
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="VD: Số 123, Ngõ 456, Đường Láng, Hà Nội"
                  className="w-full p-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all h-24 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Ghi chú (Tùy chọn)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="VD: Giao giờ hành chính, ít đá..."
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
            </form>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Wallet className="text-primary" /> Phương thức thanh toán
            </h2>
            <div className="space-y-3">
              <div
                onClick={() => setPaymentMethod("cash")}
                className={`p-4 border rounded-lg cursor-pointer flex items-center gap-4 transition-all
                  ${paymentMethod === "cash" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  💵
                </div>
                <div className="flex-1">
                  <p className="font-semibold">
                    Thanh toán khi nhận hàng (COD)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Trả tiền mặt cho shipper
                  </p>
                </div>
                {paymentMethod === "cash" && (
                  <div className="w-4 h-4 bg-primary rounded-full" />
                )}
              </div>

              <div
                onClick={() => setPaymentMethod("qr_code")}
                className={`p-4 border rounded-lg cursor-pointer flex items-center gap-4 transition-all
                  ${paymentMethod === "qr_code" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <CreditCard size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">
                    Chuyển khoản Ngân hàng (QR Code)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Quét mã VietQR tiện lợi
                  </p>
                </div>
                {paymentMethod === "qr_code" && (
                  <div className="w-4 h-4 bg-primary rounded-full" />
                )}
              </div>
            </div>
          </div>
        </div>

        <OrderSummary
          items={displayItems}
          isLoading={loading}
          displayTotalPrice={displayTotalPrice}
          handlePlaceOrder={onSubmitOrder}
          handleUpdateQuantity={
            isBuyNowFlow ? handleUpdateBuyNowQuantity : undefined
          }
        />
      </div>

      {showQRModal && createdOrderInfo && (
        <ModalPayment
          setShowQRModal={setShowQRModal}
          createdOrderInfo={createdOrderInfo}
        />
      )}
    </div>
  );
};

// 👇 TẠO COMPONENT BỌC SUSPENSE MỚI Ở ĐÂY ĐỂ TRÁNH LỖI NEXT.JS
const CheckOutPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin w-8 h-8 text-primary" />
        </div>
      }
    >
      <CheckOutContent />
    </Suspense>
  );
};

export default CheckOutPage;
