import React from "react";

const ActionButton = () => {
  return (
    <div className="p-6 pt-4 border-t border-border bg-background flex gap-3">
      <button className="flex-1 py-3.5 px-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/70 transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer">
        Thêm vào giỏ hàng
      </button>
      <button className="flex-1 py-3.5 px-4 bg-background text-primary border-2 border-primary rounded-xl font-semibold hover:bg-primary/20 transition-colors duration-200 shadow-md  hover:shadow-xl cursor-pointer">
        Mua ngay
      </button>
    </div>
  );
};

export default ActionButton;
