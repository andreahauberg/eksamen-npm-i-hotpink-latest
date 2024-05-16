import { fetchAPI } from "../../app/api/api.js";

export async function generateStaticParams() {
  const data = await fetchAPI("/bands");
  return data.map((band) => ({
    slug: band.slug,
  }));
}
export async function generateMetadata({ params }) {
  const { slug } = params;
  const fetchData = await fetchAPI("/bands");
  const filterData = fetchData.filter((band) => band.slug === slug);
  const data = filterData[0];
  return {
    title: `FooFest - ${data.name}`,
  };
}

export default async function Band({ params }) {
  const { slug } = params;
  const fetchData = await fetchAPI("/bands");
  const filterData = fetchData.filter((band) => band.slug === slug);
  const data = filterData[0];

  return (
    <>
      <section>
        <h1>{data.name}</h1>
      </section>
    </>
  );
}
