import { gql } from "@apollo/client";

export const GET_POSTS = gql`
query GetPosts($published: Boolean!, $page: Int!, $limit: Int!) {
    posts(published: $published, page: $page, limit: $limit) {
      posts { 
        id 
        postType 
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

export const GET_SEARCH_POSTS = gql`
query GetSearchPosts($published: Boolean!, $page: Int!, $limit: Int!, $searchQuery: String!) {
    searchPosts(published: $published, page: $page, limit: $limit, searchQuery: $searchQuery) {
      posts { 
        id 
        postType 
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

export const GET_CATEGORY_POSTS = gql`
query GetCategoryPosts($published: Boolean!, $page: Int!, $limit: Int!, $postType: String!) {
    categoryPosts(published: $published, page: $page, limit: $limit, postType: $postType) {
      posts { 
        id 
        postType 
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

export const GET_CATEGORY_TYPE_POSTS = gql`
query GetCategoryTypePosts($published: Boolean!, $page: Int!, $limit: Int!, $categoryType: String!) {
    categoryTypePosts(published: $published, page: $page, limit: $limit, categoryType: $categoryType) {
      posts { 
        id 
        postType 
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
        postType
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
    postType
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
    published
  }
}
`;

export const GET_POST_BY_SLUG = gql`
  query GetPost($slug: String!) {
    post(slug: $slug) {
      id
      postType
      title
      slug
      imageLink
      description
      content
      tags
      links
      postedBy
      createdAt
      published
    }
  }
`;

export const SEARCH_IMAGES = gql` 
  query SearchImages($name: String) { 
    imageSearch(name: $name) { 
      id 
      name 
      url 
    } 
} `;