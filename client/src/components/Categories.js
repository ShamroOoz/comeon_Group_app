const Categories = ({ name, id, isActive, filterListner }) => {
  return (
    <button
      className={`px-4 py-2 mx-4 text-sm font-medium  capitalize  md:py-3 rounded-xl md:px-12 ${
        isActive === id
          ? "bg-green-500 text-white hover:bg-green-700"
          : "text-green-500 hover:bg-green-600 hover:text-white"
      }`}
      onClick={() => filterListner(id)}
    >
      {name}
    </button>
  );
};

export default Categories;
