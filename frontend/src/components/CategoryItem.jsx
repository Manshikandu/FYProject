import { Link } from 'react-router-dom';

const CategoryItem = ({ category }) => {
  return (
    <Link to={category.href} className="group block rounded overflow-hidden shadow-md hover:shadow-xl transition">
      <img src={category.imageUrl} alt={category.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
      <div className="p-4 bg-white text-center text-[#4b3832] font-semibold">{category.name}</div>
    </Link>
  );
};

export default CategoryItem;