import React from 'react';

import {getPosts, getPostDetails} from "../../services";

import {PostDetail, Categories, PostWidget, Author, Comments, CommentsForm} from "../../components";
import Head from "next/head";

const PostDetails = ({post}) => {
    return (
        <div>
            <Head>
                <title>MDR | {post.titulo}</title>
                <meta name="description" content={post.excerpt}/>
                <meta property="og:image" content={post.featuredImage.url}/>
                <meta property="og:title" content={post.titulo}/>
                <meta name="twitter:card" content={post.excerpt}/>
                <meta name="twitter:site" content="@miseriadarazao"/>
                <meta name="twitter:creator" content="@eris_gothichaos"/>
            </Head>
            <div className="container mx-auto px-10 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                     <div className="col-span-1 lg:col-span-8">
                        <PostDetail post={post} />
                        <Author author={post.autor} />
                        <CommentsForm slug={post.slug}/>
                        <Comments slug={post.slug} />
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="relative lg:sticky top-8">
                            <PostWidget slug={post.slug} categories={post.categorias.map((category) => category.slug)} />
                            <Categories />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;

export async function getServerSideProps({params}) {
    const data = await getPostDetails(params.slug)

    return {
        props: {post: data}
    }
}