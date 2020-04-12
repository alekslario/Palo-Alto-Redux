import $ from "./_Shipping";
const Shipping = ({
  email = "aleksandlario@gmail.com",
  address = "303 BURGES ROAD, EAST HAM, LONDON., London, E6 2ES, United Kingdom"
}) => (
  <$.Wrapper>
    <$.Table>
      <$.Row>
        <$.Column
          css={`
            @media (min-width: 750px) {
              flex-direction: row;
            }
          `}
        >
          <div>Ship to</div>
          <div>{address}</div>
        </$.Column>
        <button>Change</button>
      </$.Row>
    </$.Table>
  </$.Wrapper>
);

export default Shipping;
