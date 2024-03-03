import { NavLink } from "react-router-dom"

export function SalesComponent({ icon, total, description, bgColor, link, watch }) {
    return (
      <article className={`relative w-full flex flex-col items-center justify-center ${bgColor} p-9 rounded-xl mt-10`}>
        <img
          className="absolute left-5 top-5"
          src={icon}
          alt="Today sale icon"
        />
        <h3 className="font-satoshi text-[#151D48] text-lg font-semibold">
          {total}
        </h3>
        <p className="font-satoshi text-[#425166] text-sm mt-2">
          {description}
        </p>
        <NavLink
          to={{ pathname: link }}
          className="font-satoshi text-[#4079ED] text-sm mt-2 hover:text-[#456bb6]"
        >
          {watch}
        </NavLink>
      </article>
    )
  }
