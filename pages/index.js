import Head from 'next/head'
import {PostCard, PostWidget, Categories} from "../components";
import {getPosts} from "../services";
import {FeaturedPosts} from "../sections";

export default function Home({posts}) {
  return (
    <div className="container mx-auto px-10 w-full mb-8 box-border xl:px-[12%]">
      <Head>
        <title>Miséria da Razão</title>
        <link rel="icon" href="/favicon.ico" />
          <meta property="og:image" content="https://cdn-images-1.medium.com/max/600/1*0bahf7NKTyuD_5h0vW-LUA@2x.png"/>
          <meta property="og:title" content="Miséria da Razão"/>
          <meta property="og:description" content="Revista Marxista crítica para melhor entender a realidade em que estamos inseridos e transformá-la radicalmente."/>
          <meta name="twitter:card" content="summary"/>
          <meta name="twitter:creator" content="@eris_gothichaos"/>
          <meta name="twitter:site" content="@miseriadarazao"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1">
            {posts.map((post, index) => <PostCard post={post.node} key={post.titulo} />)}
          </div>
          <div className="lg:col-span-4 col-span-1">
              <div className="lg:sticky relative top-8">
                  <PostWidget />
                  <Categories />
              </div>
          </div>
      </div>
    </div>
  )
}


export async function getServerSideProps() {
    const posts = (await getPosts() || [])
    return {
        props: {posts}
    }
}