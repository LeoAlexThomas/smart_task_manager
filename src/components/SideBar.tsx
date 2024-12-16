import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { SideBarMenu } from "@/types/common";
import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { menus, colors } from "@/components/utils";

const SideBar = () => {
  return (
    <VStack
      alignItems="stretch"
      spacing={4}
      py={4}
      boxShadow="0px 0px 4px 1px #00000020"
      display={["none", null, "flex"]}
      bg={colors.secondaryColor[1]}
    >
      {menus.map((menu, index) => {
        return (
          <Fragment key={index}>
            <MenuTile menu={menu} />
          </Fragment>
        );
      })}
    </VStack>
  );
};

const MenuTile = ({ menu }: { menu: SideBarMenu }) => {
  const router = useRouter();
  const isMenuSelected =
    router.asPath === "/"
      ? menu.url === router.asPath
      : menu.url.includes(router.asPath);
  return (
    <Link href={menu.url} passHref>
      <HStack
        p={4}
        bgColor={isMenuSelected ? colors.secondaryColor[5] : "transparent"}
        _hover={{
          bgColor: isMenuSelected
            ? colors.secondaryColor[5]
            : colors.secondaryColor[2],
        }}
        spacing="12px"
      >
        <Image
          src={isMenuSelected ? menu.activeImageUrl : menu.imageUrl}
          alt={menu.name}
          w="25px"
          h="25px"
        />
        <Text
          fontSize={["12px", null, "16px"]}
          fontWeight={isMenuSelected ? 800 : 500}
          lineHeight="1.17"
          color={colors.primaryColor[0]}
        >
          {menu.name}
        </Text>
      </HStack>
    </Link>
  );
};

export default SideBar;
