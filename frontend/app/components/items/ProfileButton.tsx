import { User } from "@/app/types/auth";
import { LogOut, Settings } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ProfileButtonProps {
  user: User;
  logOut: () => void;
}

const ProfileButton = ({ user, logOut }: ProfileButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogOut = () => {
    logOut();
    toast.success("Hẹn gặp lại bạn sau nhé!");
  };
  return (
    <div className="relative">
      <button
        type="button"
        title="User Profile"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-amber-600 hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer z-20 bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center"
      >
        <span className="text-white font-bold text-sm uppercase">
          {user.last_name?.[0]}
          {user.first_name?.[0]}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-stone-100 z-20 overflow-hidden py-2"
            >
              <div className="px-4 py-3 border-b border-stone-50">
                <p className="font-bold text-stone-800 line-clamp-1">
                  {user.last_name} {user.first_name}
                </p>
                <p className="text-xs text-stone-500 line-clamp-1">
                  {user.email}
                </p>
              </div>

              <button
                onClick={() => {
                  router.push("#");
                  setIsOpen(false);
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
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileButton;
