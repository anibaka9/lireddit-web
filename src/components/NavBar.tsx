import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;

  if (fetching || isServer()) {
  } else if (!data?.me) {
    body = (
      <Flex>
        <NextLink href="/login">
          <Link as="p" mr={2}>
            login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link as="p">register</Link>
        </NextLink>
      </Flex>
    );
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          variant={"link"}
          isLoading={logoutFetching}
          onClick={() => {
            logout({});
          }}
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tan" p={4}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
