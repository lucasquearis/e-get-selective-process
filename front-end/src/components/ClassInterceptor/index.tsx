import { useMemo } from "react";
import { useAppSelector } from "../../hooks";
import Stock from "../../pages/Home/Stock";
import { MOBILE_WIDTH } from "../../utils/constants";

function ClassInterceptor() {
  const { dimensions } = useAppSelector((state) => state);
  const isMobile = useMemo(
    () => dimensions.width < MOBILE_WIDTH,
    [dimensions.width]
  );
  return <Stock isMobile={isMobile} dimensions={dimensions} />;
}

export default ClassInterceptor;
