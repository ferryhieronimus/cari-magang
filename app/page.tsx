import Home from "@/components/home";

async function getData() {
  const res = await fetch(
    "https://api.kampusmerdeka.kemdikbud.go.id/magang/browse/opportunities?opportunity_type=&activity_type=",
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    return { data: [] };
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <Home data={data.data} />;
}
