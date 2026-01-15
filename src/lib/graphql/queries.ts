import { gql } from "@apollo/client";

export const GET_POSTS = gql`
query GetPosts($published: Boolean!, $page: Int!, $limit: Int!) {
    posts(published: $published, page: $page, limit: $limit) {
      posts { 
        id 
        title 
        slug 
        imageLink 
        description 
        tags 
        postedBy 
        createdAt 
      }
      totalCount      
    }
  }
`;

export const GET_ADMIN_POSTS = gql`
query GetAdminPosts($page: Int!, $limit: Int!) {
    posts(page: $page, limit: $limit) {
      posts { 
        id 
        title 
        slug 
        imageLink 
        description 
        tags 
        postedBy 
        createdAt 
        published
      }
      totalCount  
    }
  }
`;

export const GET_POSTS_BY_ID = gql`
query GetPostById($sno: Int!) {
  getPostById(sno: $sno) {
    sno
    id
    title
    slug
    imageLink
    description
    content
    links
    tags
    postedBy
    published
    createdAt
    updatedAt
  }
}
`;