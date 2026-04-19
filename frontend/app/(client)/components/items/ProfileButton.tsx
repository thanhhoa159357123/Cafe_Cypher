import { User } from "@/app/types/client/auth";
import { LogOut, Settings, UserCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ProfileButtonProps {
  user: User;
  logOut: () => void | Promise<void>;
}

const ProfileButton = ({ user, logOut }: ProfileButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogOut = async () => {
    setIsOpen(false);
    await logOut();
    router.push("/");
    toast.success("Hẹn gặp lại bạn sau nhé!");
  };

  const getInitials = () => {
    const first = user?.first_name?.[0] || "";
    const last = user?.last_name?.[0] || "";
    return `${last}${first}`.toUpperCase();
  };

  const initials = getInitials();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        title="User Profile"
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-600 hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center"
      >
        {initials ? (
          <span className="text-white font-bold text-sm uppercase">
            {initials}
          </span>
        ) : (
          <UserCircle className="text-white w-6 h-6" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-stone-100 z-50 overflow-hidden py-2"
          >
            <div className="px-4 py-3 border-b border-stone-50">
              <p className="font-bold text-stone-800 line-clamp-1">
                {user?.last_name} {user?.first_name}
              </p>
              <p className="text-xs text-stone-500 line-clamp-1">
                {user?.email}
              </p>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                router.push("/account");
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-stone-700 hover:bg-amber-50 transition cursor-pointer"
            >
              <Settings size={18} className="text-amber-700" />
              Quản lý tài khoản
            </button>

            <div className="border-t border-stone-50 mt-1">
              <button
                onClick={handleLogOut}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
              >
                <LogOut size={18} />
                Đăng xuất
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileButton;
