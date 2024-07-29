import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { SideBarMenu } from "./types/common";
import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const menus: SideBarMenu[] = [
  {
    name: "Home",
    url: "/",
    imageUrl: "/images/home.svg",
    activeImageUrl: "/images/activeHome.svg",
  },
  {
    name: "Dashboard",
    url: "/dashboard",
    imageUrl: "/images/dashboard.svg",
    activeImageUrl: "/images/activeDashboard.svg",
  },
  {
    name: "Settings",
    url: "/settings",
    imageUrl: "/images/settings.svg",
    activeImageUrl: "/images/activeSettings.svg",
  },
];

const SideBar = () => {
  return (
    <VStack
      alignItems="stretch"
      spacing={4}
      py={4}
      boxShadow="0px 0px 4px 1px #00000020"
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
  console.log("Is menu selected: ", isMenuSelected, menu.url, router.asPath);
  return (
    <Link href={menu.url} passHref>
      <HStack
        p={4}
        bgColor={isMenuSelected ? "#00000060" : "transparent"}
        _hover={{
          bgColor: isMenuSelected ? "#00000060" : "#00000030",
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
          fontWeight={isMenuSelected ? 700 : 400}
          lineHeight="1.17"
          color={isMenuSelected ? "#FFFFFF" : "#000000"}
        >
          {menu.name}
        </Text>
      </HStack>
    </Link>
  );
};

export default SideBar;
