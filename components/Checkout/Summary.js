import useDeliverCart from "../../utils/useDeliverCart";
import $ from "./_Summary";
import Image from "../_App/Image";
const Summary = () => {
  const [products] = useDeliverCart();

  return (
    <$.Wrapper>
      {products.map(
        (
          { contentId, productId, name, style, price, quantity, image },
          index
        ) => (
          <div>
            <div
              css={`
                width: 4.6em;
                height: 4.6em;
                border-radius: 8px;
                background: #fff;
                position: relative;
              `}
            >
              <Image url={image} thumb={true} />
            </div>
          </div>
        )
      )}
    </$.Wrapper>
  );
};

export default Summary;
