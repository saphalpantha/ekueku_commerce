import CardUI from "../Products/CardUI";

const GridView = () => {
  return (
    <section
      id="Projects"
      className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
    >
      {[1,2,3,4,5,6].map(i => <CardUI/>)}
    </section>
  );
};

export default GridView;
