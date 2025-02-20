import { ProjectInterface } from "@/types/project";
import {
  VStack,
  chakra,
  Text,
  HStack,
  AvatarGroup,
  Avatar,
} from "@chakra-ui/react";
import Link from "next/link";
import { colors } from "@/components/utils";
import { Fragment } from "react";

const ProjectCard = ({ project }: { project: ProjectInterface }) => {
  return (
    <Link href={`/project/${project._id}`} passHref>
      <VStack
        boxShadow="md"
        p={4}
        borderRadius="8px"
        alignItems="stretch"
        maxW="450px"
        bgGradient={`linear(to-tl, ${colors.primaryColor[0]}, ${colors.primaryColor[1]})`}
        _hover={{
          cursor: "pointer",
          boxShadow: "lg",
        }}
      >
        <Text fontFamily="Playfair Display" fontSize="24px" fontWeight={600}>
          {project.title}
        </Text>
        <Text
          fontFamily="Noto Serif"
          fontSize="16px"
          fontWeight={500}
          lineHeight="1.25"
          noOfLines={2}
          color="gray.500"
        >
          {project.description}
        </Text>
        <HStack>
          <Text
            fontFamily="Noto Serif"
            fontSize="16px"
            fontWeight={700}
            lineHeight="1.25"
          >
            Members :
          </Text>
          <AvatarGroup max={8} size={["xs", null, "sm"]}>
            {project.members.map((mem) => (
              <Fragment key={mem._id}>
                <Avatar name={mem.name} />
              </Fragment>
            ))}
          </AvatarGroup>
        </HStack>
        <Text
          fontFamily="Noto Serif"
          fontSize="16px"
          fontWeight={500}
          lineHeight="1.25"
        >
          <chakra.span fontWeight={700}>Tasks :</chakra.span>{" "}
          {project.tasks.length}
        </Text>
      </VStack>
    </Link>
  );
};

export default ProjectCard;
