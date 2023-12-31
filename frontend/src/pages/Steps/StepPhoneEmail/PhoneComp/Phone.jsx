import React, { useState } from "react";
import styles from "./Phone.module.css";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import { sendOtp } from "../../../../http/index";
import { setOtp } from "../../../../ReduxStore/authSlice";
import { useDispatch } from "react-redux";

const Phone = ({ onNext }) => {
  const [number, setNumber] = useState("");
  const dispatch = useDispatch();

  async function submitNum() {
    if (!number) {
      alert('Number required..')
      return
    }
    // server request
    const { data } = await sendOtp({ phone: number });
    console.log(data);
    // sending data to global store
    dispatch(setOtp({ phone: data.phone, hash: data.hash })); // sending payload to redux slice

    onNext();
  }

  return (
    <Card title="Enter Your Phone Number" icon="phone">
      <TextInput
        type="number"
        value={number}
        onChange={(e) => {
          setNumber(e.target.value);
          // console.log(number);
        }}
      />
      <div>
        <div className={styles.buttonWrapper}>
          <Button text="Next" onClick={submitNum} />
        </div>
        <p className={styles.bottomParagraph}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
          inventore exercitationem consequatur rem autem omnis architecto ex
          quia fuga sed?
        </p>
      </div>
    </Card>
  );
};

export default Phone;
