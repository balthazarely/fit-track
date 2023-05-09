import {
  SiTailwindcss,
  SiDaisyui,
  SiNextdotjs,
  SiPrisma,
  SiMongodb,
} from "react-icons/si";

export default function About() {
  return (
    <>
      <div className="">
        <div className="flex flex-col items-center gap-4">
          <div className="max-w-md text-center text-base relative ">
            Made with
            <div className="text-lg font-bold">
              NextJS 13 + MongoDB + Prisma + TailwindCSS + DaisyUI
            </div>
          </div>

          <div className="flex gap-4 z-50">
            <SiNextdotjs className="text-3xl text-primary" />
            <SiMongodb className="text-3xl text-primary" />
            <SiPrisma className="text-3xl text-primary" />
            <SiTailwindcss className="text-3xl text-primary" />
            <SiDaisyui className="text-3xl text-primary" />
          </div>
          <button className="btn btn-primary btn-outline mt-2">
            <a href="https://github.com/balthazarely/fit-track" target="_BLANK">
              Repo Link
            </a>
          </button>
        </div>
      </div>
    </>
  );
}
