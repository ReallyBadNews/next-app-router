import Link from "next/link";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";

interface Data {
  headers: Record<string, string>;
  cookies: string[];
  body: string;
}

async function getData() {
  const res = await fetch(
    "https://d90u7r8fr6.execute-api.us-east-1.amazonaws.com",
    {
      next: { revalidate: 10 },
      headers: {
        "x-hello-world": "baba booey",
      },
    }
  );
  /**
   * The return value is *not* serialized
   * You can return Date, Map, Set, etc.
   * TODO: handle errors
   */
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<Data>;
}

export default async function IndexPage() {
  const data = await getData();

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Beautifully designed components <br className="hidden sm:inline" />
          built with Radix UI and Tailwind CSS.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ size: "lg" })}
        >
          Documentation
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          GitHub
        </Link>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
