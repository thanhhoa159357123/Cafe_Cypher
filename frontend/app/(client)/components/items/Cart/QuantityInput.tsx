import { useState, useEffect, useRef } from "react";
import { Minus, Plus } from "lucide-react";

const QuantityInput = ({
  currentQuantity,
  itemId,
  onUpdate,
}: {
  currentQuantity: number;
  itemId: string | number;
  onUpdate: (id: number, qty: number) => void;
}) => {
  const [value, setValue] = useState(currentQuantity.toString());
  // Sử dụng ref để lưu trữ timeout debounce (Tránh gọi API liên tục gây lag)
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setValue(currentQuantity.toString());
  }, [currentQuantity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue)) {
      setValue(inputValue); // => UI Cập nhật NGAY LẬP TỨC

      const numberValue = parseInt(inputValue);
      if (!isNaN(numberValue) && numberValue > 0) {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        // Chờ 300ms người dùng gõ xong mới gọi onUpdate (gọi API + State)
        debounceRef.current = setTimeout(() => {
          onUpdate(
            typeof itemId === "number" ? itemId : parseInt(itemId),
            numberValue,
          );
        }, 500);
      }
    }
  };

  const handleBlur = () => {
    if (value === "" || parseInt(value) === 0) {
      setValue("1");
      onUpdate(typeof itemId === "number" ? itemId : parseInt(itemId), 1);
    } else {
      setValue(parseInt(value).toString());
    }
  };

  const handleDecrease = () => {
    const currentVal = parseInt(value) || 0;
    if (currentVal > 1) {
      const newVal = currentVal - 1;
      setValue(newVal.toString()); // UI phản hồi lập tức 0 ms

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onUpdate(
          typeof itemId === "number" ? itemId : parseInt(itemId),
          newVal,
        );
      }, 300);
    }
  };

  const handleIncrease = () => {
    const currentVal = parseInt(value) || 0;
    const newVal = currentVal + 1;
    setValue(newVal.toString()); // UI phản hồi lập tức 0 ms

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onUpdate(typeof itemId === "number" ? itemId : parseInt(itemId), newVal);
    }, 300);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleDecrease}
        disabled={currentQuantity <= 1}
        className="p-2 hover:bg-accent rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ease-in-out"
      >
        <Minus className="w-4 h-4" />
      </button>

      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-12 text-center font-medium bg-transparent border-b border-transparent focus:border-primary focus:outline-none transition-all"
      />

      <button
        type="button"
        onClick={handleIncrease}
        className="p-2 hover:bg-accent rounded-md transition-all duration-300 cursor-pointer ease-in-out"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default QuantityInput;
