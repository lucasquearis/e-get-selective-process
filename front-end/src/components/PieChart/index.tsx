import { useContext, useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import { PersonalThemeContext } from "../../context/PesonalThemeProvider";
import { IProductsChart } from "../../pages/Home/Dashboard";
import { toRealCurrency } from "../../utils/functions";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${toRealCurrency(value)}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Porcentagem: ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

function StyledPieChart({ products }: IProductsChart) {
  const theme = useContext(PersonalThemeContext);
  const [state, setState] = useState({ activeIndex: 0 });
  const data = useMemo(
    () =>
      Object.values(products)
        .map((product) => {
          let loss = 0;
          let profit = 0;

          if (product.soldProducts) {
            product.soldProducts.forEach(({ costPrice, salePrice }) => {
              if (Number(salePrice) - Number(costPrice) > 0) {
                profit += Number(salePrice) - Number(costPrice);
              } else {
                loss += Number(costPrice) - Number(salePrice);
              }
            });
          }

          if (product.expiredProducts) {
            product.expiredProducts.forEach(({ costPrice }) => {
              loss += Number(costPrice);
            });
          }

          if (product.expiredProducts) {
            product.expiredProducts.forEach(({ costPrice }) => {
              loss += Number(costPrice);
            });
          }
          return { loss, profit };
        })
        .reduce(
          (acc, curr) => {
            acc[0].value += curr.profit;
            acc[1].value += curr.loss;
            return acc;
          },
          [
            { name: "Entrada", value: 0 },
            { name: "Saída", value: 0 },
          ]
        ),
    [products]
  );

  const COLORS = [theme.color.success, theme.color.error];

  const onPieEnter = (_: any, index: number) => {
    setState({
      activeIndex: index,
    });
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={500} height={500}>
        <Pie
          activeIndex={state.activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default StyledPieChart;
