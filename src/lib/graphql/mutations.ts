import { gql } from "@apollo/client";
// import { nanoid } from "nanoid";

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      postType
      title
      slug
      imageLink
      description
      content
      tags
      postedBy
    }
  }
`
export const UPDATE_POST = gql`
  mutation UpdatePost($id: Int!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
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
      published
    }
  }
`

export const DELETE_POST = gql`
mutation DeletePost($id: Int!) {
  deletePost(id: $id) 
}
`;

export const UPLOAD_IMAGE = gql`
mutation UploadImage($fileName: String!, $fileType: String!) {
  uploadImage(fileName: $fileName, fileType: $fileType) {
    fileName
    fileType
    fileUrl
  }
}
`