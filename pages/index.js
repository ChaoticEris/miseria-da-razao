import Head from 'next/head'
import {PostCard, PostWidget, Categories} from "../components";
import {getPosts} from "../services";
import {FeaturedPosts} from "../sections";

export default function Home({posts}) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Miséria da Razão</title>
        <link rel="icon" href="/favicon.ico" />
          <meta name="og:image" content="https://cdn-images-1.medium.com/max/600/1*0bahf7NKTyuD_5h0vW-LUA@2x.png"/>
          <meta name="description" content="Revista Marxista crítica para melhor entender a realidade em que estamos inseridos e transformá-la radicalmente."/>
          <meta name="twitter:card" content="Revista Marxista crítica para melhor entender a realidade em que estamos inseridos e transformá-la radicalmente."/>
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