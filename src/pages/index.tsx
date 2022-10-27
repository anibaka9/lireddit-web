import { Box, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/NavBar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Box>
      <NavBar />
      <Heading as="h1" size="4xl">
        Hello World
      </Heading>
      <br />
      {!data ? (
        <Text>loading...</Text>
      ) : (
        data.posts.map((post) => <Text key={post.id}>{post.title}</Text>)
      )}
    </Box>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
