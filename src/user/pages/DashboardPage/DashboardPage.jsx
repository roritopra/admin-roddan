import { Header } from "../../../components/Header/Header";
import { SalesComponent } from "../../../components/SalesComponent/SalesComponent";
import { GoalsComponent } from "../../../components/GoalsComponent/GoalsComponent";
import { NavLink } from "react-router-dom";
import "./DashboardPage.css";

export function DashboardPage() {
  return (
    <main className="flex flex-col w-full px-6 bg-[#F9FAFB]">
      <Header pageName="Dashboard" />
      <h1 className="font-poppins text-3xl text-[#151D48] mb-10">
        Hello, <span className="font-semibold">Daniel Caicedo</span>
      </h1>

      <section className="dashboard-grid">
        <div className="div1 bg-white p-6">
          <div>
            <h2 className="font-poppins text-[#151D48] text-lg font-semibold">
              Today’s Sales
            </h2>
            <p className="font-poppins text-[#737791] text-sm mt-2">
              Sales Summery
            </p>
            <div className="flex items-center justify-between gap-7">
              <SalesComponent
                total={"$2,500"}
                description={"Total Sales"}
                bgColor={"bg-[#CDE6FF]"}
                icon={"icons/todays-icon.svg"}
                watch={"Watch the orders"}
                link={"/orders"}
              />
              <SalesComponent
                total={"$300"}
                description={"Total Orders"}
                bgColor={"bg-[#FFF0C6]"}
                icon={"icons/orders-icon.svg"}
                watch={"Watch the orders"}
                link={"/orders"}
              />
            </div>
          </div>
        </div>

        <div className="div2 bg-white p-6">
          <div>
            <h2 className="font-poppins text-[#151D48] text-lg font-semibold">
              This month’s Customers
            </h2>
            <p className="font-poppins text-[#737791] text-sm mt-2">
              Customers Summery
            </p>
            <div className="flex items-center justify-between gap-7">
              <SalesComponent
                total={"+8"}
                description={"New Customers"}
                bgColor={"bg-[#CBFFD2]"}
                icon={"icons/todays-icon.svg"}
                watch={"Watch the users"}
                link={"/users"}
              />
            </div>
          </div>
        </div>
        <div className="div3 bg-white p-6">
          <div>
            <h2 className="font-poppins text-[#151D48] text-lg font-semibold">
              Goals
            </h2>
            <p className="font-poppins text-[#737791] text-sm mt-2">
              For this 2024
            </p>
            <div className="flex items-center justify-between gap-7"></div>
          </div>
          <div className="flex justify-between items-center gap-7">
            <GoalsComponent
              name={"Weekly"}
              description={"Increase the sales in 20%"}
            />
            <GoalsComponent name={"Weekly"} description={"+84 orders"} />
            <GoalsComponent name={"Weekly"} description={"+1128 orders"} />
          </div>
        </div>
        <div className="div4 bg-white p-6">
          <div>
            <h2 className="font-poppins text-[#151D48] text-lg font-semibold">
              Revenue
            </h2>
            <p className="font-poppins text-[#737791] text-sm mt-2">
              Sales Summery
            </p>
            <div className="flex items-center justify-between gap-7">
              <article
                className={`relative w-full flex flex-col items-center justify-center bg-[#FFD8DA] h-full p-9 rounded-xl mt-10`}
              >
                <img
                  className="absolute left-5 top-5"
                  src="icons/revenue-icon.svg"
                  alt="Today sale icon"
                />
                <h3 className="font-poppins text-[#151D48] text-lg font-semibold">
                  Today
                </h3>
                <p className="font-poppins text-[#425166] text-4xl mt-2">
                  $3,493
                </p>
                <NavLink
                  to={"/orders"}
                  className="font-poppins text-[#4079ED] text-sm mt-2 hover:text-[#456bb6]"
                >
                  Wathch the orders
                </NavLink>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
