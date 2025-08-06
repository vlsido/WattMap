import Svg, { Path, SvgProps } from "react-native-svg";
import { memo } from "react";
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? 36}
    height={props.height ?? 36}
    viewBox="0 0 36 36"
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="m13.5 33.75 2.25-11.25-9-3.375L22.5 2.25 20.25 13.5l9 3.375L13.5 33.75Z"
      opacity={0.2}
    />
    <Path
      fill="#000"
      d="M30.346 16.618a1.125 1.125 0 0 0-.704-.796l-8.101-3.04 2.061-10.311a1.125 1.125 0 0 0-1.925-.985L5.927 18.361a1.125 1.125 0 0 0 .422 1.828l8.105 3.04-2.056 10.3a1.126 1.126 0 0 0 1.925.985l15.75-16.875a1.124 1.124 0 0 0 .273-1.021ZM15.38 30.094l1.472-7.366a1.125 1.125 0 0 0-.703-1.274l-7.43-2.792 11.9-12.749-1.471 7.366a1.125 1.125 0 0 0 .703 1.274l7.425 2.785L15.38 30.094Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export { Memo as LightningIcon };
