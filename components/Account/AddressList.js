import { useState, useRef } from "react";
import $ from "./_AddressList";
const { getCode, getName } = require("country-list");
import SubmitButton from "../_App/SubmitButton";
import ShippingAddress from "../Checkout/ShippingAddress";
import CheckBox from "../Checkout/CheckBox";
import contactServer from "../../utils/contactServer";
import cookie from "js-cookie";
import { useStore } from "../../utils/contextStore";

const defaultAddress = {
  _id: "",
  name: { value: "", error: "" },
  surname: { value: "", error: "" },
  address: { value: "", error: "" },
  addressOptional: { value: "", error: "" },
  city: { value: "", error: "" },
  country: { value: "US", error: "" },
  postcode: { value: "", error: "" },
  province: { value: "", error: "" },
  phone: { value: "", error: "" },
};

const AddressForm = ({
  handleDismiss,
  address = defaultAddress,
  type = "ADD ADDRESS",
}) => {
  const [_, dispatch] = useStore();
  const setDefault = useRef(null);
  const [shippingAddress, setShippingAddress] = useState(address);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    let [name, value] = [e.target.name, e.target.value];
    if (name === "country") {
      value = getCode(value);
    }
    setShippingAddress((prev) => ({ ...prev, [name]: { value, error: "" } }));
  };

  const handleAddAddress = async () => {
    setError("");
    setLoading(true);
    const { _id, ...rest } = shippingAddress;
    const token = cookie.get("token");
    const response = await contactServer({
      data: {
        shipAddress: {
          _id,
          setDefault: setDefault.current.checked,
          ...Object.entries(rest).reduce(
            (acc, [key, { value }]) => ((acc[key] = value), acc),
            {}
          ),
        },
      },
      method: "POST",
      auth: token,
      route: "account",
    });
    setLoading(false);
    if (response.status === 201) {
      dispatch({ type: "ADD_ADDRESS", address: response.data.address });
      handleDismiss();
    } else {
      if (response.data.errors) {
        const errors = response.data.errors;
        setShippingAddress(
          errors.reduce(
            (acc, ele) => {
              const [key, value] = Object.entries(ele)[0];
              acc[key].error = value;
              return acc;
            },
            { ...shippingAddress }
          )
        );
      } else {
        setError(response.data.message);
      }
    }
  };

  return (
    <>
      {type === "ADD ADDRESS" ? (
        <$.Title
          css={`
            display: block;
            font-size: 24px;
            @media (min-width: 992px) {
              font-size: 28px;
            }
          `}
        >
          Add a New Address
        </$.Title>
      ) : (
        <$.Title
          css={`
            display: block;
            font-size: 20px;
          `}
        >
          Edit address
        </$.Title>
      )}
      <ShippingAddress
        details={shippingAddress}
        handleChange={handleInputChange}
      />
      <$.Row
        css={`
          margin: 15px 0;
          svg {
            display: block;
          }
        `}
      >
        <CheckBox
          id="as_default_address"
          ref={setDefault}
          color="#000"
          shadow="#666"
        />{" "}
        <label htmlFor="as_default_address">Set as default address</label>
      </$.Row>
      {error && <$.Error>{error}</$.Error>}
      <SubmitButton onClick={handleAddAddress} loading={loading}>
        {type}
      </SubmitButton>
      <button
        css={`
          margin: 15px 0;
        `}
        onClick={handleDismiss}
      >
        Cancel
      </button>
    </>
  );
};

const Address = ({ address }) => {
  const [_, dispatch] = useStore();
  const [showForm, setShowForm] = useState(false);
  const handleDeleteAddress = async (_id) => {
    const token = cookie.get("token");
    const response = await contactServer({
      data: {
        addressId: _id,
      },
      method: "DELETE",
      auth: token,
      route: "account",
    });
    if (response.status === 200) {
      dispatch({ type: "ADD_ADDRESS", address: response.data.address });
    }
  };

  const handleDismiss = () => setShowForm(false);
  const { _id, country, ...rest } = address;
  return (
    <>
      <div
        css={`
          padding: 0 0 25px;
        `}
      >
        <p>
          {Object.values({ ...rest, country: getName(country) })
            .filter((el) => el)
            .map((field, index) => (
              <React.Fragment key={index}>
                <span>{field}</span>
                <br />
              </React.Fragment>
            ))}
        </p>
        <div>
          <button onClick={() => setShowForm((prev) => !prev)}>Edit</button>
          <span>|</span>
          <button onClick={() => handleDeleteAddress(address._id)}>
            Delete
          </button>
        </div>
      </div>
      {showForm && (
        <div
          css={`
            margin-bottom: 50px;
          `}
        >
          <AddressForm
            address={{
              ...Object.entries({ ...rest, country }).reduce(
                (acc, [key, value]) => ((acc[key].value = value), acc),
                defaultAddress
              ),
              _id,
            }}
            handleDismiss={handleDismiss}
            type="UPDATE ADDRESS"
          />
        </div>
      )}
    </>
  );
};

const AddressList = ({ handleReturn }) => {
  const [store, dispatch] = useStore();
  const [showForm, setShowForm] = useState(false);
  const handleDismiss = () => setShowForm(false);
  return (
    <>
      <$.Column
        css={`
          padding: 50px 0;
          justify-content: space-between;
          @media (min-width: 768px) {
            flex-direction: row;
          }
        `}
      >
        <div>
          <$.Title
            css={`
              display: block;
              margin: 0;
              @media (min-width: 992px) {
                margin: 0;
              }
            `}
          >
            Your Addresses
          </$.Title>
          <button
            onClick={handleReturn}
            css={`
              margin-bottom: 10px;
              @media (min-width: 768px) {
                margin-bottom: 0;
              }
            `}
          >
            Return to Account Details
          </button>
        </div>
        <$.Row
          css={`
            justify-content: left;
            @media (min-width: 768px) {
              flex-direction: column;
              justify-content: center;
            }
          `}
        >
          <SubmitButton
            css={`
              text-transform: uppercase;
              margin-bottom: 50px;
              @media (min-width: 768px) {
                margin: 0;
              }
            `}
            onClick={() => setShowForm((prev) => !prev)}
          >
            Add a New Address
          </SubmitButton>
        </$.Row>
      </$.Column>
      {showForm && <AddressForm handleDismiss={handleDismiss} />}
      {store.user.address.map((ele, index) => (
        <Address address={ele} key={index} />
      ))}
    </>
  );
};

export default AddressList;
