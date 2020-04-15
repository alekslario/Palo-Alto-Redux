import $ from "./_Table";
import { css } from "styled-components";
const Table = ({ info }) => {
  return (
    <$.Table>
      {Object.keys(info)
        .filter(el => info[el])
        .map((el, index) => (
          <$.Row
            key={index}
            css={`
              ${index > 0
                ? css`
                    margin-top: 0.85714em;
                    padding-top: 0.85714em;
                    border-top: 1px solid
                      ${({ theme }) => theme.checkout.sideColors.gamma};
                  `
                : ""}
            `}
          >
            <$.Column
              css={`
                flex: 1;
                @media (min-width: 750px) {
                  flex-direction: row;
                }
              `}
            >
              <$.FieldName>{el}</$.FieldName>
              <$.Record>{info[el]}</$.Record>
            </$.Column>
            <$.Action>
              <button>Change</button>
            </$.Action>
          </$.Row>
        ))}
    </$.Table>
  );
};

export default Table;
