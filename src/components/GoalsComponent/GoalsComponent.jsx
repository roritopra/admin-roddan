import { NavLink } from "react-router-dom";

export function GoalsComponent({ name, description}) {
  return (
    <article
      className={`relative w-full flex flex-col  justify-center bg-[#F0F0F0] px-5 pb-9 pt-14 rounded-xl mt-10`}
    >
      <img
        className="absolute left-5 top-5"
        src="icons/goals-icon.svg"
        alt="Today sale icon"
      />
      <h3 className="font-poppins text-[#151D48] text-lg font-semibold">
        {name}
      </h3>
      <p className="font-poppins text-[#425166] text-sm mt-2">{description}</p>
      <NavLink
        to={"/orders"}
        className="font-poppins text-[#4079ED] text-sm mt-2 hover:text-[#456bb6]"
      >
        Orders
      </NavLink>
    </article>
  );
}
