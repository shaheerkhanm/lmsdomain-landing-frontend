// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[80vh] justify-center flex flex-col items-center text-center pt-[100px] pb-[80px] font-manrope">
      <h1 className="font-bold lg:text-[56px] md:text-[36px] text-[30px] text-MainColor">404 – Page not found</h1>
      <p className="mb-[20px] xl:text-[20px]">Sorry, this page does not exist.</p>

      <Link href="/" className="border border-GreyMain rounded-[30px] hover:bg-MainColor hover:border-MainColor hover:text-white font-semibold  px-[20px] py-[10px] w-fit transition-all duration-200">Go back home</Link>
    </div>
  );
}
