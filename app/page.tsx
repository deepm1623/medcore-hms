"use client";

import Image from "next/image";
import { ArrowRight, ShieldCheck, Stethoscope } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/login/doctor");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Main Content */}
      <div className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-2xl text-center">

          {/* =========================================
              EYEBROW
          ========================================= */}
          <p
            className="
              mb-6
              text-xs
              font-semibold
              uppercase
              tracking-[0.35em]
              text-cyan-400
              sm:text-sm
              sm:tracking-[0.4em]
            "
          >
            Hospital Management System
          </p>

          {/* =========================================
              LOGO
          ========================================= */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              {/* Glow behind logo */}
              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  bg-cyan-500/10
                  blur-3xl
                "
              />

              <Image
                src="/medcore-logo.png"
                alt="MedCore HMS"
                width={320}
                height={144}
                priority
                className="
                  relative
                  h-28
                  w-auto
                  object-contain
                  drop-shadow-[0_0_24px_rgba(6,182,212,0.18)]
                  sm:h-36
                "
              />
            </div>
          </div>

          {/* =========================================
              BRAND NAME
          ========================================= */}
          <h1
            className="
              text-5xl
              font-bold
              tracking-tight
              text-white
              sm:text-6xl
              md:text-7xl
            "
          >
            MedCore
          </h1>

          {/* =========================================
              DESCRIPTION
          ========================================= */}
          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              text-base
              leading-7
              text-slate-400
              sm:text-lg
              sm:leading-8
            "
          >
            Unified healthcare management platform designed
            to simplify clinical workflows and patient care.
          </p>

          {/* =========================================
              SIGN IN BUTTON
          ========================================= */}
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={handleSignIn}
              className="
                group
                flex
                h-14
                w-full
                max-w-xs
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                px-6
                text-base
                font-semibold
                text-white
                shadow-xl
                shadow-blue-500/20
                transition-all
                duration-300
                hover:from-cyan-400
                hover:to-blue-500
                hover:shadow-2xl
                hover:shadow-cyan-500/20
                active:scale-[0.98]
                sm:max-w-sm
              "
            >
              <ShieldCheck
                size={20}
                strokeWidth={2}
              />

              <span>
                Sign In to Dashboard
              </span>

              <ArrowRight
                size={20}
                strokeWidth={2}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </button>
          </div>

          {/* =========================================
              SECURITY INFORMATION CARD
          ========================================= */}
          <div
            className="
              mx-auto
              mt-10
              flex
              w-full
              max-w-lg
              items-center
              gap-4
              rounded-2xl
              border
              border-white/[0.08]
              bg-white/[0.025]
              p-4
              text-left
              backdrop-blur-xl
              sm:p-5
            "
          >
            {/* Icon */}
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-cyan-500/10
                text-cyan-400
              "
            >
              <Stethoscope
                size={23}
                strokeWidth={1.8}
              />
            </div>

            {/* Text */}
            <div className="min-w-0">
              <p
                className="
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Secure Clinical Dashboard
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-slate-500
                  sm:text-sm
                "
              >
                Sign in using your assigned portal credentials.
              </p>
            </div>
          </div>

          {/* =========================================
              FOOTER
          ========================================= */}
          <p
            className="
              mt-10
              text-xs
              text-slate-600
            "
          >
            © 2026 MedCore HMS
          </p>
        </div>
      </div>
    </main>
  );
}