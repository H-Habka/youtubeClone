import {useNavigate} from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { store } from "../store";
import { useRef } from "react";

const SearchBar = () => {
  const inputField = useRef();
  const setCategory = store((state) => state.setCategory);
  const navigate = useNavigate()
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputField.current.value) {
      setCategory(inputField.current.value);
      navigate("/")
      inputField.current.value = "";
    }
  };
  return (
    <form
      className="p-2 flex gap-2 rounded-full bg-white"
      onSubmit={handleFormSubmit}
    >
      <input
        ref={inputField}
        className="outline-none text-black max-w-[220px] min-w-[190px]"
        placeholder="Search..."
      />
      <button type="submit" className="text-black">
        <BiSearch size={24} />
      </button>
    </form>
  );
};

export default SearchBar;
