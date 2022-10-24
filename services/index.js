import {request, gql} from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection (orderBy: createdAt_DESC) {
                edges {
                    node {
                        autor {
                            bio
                            id
                            nome
                            foto {
                                url
                            }
                        }
                        createdAt
                        slug
                        titulo
                        featuredImage {
                            url
                        }
                        excerpt
                        categorias {
                            nome
                            slug
                        }
                    }
                }
            }
        }
    `

    const result = await request(graphqlAPI, query)

    return result.postsConnection.edges;
}

export const getPostDetails = async (slug) => {
    const query = gql`
        query GetPostDetails($slug: String!) {
            post(where: {slug: $slug}) {
                        autor {
                            nome
                            id
                            bio
                            foto {
                                url
                            }
                        }
                        createdAt
                        slug
                        titulo
                        featuredImage {
                            url
                        }
                        excerpt
                        categorias {
                            nome
                            slug
                        }
                        conteudo {
                            raw
                        }
            }
        }
    `

    const result = await request(graphqlAPI, query, {slug})

    return result.post;
}

export const getRecentPosts = async () => {
    const query = gql`
       query GetPostDetails {
           posts(
               orderBy: createdAt_ASC
               last: 3
           ) {
               titulo
               featuredImage {
                   url
               }
               createdAt
               slug
           }
       }
    `

    const result = await request(graphqlAPI, query);

    return result.posts;
}

export const getSimilarPosts = async (categories, slug) => {
    const query = gql `
        query GetPostDetails($slug: String!, $categories: [String!]) {
          posts(
              where: {slug_not: $slug, AND: {categorias_some: {slug_in: $categories}}}
              last: 3
          ) {
              titulo
              featuredImage {
                  url
              }
              createdAt
              slug
          }
        }
    `

    const result  = await request(graphqlAPI, query, {categories, slug});

    return result.posts;
}

export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categorias {
                nome
                slug
            }
        }
    `

    const result = await request (graphqlAPI, query);

    return result.categorias
}

export const submitComment = async (obj) => {
    try {
        const result = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        });

        return result.json();
    } catch (e) {
        console.log(e)
    }
}

export const getComments = async (slug) => {
    const query = gql`
        query GetComments($slug:String!) {
            comentarios(where: {post: {slug: $slug}}) {
                nome
                createdAt
                comentario
            }
        }
    `;

    const result = await request(graphqlAPI, query, { slug });

    return result.comentarios;
};

export const getFeaturedPosts = async () => {
    const query = gql`
        query GetCategoryPost() {
            posts(where: {featuredPost: true}) {
                autor {
                    nome
                    foto {
                        url
                    }
                }
                featuredImage {
                    url
                }
                titulo
                slug
                createdAt
            }
        }
    `;

    const result = await request(graphqlAPI, query);

    return result.posts;
};

export const getCategoryPost = async (slug) => {
    const query = gql`
        query GetCategoryPost($slug: String!) {
            postsConnection(where: {categorias_some: {slug: $slug}}) {
                edges {
                    cursor
                    node {
                        autor {
                            bio
                            nome
                            id
                            foto {
                                url
                            }
                        }
                        createdAt
                        slug
                        titulo
                        excerpt
                        featuredImage {
                            url
                        }
                        categorias {
                            nome
                            slug
                        }
                    }
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, { slug });

    return result.postsConnection.edges;
};