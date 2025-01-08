import { ProjectInterface } from "@/types/project";
import { VStack, chakra, Text } from "@chakra-ui/react";
import Link from "next/link";

const ProjectCard = ({ project }: { project: ProjectInterface }) => {
  return (
    <Link href={`/project/${project._id}`} passHref>
      <VStack
        boxShadow="0px 0px 5px black"
        p={4}
        borderRadius="8px"
        alignItems="stretch"
        maxW="450px"
        _hover={{
          cursor: "pointer",
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
        >
          {project.description}
        </Text>
        <Text
          fontFamily="Noto Serif"
          fontSize="16px"
          fontWeight={500}
          lineHeight="1.25"
        >
          <chakra.span fontWeight={700}>Members :</chakra.span>{" "}
          {project.members.map((user) => user.name).join(", ")}
        </Text>
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
