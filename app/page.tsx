import Link from "next/link";

export default async function Home() {
  return (
    <>
      <h1>hello</h1>

      <input type=" text" />
      <Link href={"/api/auth/signout"}>Sign Out</Link>
    </>
  );
}
