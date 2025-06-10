import CategoryItem from './CategoryItem';

const categories = [
  { href: "/dj", name: "DJ", imageUrl: "/dj.jpg" },
   { href: "/musician", name: "Musician", imageUrl: "/musician.jpg" },
  { href: "/mc", name: "MC", imageUrl: "/mc.jpg" },
  { href: "/dancer", name: "Dancer", imageUrl: "/dancer.jpg" },
 
  { href: "/other", name: "Other", imageUrl: "/other.jpg" },
];

const CategorySection = () => {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-[black] mb-12">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryItem key={category.name} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;