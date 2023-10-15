import { useMedia } from "react-use";
import { toSizeUnit } from "../Components/UI/css/toSizeUnit.js";

export const useIsScreenWidthLessThan = (width) => {
  return useMedia(`(max-width: ${toSizeUnit(width)})`, false);
}