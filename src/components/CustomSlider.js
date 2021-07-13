import { Slider, Tooltip, withStyles } from "@material-ui/core";
import Brackets from "../assets/brackets.svg";

const StyledSlider = withStyles({
  root: {
    color: "#DBDBDB",
    height: "5px",
  },
  rail: {
    height: "5px",
  },
  track: {
    color: "#024C88",
    height: "5px",
  },
  mark: {
    height: "5px",
    width: "5px",
    color: "#ffffff",
    borderRadius: "0",
    opacity: "1",
  },
  thumb: {
    width: "27px",
    height: "27px",
    backgroundColor: "#999999",
    marginTop: "-10px",
    transition: "none",
    "&&::before": {
      content: '""',
      width: "13px",
      height: "6px",
      backgroundImage: `url(${Brackets})`,
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
    },
    "&:hover, &.Mui-focusVisible, &.focused:not(.Mui-focusVisible):not($checked), &.MuiSlider-active":
      {
        boxShadow: "none",
      },
  },
  markLabel: {
    transform: "none",
    top: "33px",
    fontFamily: '"Roboto", sans-serif',
    fontSize: "10px",
    color: "#999",
    fontWeight: "bold",
  },
})(Slider);
const CustomTooltip = withStyles({
  tooltip: {
    backgroundColor: "#024C88",
    borderRadius: 0,
    fontSize: "12px",
    maxWidth: "250px",
    textAlign: "center",
    padding: "15px 20px",
    lineHeight: "120%",
  },
  arrow: {
    color: "#024C88",
  },
})(Tooltip);

export default function CustomSlider(props) {
  const message = props.plan.recNextPlan;
  const threshold = props.plan.recNextPlanAt;
  const CustomValueLabel = (props) => {
    if (props.value >= threshold) {
      return (
        <CustomTooltip title={
          <div dangerouslySetInnerHTML={{__html: message}}></div>
        } arrow>
          {props.children}
        </CustomTooltip>
      );
    } else {
      return props.children;
    }
  };
  return (
    <StyledSlider
      {...props}
      step={props.plan.step}
      marks={props.plan.marks}
      max={props.plan.max}
      min={props.plan.min}
      valueLabelDisplay="on"
      ValueLabelComponent={CustomValueLabel}
    />
  );
}
