import { MapPin, Phone, Wallet, CreditCard } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

interface FormInputProps {
  phone: string;
  address: string;
  note: string;
  paymentMethod: "COD" | "BANK_TRANSFER";
  setAddress: Dispatch<SetStateAction<string>>;
  setNote: Dispatch<SetStateAction<string>>;
  setPhone: Dispatch<SetStateAction<string>>;
  setPaymentMethod: Dispatch<SetStateAction<"COD" | "BANK_TRANSFER">>;
  handlePlaceOrder: () => void;
}

const FormInput = ({
  phone,
  address,
  note,
  paymentMethod,
  setAddress,
  setNote,
  setPhone,
  setPaymentMethod,
  handlePlaceOrder,
}: FormInputProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MapPin className="text-primary" /> Thông tin giao hàng
        </h2>
        <form onSubmit={handlePlaceOrder} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Số điện thoại
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
            onClick={() => setPaymentMethod("COD")}
            className={`p-4 border rounded-lg cursor-pointer flex items-center gap-4 transition-all ${
              paymentMethod === "COD"
                ? "border-primary bg-primary/5 ring-1 ring-primary"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              💵
            </div>
            <div className="flex-1">
              <p className="font-semibold">Thanh toán khi nhận hàng (COD)</p>
              <p className="text-sm text-muted-foreground">
                Trả tiền mặt cho shipper
              </p>
            </div>
            {paymentMethod === "COD" && (
              <div className="w-4 h-4 bg-primary rounded-full" />
            )}
          </div>

          <div
            onClick={() => setPaymentMethod("BANK_TRANSFER")}
            className={`p-4 border rounded-lg cursor-pointer flex items-center gap-4 transition-all ${
              paymentMethod === "BANK_TRANSFER"
                ? "border-primary bg-primary/5 ring-1 ring-primary"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <CreditCard size={20} />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Chuyển khoản Ngân hàng (QR Code)</p>
              <p className="text-sm text-muted-foreground">
                Quét mã VietQR tiện lợi
              </p>
            </div>
            {paymentMethod === "BANK_TRANSFER" && (
              <div className="w-4 h-4 bg-primary rounded-full" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FormInput);
