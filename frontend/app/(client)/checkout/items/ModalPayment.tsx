import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface ModalPaymentProps {
  setShowQRModal: React.Dispatch<React.SetStateAction<boolean>>;
  createdOrderInfo: { id: string | number; total: number };
}

const ModalPayment = ({
  createdOrderInfo,
  setShowQRModal,
}: ModalPaymentProps) => {
  const router = useRouter();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl animate-in fade-in zoom-in duration-200">
        <h3 className="text-xl font-bold mb-2 text-foreground">
          Thanh toán đơn hàng
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Vui lòng dùng App Ngân hàng quét mã dưới đây để thanh toán.
        </p>

        <div className="bg-gray-50 p-4 rounded-xl mb-6 inline-block border border-gray-100">
          <img
            src={`https://img.vietqr.io/image/MB-0987654321-compact2.jpg?amount=${createdOrderInfo.total}&addInfo=Thanh toan don hang ${createdOrderInfo.id}&accountName=NGUYEN VAN A`}
            alt="QR Payment"
            className="w-48 h-48 mx-auto"
          />
        </div>

        <div className="space-y-3 mb-6 bg-primary/5 p-4 rounded-lg text-left">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Số tiền:</span>
            <span className="font-bold text-primary">
              {createdOrderInfo.total.toLocaleString("vi-VN")}₫
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Nội dung:</span>
            <span className="font-bold">
              Thanh toan don {createdOrderInfo.id}
            </span>
          </div>
        </div>

        {/* 👇 Đây là nút báo thành công đơn giản như ông giáo muốn */}
        <button
          onClick={() => {
            setShowQRModal(false);
            toast.success(
              "Bạn đã thanh toán thành công! Quán đang chuẩn bị món. 🎉",
            );
            router.push("/");
          }}
          className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90 transition-all"
        >
          Tôi đã chuyển khoản xong
        </button>
      </div>
    </div>
  );
};

export default ModalPayment;
