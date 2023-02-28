import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { IProductsChart } from "../../pages/Home/Dashboard";
import moment from "moment";
import { IProduct } from "../../utils/api";
import { useContext, useMemo } from "react";
import { PersonalThemeContext } from "../../context/PesonalThemeProvider";

const convertName = {
  activeProducts: "Custo produto ativo",
  lostProducts: "Custo produto perdido",
  soldProducts: "Custo produto vendido",
  expiredProducts: "Custo produto vencido",
};

function StyledChartProducts({ products }: IProductsChart) {
  const theme = useContext(PersonalThemeContext);
  console.log(theme);
  const data = useMemo(
    () =>
      Object.entries(products)
        .sort((a, b) =>
          moment(a[0], "DD/MM/YYYY").diff(moment(b[0], "DD/MM/YYYY"))
        )
        .map((item) => {
          const sumCostPrice = (key: number) =>
            // @ts-ignore
            Object.values(item)[1][Object.keys(item[1])[key]].reduce(
              (total: number, product: IProduct) => {
                return total + parseFloat(product.costPrice);
              },
              0
            );
          if (Object.keys(item[1])[1] && Object.keys(item[1])[2]) {
            return {
              name: item[0],
              // @ts-ignore
              [convertName[Object.keys(item[1])[0]]]: sumCostPrice(0),
              // @ts-ignore
              [convertName[Object.keys(item[1])[1]]]: sumCostPrice(1),
              // @ts-ignore
              [convertName[Object.keys(item[1])[2]]]: sumCostPrice(2),
            };
          }
          if (Object.keys(item[1])[1]) {
            return {
              name: item[0],
              // @ts-ignore
              [convertName[Object.keys(item[1])[0]]]: sumCostPrice(0),
              // @ts-ignore
              [convertName[Object.keys(item[1])[1]]]: sumCostPrice(1),
            };
          }
          return {
            name: item[0],
            // @ts-ignore
            [convertName[Object.keys(item[1])[0]]]: sumCostPrice(0),
          };
        }),
    [products]
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Custo produto perdido"
          stackId="1"
          stroke={theme.color.error}
          fill={theme.color.error}
          dot={{
            stroke: theme.color.error,
            strokeWidth: 1,
            r: 4,
            strokeDasharray: "",
          }}
        />
        <Area
          type="monotone"
          dataKey="Custo produto vencido"
          stackId="1"
          stroke={theme.color.neutral[600]}
          fill={theme.color.neutral[600]}
          dot={{
            stroke: theme.color.neutral[600],
            strokeWidth: 1,
            r: 4,
            strokeDasharray: "",
          }}
        />
        <Area
          type="monotone"
          dataKey="Custo produto vendido"
          stackId="1"
          stroke={theme.color.success}
          fill={theme.color.success}
          dot={{
            stroke: theme.color.success,
            strokeWidth: 1,
            r: 4,
            strokeDasharray: "",
          }}
        />
        <Area
          type="monotone"
          dataKey="Custo produto ativo"
          stackId="1"
          stroke={theme.color.brand[1000]}
          fill={theme.color.brand[1000]}
          dot={{
            stroke: theme.color.brand[1000],
            strokeWidth: 1,
            r: 4,
            strokeDasharray: "",
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default StyledChartProducts;
