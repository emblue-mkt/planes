import styled from "styled-components";
import { Radio, withStyles } from "@material-ui/core";

const Icon = styled.span`
    width: 18px;
    height: 18px;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid #999999;
`
const Checked = styled(Icon)`
    background-color: #025588;
    border: 0;
`
const MyRadio = withStyles({
  colorSecondary: {
    '&.Mui-checked:hover, &:hover':{
      backgroundColor: "transparent"
    }
  }
})(Radio)

function StyledRadio(props) {
  return <MyRadio checkedIcon={<Checked/>} icon={<Icon />} disableRipple={true} {...props}/>;
}

export default StyledRadio;
