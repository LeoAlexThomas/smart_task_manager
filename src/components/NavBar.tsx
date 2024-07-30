import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { menus } from "./utils";
import { Fragment } from "react";
import { SideBarMenu } from "./types/common";
import { useRouter } from "next/router";
import Link from "next/link";

const NavBar = () => {
  return (
    <HStack
      display={["flex", null, "none"]}
      spacing={4}
      pos="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex={99}
      bgColor="white"
    >
      {menus.map((menu, index) => {
        return (
          <Fragment key={index}>
            <NavBarItem menu={menu} />
          </Fragment>
        );
      })}
    </HStack>
  );
};

const NavBarItem = ({ menu }: { menu: SideBarMenu }) => {
  const router = useRouter();
  const isMenuSelected =
    router.asPath === "/"
      ? menu.url === router.asPath
      : menu.url.includes(router.asPath);

  return (
    <Link
      href={menu.url}
      passHref
      style={{
        width: "100%",
      }}
    >
      <VStack
        p={4}
        bgColor={isMenuSelected ? "#00000060" : "transparent"}
        _hover={{
          bgColor: isMenuSelected ? "#00000060" : "#00000030",
        }}
        spacing="12px"
        justifyContent="space-between"
      >
        <Image
          src={isMenuSelected ? menu.activeImageUrl : menu.imageUrl}
          alt={menu.name}
          w="25px"
          h="25px"
        />
        <Text
          fontSize={["12px", null, "16px"]}
          fontWeight={isMenuSelected ? 700 : 400}
          lineHeight="1.17"
          color={isMenuSelected ? "#FFFFFF" : "#000000"}
        >
          {menu.name}
        </Text>
      </VStack>
    </Link>
  );
};

export default NavBar;
