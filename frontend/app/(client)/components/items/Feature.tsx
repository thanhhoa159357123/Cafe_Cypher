import Image from "next/image";

const Feature = () => {
  return (
    <div
      id="hero-section"
      className="flex flex-col bg-background relative mb-12 mt-4 items-center justify-center px-4"
    >
      {/* Welcome text with subtle styling */}
      <div className="text-center mb-6">
        <span className="text-3xl font-bold text-primary tracking-tight">
          Chào mừng quý khách
        </span>
        <p className="text-muted-foreground mt-2 max-w-md">
          Đến với không gian cà phê đậm chất nguyên bản
        </p>
      </div>

      {/* Image container with elegant border */}
      <div className="relative max-w-4xl w-full">
        <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-70"></div>
        <div className="relative overflow-hidden rounded-xl border-2 border-border mb-4">
          <Image
            src="/feature_coffee.jpg"
            alt="Featured Product - Cà phê đặc biệt"
            width={800}
            height={400}
            priority
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Feature;
