"use client";

import {
  Bell,
  ChevronDown,
  Menu,
  Search,
} from "lucide-react";

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({
  onMenuClick,
}: TopbarProps) {
  const handleMenuClick = () => {
    // If parent provides a handler, use it.
    if (onMenuClick) {
      onMenuClick();
      return;
    }

    // Otherwise communicate directly with Sidebar.
    window.dispatchEvent(
      new Event("medcore:toggle-sidebar")
    );
  };

  return (
    <header
      className="
        sticky
        top-0
        z-50
        h-[76px]
        w-full
        border-b
        border-white/[0.08]
        bg-slate-950/95
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          h-full
          w-full
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        "
      >

        {/* =====================================================
            MOBILE LEFT
        ====================================================== */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
            lg:hidden
          "
        >

          {/* Hamburger */}

          <button
            type="button"
            onClick={handleMenuClick}
            aria-label="Open navigation menu"
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-cyan-400/30
              bg-slate-900
              text-slate-300
              shadow-[0_0_24px_rgba(6,182,212,0.18)]
              transition-all
              duration-200
              hover:border-cyan-400/60
              hover:bg-slate-800
              hover:text-cyan-400
              hover:shadow-[0_0_30px_rgba(6,182,212,0.30)]
              active:scale-95
            "
          >
            <Menu
              size={25}
              strokeWidth={2}
            />
          </button>

          {/* Brand */}

          <div className="min-w-0">
            <p
              className="
                truncate
                text-base
                font-semibold
                leading-tight
                text-white
              "
            >
              MedCore
            </p>

            <p
              className="
                truncate
                text-xs
                leading-tight
                text-slate-500
              "
            >
              Doctor Portal
            </p>
          </div>
        </div>

        {/* =====================================================
            DESKTOP SEARCH
        ====================================================== */}

        <div
          className="
            hidden
            flex-1
            lg:flex
          "
        >
          <div
            className="
              relative
              w-full
              max-w-xl
            "
          >
            <Search
              size={19}
              strokeWidth={1.8}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-500
              "
            />

            <input
              type="search"
              placeholder="Search patients, appointments..."
              className="
                h-12
                w-full
                rounded-xl
                border
                border-white/[0.10]
                bg-white/[0.035]
                pl-11
                pr-4
                text-sm
                text-white
                outline-none
                placeholder:text-slate-500
                transition-all
                duration-200
                focus:border-cyan-400/50
                focus:bg-white/[0.05]
                focus:ring-2
                focus:ring-cyan-400/10
              "
            />
          </div>
        </div>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-2
            sm:gap-4
          "
        >

          {/* ===================================================
              NOTIFICATIONS
          ==================================================== */}

          <button
            type="button"
            aria-label="Notifications"
            className="
              relative
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              text-slate-400
              transition-all
              duration-200
              hover:bg-white/[0.05]
              hover:text-cyan-400
            "
          >
            <Bell
              size={23}
              strokeWidth={1.8}
            />

            {/* Notification indicator */}

            <span
              className="
                absolute
                right-[7px]
                top-[6px]
                h-2.5
                w-2.5
                rounded-full
                bg-cyan-400
                ring-2
                ring-slate-950
              "
            />
          </button>

          {/* Divider */}

          <div
            className="
              hidden
              h-9
              w-px
              bg-white/[0.10]
              sm:block
            "
          />

          {/* ===================================================
              DOCTOR PROFILE
          ==================================================== */}

          <button
            type="button"
            aria-label="Doctor profile"
            className="
              flex
              items-center
              gap-2
              rounded-xl
              px-1
              py-1.5
              text-left
              transition-all
              duration-200
              hover:bg-white/[0.04]
            "
          >

            {/* Avatar */}

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-cyan-400
                to-blue-600
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-blue-500/20
              "
            >
              DR
            </div>

            {/* Doctor details */}

            <div
              className="
                hidden
                min-w-0
                md:block
              "
            >
              <p
                className="
                  truncate
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Doctor Name
              </p>

              <p
                className="
                  truncate
                  text-xs
                  text-slate-500
                "
              >
                General Medicine
              </p>
            </div>

            {/* Arrow */}

            <ChevronDown
              size={17}
              strokeWidth={1.8}
              className="
                hidden
                text-slate-500
                md:block
              "
            />
          </button>
        </div>
      </div>
    </header>
  );
}