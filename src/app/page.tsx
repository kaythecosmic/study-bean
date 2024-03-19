import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="relative isolate">
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-[100px]'>
          <div
            style={{
              clipPath:
                'polygon(9% 39%, 7% 30%, 8% 18%, 15% 8%, 23% 7%, 34% 10%, 45% 5%, 52% 5%, 57% 18%, 61% 22%, 62% 29%, 53% 38%, 49% 29%, 43% 42%, 48% 52%, 59% 63%, 71% 51%, 77% 33%, 80% 23%, 88% 20%, 94% 34%, 94% 50%, 91% 61%, 88% 77%, 86% 84%, 80% 92%, 66% 82%, 58% 91%, 51% 92%, 43% 78%, 34% 76%, 29% 72%, 24% 73%, 21% 81%, 14% 89%, 9% 84%, 8% 67%, 16% 54%, 17% 44%, 13% 38%)',
            }}
            className='relative h-screen left-[calc(50%)] aspect-[16/9] w-full -translate-x-1/2 bg-rPS opacity-[0.30] sm:w-screen'
          />
        </div>
      </div>

      <MaxWidthWrapper className="h-screen">
        <div className="h-full flex flex-col gap-5 items-center justify-center">
          <h1 className="w-full text-6xl font-extrabold text-center md:text-7xl lg:text-9xl">StudyBean.</h1>
          <Link href="/pomodoro" className="mt-10 flex items-center justify-center gap-2 text-xl font-bold bg-accent-0 p-2 px-4 rounded-md text-white">Try Pomodoro<ArrowTopRightIcon className=" scale-[1.4]" /></Link>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
