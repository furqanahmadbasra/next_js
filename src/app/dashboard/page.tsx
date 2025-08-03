import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/db";
import { formatPrice } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Table } from "lucide-react";
import { notFound } from "next/navigation";
import StatusDropDown from "./StatusDropDown";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!user || user.email !== ADMIN_EMAIL) {
    return notFound();
  }

  const order = await db.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      shippingAddress: true,
    },
  });

  const lastWeekSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    _sum: {
      amount: true,
    },
  });
  const lastMonthSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
    _sum: {
      amount: true,
    },
  });

  const WEEKLY_GOAL = 500;
  const MONTHLY_GOAL  = 2500

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="max-width-7xl w-full mx-auto flex flex-col sm:gap-4  sm:py-4">
        <div className="flex flex-col gap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>last week</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastWeekSum._sum.amount ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                of {formatPrice(WEEKLY_GOAL)} goal
              </CardContent>
              <CardFooter>
                <Progress
                  value={((lastWeekSum._sum.amount ?? 0) * 100) / WEEKLY_GOAL}
                />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>last month</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastMonthSum._sum.amount ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                of {formatPrice(MONTHLY_GOAL)} goal
              </CardContent>
              <CardFooter>
                <Progress
                  value={((lastMonthSum._sum.amount ?? 0) * 100) / MONTHLY_GOAL}
                />
              </CardFooter>
            </Card>
          </div>


          <h1 className="text-4xl font-bold tracking-tight">Incomming orders</h1>
          <Table >
            <TableHeader >
                <TableRow>
                    <TableHead >customer</TableHead>
                    <TableHead  className="hidden sm:table-cell">status</TableHead>
                    <TableHead  className="hidden sm:table-cell">purchase date</TableHead>
                    <TableHead  className="text-right">amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {order.map((order) =>(
                    <TableRow key={order.id} className="bg-accent">
                        <TableCell>
                            <div className="font-medium">
                                {order.shippingAddress?.name}
                            </div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                                {order.user?.email}
                            </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                            <StatusDropDown id={order.id} orderStatus={order.status}/>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            {order.createdAt.toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                            {formatPrice(order.amount)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Page;
