const typeDefs = `#graphql

type Post {
  id: Int!
  postType: String!
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

type PaginatedPosts {
  posts: [Post!]!
  totalCount: Int!
}

type PaginatedSearchPosts {
  posts: [Post!]!
  totalCount: Int!
}

input CreatePostInput {
  postType: String!
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
  postType: String!
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
  posts(published: Boolean, page: Int, limit: Int): PaginatedPosts!
  searchPosts(published: Boolean, page: Int, limit: Int, searchQuery: String): PaginatedSearchPosts!
  categoryPosts(published: Boolean, page: Int, limit: Int, category: String): PaginatedSearchPosts!
  categoryTypePosts(published: Boolean, page: Int, limit: Int, categoryType: String): PaginatedSearchPosts!
  post(id: Int, slug: String): Post
  images: [Image!]!
  imageSearch(name: String): [Image!]!
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
