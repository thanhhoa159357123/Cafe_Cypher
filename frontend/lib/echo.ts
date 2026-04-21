import Echo from "laravel-echo";
import Pusher from "pusher-js";

// Cần thiết để Echo hiểu cách giao tiếp qua Reverb
if (typeof window !== "undefined") {
  (window as any).Pusher = Pusher;
}

const echo =
  typeof window !== "undefined"
    ? new Echo({
        broadcaster: "reverb",
        key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
        wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
        wsPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT),
        forceTLS: false, // Vì đang chạy localhost (http) nên để false
        enabledTransports: ["ws", "wss"],
      })
    : null;

export default echo;
