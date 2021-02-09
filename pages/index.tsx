import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import useLocalStorage from "../cusomHooks/useLocalStorage";
import { useStateValue } from "../context/Context";
import Head from 'next/head'
const pageVariant = {
  exit: {
    opcity: 0,
    x: 800,
  },
  animate: {
    scale: 1,
  },
};

//https://images.pexels.com/photos/1136571/pexels-photo-1136571.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500

const Home = () => {
  //@ts-ignore
  const [state, dispatch] = useStateValue();
  const [inputValue, setInputValue] = useState<string>("");
  const [imageUrlLocal, setImageUrlLocal] = useLocalStorage("imageURL", "");
  const [selectOptions, setSelectOptions] = useLocalStorage("selectOptions", [
    "Javascript",
    "Java",
    "Python",
    "C#",
    "Swift",
  ]);
  const [selectOptionInput, setSelectOptionInput] = useState("");
  const [fileInputValue, setFileInputValue] = useState<string>(
    "No File Chosen"
  );

  const [selectValue, setSelectValue] = useState<string>("Javascript");
  const router = useRouter();
  const handleSumbit = (e) => {
    e.preventDefault();
    if (!inputValue) return false;
    const name = inputValue.replace(" ", "_");
    router.replace(`/chatApp/${name}/${selectValue}`);
  };
  const setNewSelectOption = (e) => {
    setSelectValue(selectOptionInput);
    setSelectOptions([...selectOptions, selectOptionInput]);
    setSelectOptionInput("");
    return false;
  };
  const removeAskedUser = (e) => {
    setSelectOptions(
      selectOptions.filter((option) => option !== selectOptionInput)
    );
    setSelectOptionInput("");

    return false;
  };
  const setImage = (e) => {
    const file = e.target.files[0];
    if(file) {
      const url = URL.createObjectURL(file);
      localStorage.setItem("imageURL", JSON.stringify(url))
      setImageUrlLocal(url);
      setFileInputValue(file.name)
    }else {
      setFileInputValue("No File Chosen")
    }
  };
  useEffect(() => {
    dispatch({ type: "ADD_AVATART", payload: imageUrlLocal });
  }, [imageUrlLocal]);
  const fileInputRef = useRef<HTMLInputElement>();
  return (
    <div
      className="container"
    >
      <Head>
        <title>Chat App | Home</title>
      </Head>
      <img
        src="/The_man.jpg"
        className="image-holder"
      />
      <section>
        <div className="form">
          <h2>Sign In</h2>
          <form onSubmit={handleSumbit} className="form-container">
            <input
              type="text"
              name="inputValue"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              className="form-container__nameInput"
              placeholder="Type yor name..."
            />

            <select
              onChange={(e) => setSelectValue(e.target.value)}
              value={selectValue}
              name="selectRoom"
              id="selectRoom"
              className="form-container__roomInput"
            >
              {selectOptions.map((option) => (
                <option
                  key={option}
                  value={option}
                  className="form-container__option"
                >
                  {option}
                </option>
              ))}
            </select>
            <div className="form-container__file">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  fileInputRef.current.click();
                }}
                className="form-container__file__btn"
              >
                Chose Avatar
              </button>
              <span className="form-container__file__text">
                {fileInputValue}
              </span>
              <input
                type="file"
                onChange={setImage}
                accept="image/png, image/jpeg"
                className="form-container__file__fileInput"
                hidden={true}
                ref={fileInputRef}
              />
            </div>
            <input
              type="submit"
              className="btn form-container__btn"
              value="Submit"
            />
          </form>
          <div className="setSelectContainer">
            <input
              type="text"
              value={selectOptionInput}
              onChange={(e) => setSelectOptionInput(e.target.value)}
              placeholder="Set new room..."
              className="container__setSelectContainer container__setSelectContainer__nameInputSetOption"
            />
            <button
              className="btn setSelectContainer__btn btnAdd"
              onClick={setNewSelectOption}
            >
              Add
            </button>
            <button
              className="btn setSelectContainer__btn btnRemove"
              onClick={removeAskedUser}
            >
              Remove
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;





// if (e.target.files.length > 1) return false;
// const file = e.target.files[0];
// if (file) {
//   const reader = new FileReader();
//   reader.addEventListener("load", (e) => {
//     //@ts-ignore
//     localStorage.setItem("imageURL",e.currentTarget.result)
//     //@ts-ignore
//     setImageUrlLocal(e.currentTarget.result);
//   });
//   // setImageUrlLocal(e.target.value);
//   if (e.target.value) {
//     setFileInputValue(
//       e.target.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]
//     );
//     setImageUrlLocal(e.target.value);
//   } else {
//     setFileInputValue("No File Chosen");
//   }

//   reader.readAsDataURL(file);
// }