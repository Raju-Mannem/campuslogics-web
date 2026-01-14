const typeDefs = `#graphql

type Post {
  id: Int!
  title: String!
  slug: String!
  imageLink: String!
  description: String!
  content: JSON!
  links: JSON
  tags: [String!]!
  postedBy: String!
  published: Boolean!
  createdAt: String!
  updatedAt: String!
}

type Image {
  id: Int!
  name: String!
  url: String!
  publicId: String
  uploadedAt: String!
}

input CreatePostInput {
  title: String!
  description: String!
  content: JSON!
  imageLink: String!
  links: JSON
  tags: [String!]!
  postedBy: String!
  published: Boolean!
}

input UpdatePostInput {
  title: String
  description: String
  content: JSON
  imageLink: String
  links: JSON
  tags: [String!]
  postedBy: String!
  published: Boolean!
}

type Query {
  posts(limit: Int, offset: Int, published: Boolean): [Post!]!
  post(id: Int, slug: String): Post
  images: [Image!]!
  image(id: Int!): Image
}

type Mutation {
  createPost(input: CreatePostInput!): Post!
  updatePost(id: Int!, input: UpdatePostInput!): Post!
  deletePost(id: Int!): Boolean!
  uploadImage(file: Upload!, name: String!): Image!
  deleteImage(id: Int!): Boolean!
}

scalar JSON
scalar Upload
`;

export default typeDefs;
