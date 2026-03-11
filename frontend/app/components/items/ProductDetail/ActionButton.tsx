import React from "react";

const ActionButton = () => {
  return (
    <div className="p-6 pt-4 border-t border-gray-200 bg-gray-50/50 flex gap-3">
      <button className="flex-1 py-3.5 px-4 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer">
        Thêm vào giỏ hàng
      </button>
      <button className="flex-1 py-3.5 px-4 bg-white text-orange-600 border-2 border-orange-500 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer">
        Mua ngay
      </button>
    </div>
  );
};

export default ActionButton;
