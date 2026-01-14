import { gql } from "@apollo/client";

export const GET_POSTS = gql`
query GetPosts($isPublished: Boolean) {
    getPosts(isPublished: true) {
      sno
      title
      imageLink
      description
      date
    }
  }
`;

export const GET_ADMIN_POSTS = gql`
query GetAdminPosts() {
    getPosts() {
      sno
      title
      imageLink
      description
      date
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