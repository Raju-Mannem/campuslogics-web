import { gql } from "@apollo/client";
// import { nanoid } from "nanoid";

export const CREATE_POST = gql`
mutation CreatePost($data: PostCreateInput!) {
  createPost(data: $data) {
    sno
    title
    imageLink
    description
    links
    date
  }
}
`;

export const UPDATE_POST = gql`
mutation UpdatePost($sno: Int!, $data: PostUpdateInput!) {
  updatePost(sno: $sno, data: $data) {
    sno
    title
    imageLink
    description
    links
    date
  }
}
`;

export const DELETE_POST = gql`
mutation DeletePost($id: Int!) {
  deletePost(id: $id) {
    sno
    title
    imageLink
    description
    links
    date
  }
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