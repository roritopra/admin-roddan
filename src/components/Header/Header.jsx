import { ProfileMenu } from "../ProfileMenu/ProfileMenu"

export function Header({ pageName }) {
  return (
    <header className="pt-6 mb-10">
      <header className="w-full flex justify-between">
          <h1 className="font-poppins text-[#151D48] text-[27px] font-semibold">{pageName}</h1>
          <ProfileMenu />
      </header>
    </header>
  )
}

