import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import { Mdx } from "~/components/mdx-components"

import "~/styles/mdx.css"
import type { Metadata } from "next"
import Link from "next/link"

import { env } from "~/env"
import { absoluteUrl, cn } from "~/lib/utils"
import { buttonVariants } from "~/components/ui/button"
import { Icons } from "~/components/icons"

interface PostPageProps {
  params: {
    slug: string
  }
}

async function getPostFromParams(slug: string) {
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params.slug)

  if (!post) {
    return {}
  }

  const url = env.NEXT_PUBLIC_HOST

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("heading", post.title)
  ogUrl.searchParams.set("type", "Blog Post")
  ogUrl.searchParams.set("mode", "dark")

  return {
    title: post.title,
    description: post.description,
    // openGraph: {
    //   title: post.title,
    //   description: post.description,
    //   type: "article",
    //   url: absoluteUrl(post.slug),
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title: post.title,
    //   description: post.description,
    //   images: [ogUrl.toString()],
    // },
  }
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="flex flex-col min-h-screen bg-[#e0f0e9] text-green-900">
      <article className="container relative max-w-3xl py-6 lg:py-10 bg-white text-black rounded-lg my-6">
        <Link
          href="/blog"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-[-200px] top-14 hidden xl:inline-flex"
          )}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
        {/*
        <div>
          <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
            {post.title}
          </h1>
        </div>
        */}
        <Mdx code={post.body.code} />
        <hr className="mt-12" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            See all posts
          </Link>
        </div>
      </article>
    </main>
  )
}
