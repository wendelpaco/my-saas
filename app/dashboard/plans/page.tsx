import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardLayout from "../components/DashboardLayout";
import PlanCard from "./components/PlanCard";

const plans = [
  {
    planId: "plan_free",
    title: "Gratuíto",
    description: "Receberá até 05 entradas diárias",
    price: 0.0,
    highlighted: false,
  },
  {
    planId: "plan_basic",
    title: "Básico",
    description: "Receberá até 20 entradas diárias",
    price: 50.0,
    highlighted: true,
  },
  {
    planId: "plan_premium",
    title: "Premium",
    description: "Receberá até 100 entradas diárias",
    price: 89.99,
    highlighted: false, // 🔥 Destaque esse plano
  },
];

export default async function Plans() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/login");
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center gap-6 p-6">
        <h1 className="text-2xl font-bold">Escolha seu Plano</h1>
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard
              key={plan.planId}
              planId={plan.planId}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              highlighted={plan.highlighted || false}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
