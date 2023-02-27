import Footer from "../Footer";
import Header from "../Header";
import { useAppDispatch } from "../../hooks";
import { DefaultContent } from "../../components/DefaultContent";
import { ReactNode, useEffect } from "react";
import { setDimensions } from "../../redux/reducers/dimensionsResize";

function DefaultWrapper({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function handleResize() {
      dispatch(
        setDimensions({
          height: window.innerHeight,
          width: window.innerWidth,
        })
      );
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header />
      <DefaultContent>{children}</DefaultContent>
      <Footer />
    </>
  );
}

export default DefaultWrapper;
