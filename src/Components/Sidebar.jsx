import { categories } from "../utils/constants";
import { store } from "../store";

const Sidebar = () => {
  const setCategory = store((state) => state.setCategory);
  const category = store((state) => state.category);

  return (
    <div className="overflow-y-auto md:h-[95%] flex md:flex-col w-full">
      {categories.map((item) => (
        <button
          key={item.name}
          className={`group transition-all duration-300 px-3 py-2 whitespace-nowrap m-1 rounded-full items-center flex ${
            category === item.name
              ? "bg-[#fc1503]"
              : "hover:bg-red-700"
          }`}
          onClick={() => {
            setCategory(item.name);
          }}
        >
          <span
            className={` mr-4 group-hover:text-white transition-all duration-300 ${
              category === item.name ? "text-white" : "text-red-800"
            }`}
          >
            {item.icon}
          </span>
          <span
            className={`${
                category === item.name ? "opacity-100" : "opacity-70"
            }`}
          >
            {item.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
