import { ProfileMenu } from "../ProfileMenu/ProfileMenu"

export function Header({ pageName }) {
  return (
    <header className="w-full pb-6 flex justify-between">
        <h1 className="font-poppins text-[#151D48] text-[27px] font-semibold">{pageName}</h1>
        <ProfileMenu />
    </header>

  )
}

