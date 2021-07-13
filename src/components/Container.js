import styled from "styled-components";
const Wrapper = styled.div`
  border: 2px solid #999999;
  border-radius: 20px;
  padding: 3em 2.5em;
`;
const Asterisk = styled.span`
  display: block;
  font-size: 9px;
  color: #999;
  margin-top: 1.5em;
  &:before{
    content: '(*)';
    color: #FD5739;
  }
`;
function Container(props) {
  return (
    <>
      <Wrapper>{props.children}</Wrapper>
      <Asterisk>El precio corresponde al pago de forma anual.</Asterisk>
    </>
  );
}

export default Container;
